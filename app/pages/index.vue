<script setup lang="ts">
import { usePaywallStore } from 'modules/paywall/application/paywall.store'
import PaywallHeader from 'modules/paywall/ui/components/PaywallHeader.vue'
import PaywallErrorBanner from 'modules/paywall/ui/components/PaywallErrorBanner.vue'
import PaywallOfferCard from 'modules/paywall/ui/components/PaywallOfferCard.vue'
import PaywallOfferCardSkeleton from 'modules/paywall/ui/components/PaywallOfferCardSkeleton.vue'
import PaywallSuccessState from 'modules/paywall/ui/components/PaywallSuccessState.vue'

const store = usePaywallStore()

onMounted(store.load.execute)
</script>

<template>
  <main class="min-h-dvh bg-pw-screen">
    <PaywallSuccessState
      v-if="store.isUnlocked"
    />

    <section
      v-else
      class="mx-auto flex min-h-dvh w-full max-w-sheet flex-col gap-3 px-pad pb-[calc(24px+env(safe-area-inset-bottom))] pt-6 min-[431px]:pt-12"
    >
      <PaywallHeader />

      <div class="mt-2 flex flex-col gap-3.5" role="listbox" aria-label="Тарифы">
        <template v-if="store.load.isLoading">
          <PaywallOfferCardSkeleton />
          <PaywallOfferCardSkeleton />
        </template>
        <PaywallOfferCard
          v-for="offer in store.offers"
          v-else
          :key="offer.type"
          :offer="offer"
          :selected="store.selectedOfferId === offer.type"
          :disabled="store.isBusy"
          @select="store.selectOffer(offer.type)"
        />
      </div>

      <PaywallErrorBanner v-if="store.load.error || store.purchase.error || store.restore.error" />

      <button
        type="button"
        class="mt-2 inline-flex h-cta-h w-full cursor-pointer items-center justify-center gap-2 rounded-pw-btn border-0 bg-pw-cta text-[17px] font-extrabold text-pw-cta-ink disabled:cursor-not-allowed disabled:opacity-[0.65]"
        :disabled="store.isBusy || !store.selectedOffer"
        @click="store.purchase.execute"
      >
        <span
          v-if="store.purchase.isLoading"
          class="h-4 w-4 animate-spin-cta rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
        {{ store.purchase.isLoading ? 'Оформляем…' : 'Открыть полный доступ' }}
      </button>

      <button
        type="button"
        class="mx-auto min-h-11 cursor-pointer border-0 bg-transparent px-2 text-[13px] font-bold text-pw-muted underline underline-offset-[3px] disabled:opacity-60"
        :disabled="store.isBusy"
        @click="store.restore.execute"
      >
        {{ store.restore.isLoading ? 'Ищем покупку…' : 'Восстановить покупки' }}
      </button>
    </section>
  </main>
</template>
