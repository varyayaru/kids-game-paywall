import { defineStore, skipHydrate } from 'pinia'
import { computed, ref } from 'vue'
import { useApiAction } from 'core/composables/use-api-action'
import { offerListResolver } from 'modules/paywall/infrastructure/offer-list.resolver'
import { purchaseResolver } from 'modules/paywall/infrastructure/purchase.resolver'
import { restoreResolver } from 'modules/paywall/infrastructure/restore.resolver'
import { OfferType, type Offer } from 'modules/paywall/model/offer'
import type { Purchase } from 'modules/paywall/model/purchase'
import { getDeviceId } from 'modules/paywall/utils/device-id'

export const usePaywallStore = defineStore('paywall', () => {
  const offers = ref<Offer[]>([])
  const selectedOfferId = ref<OfferType>(OfferType.Yearly)
  const isUnlocked = ref(false)
  const unlockedOfferId = ref<OfferType>()

  const selectedOffer = computed(() =>
    offers.value.find((offer) => offer.type === selectedOfferId.value),
  )

  function selectOffer(type: OfferType) {
    selectedOfferId.value = type
  }

  function setOffers(nextOffers: Offer[]) {
    offers.value = nextOffers
    if (!offers.value.some((offer) => offer.type === selectedOfferId.value)) {
      selectedOfferId.value = offers.value[0]?.type ?? OfferType.Yearly
    }
  }

  function applyPurchase(purchase: Purchase) {
    isUnlocked.value = true
    unlockedOfferId.value = purchase.offerType
    selectedOfferId.value = purchase.offerType
  }

  const load = skipHydrate(
    useApiAction(async () => {
      setOffers(await offerListResolver())
    }),
  )

  const purchase = skipHydrate(
    useApiAction(async () => {
      applyPurchase(await purchaseResolver(selectedOfferId.value, getDeviceId()))
    }),
  )

  const restore = skipHydrate(
    useApiAction(async () => {
      const result = await restoreResolver(getDeviceId())
      if (!result.found || !result.purchase) {
        throw new Error('Покупок на этом устройстве нет')
      }
      applyPurchase(result.purchase)
    }),
  )

  const isBusy = computed(
    () => load.isLoading || purchase.isLoading || restore.isLoading,
  )

  async function retry() {
      if (load.error) {
        await load.execute()
        return
      }
      if (purchase.error) {
        await purchase.execute()
        return
      }
      if (restore.error) {
        await restore.execute()
      }
  }

  return {
    offers,
    selectedOfferId,
    isUnlocked,
    unlockedOfferId,
    selectedOffer,
    selectOffer,
    load,
    purchase,
    restore,
    isBusy,
    retry,
  }
})
