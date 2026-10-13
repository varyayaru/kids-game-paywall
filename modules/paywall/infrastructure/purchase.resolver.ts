import type { OfferType } from 'modules/paywall/model/offer'
import type { Purchase } from 'modules/paywall/model/purchase'
import { unknownToPurchase } from 'modules/paywall/utils/schemas'

export const purchaseResolver = async (
  offerType: OfferType,
  deviceId: string,
): Promise<Purchase> => {
  const payload = await $fetch('/api/purchase', {
    method: 'POST',
    body: { offerId: offerType, deviceId },
  })
  return unknownToPurchase(payload)
}
