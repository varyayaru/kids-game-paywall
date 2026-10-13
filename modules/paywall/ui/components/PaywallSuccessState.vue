<script setup lang="ts">
import { usePaywallStore } from '../../application/paywall.store';
import { OfferType } from '../../model/offer';

const store = usePaywallStore()
</script>

<template>
  <section class="flex min-h-dvh flex-col items-center justify-center px-6 py-8 text-center">
    <div
      class="mb-4 grid h-[72px] w-[72px] place-items-center rounded-full bg-pw-selected-soft text-[32px] font-extrabold text-pw-success"
      aria-hidden="true"
    >
      ✓
    </div>
    <h1 class="mb-2 mt-0 text-[28px] font-extrabold leading-[34px]">Полный лес открыт</h1>
    <p class="m-0 max-w-xs text-[15px] font-semibold leading-[22px] text-pw-muted">
      {{ store.unlockedOfferId === OfferType.Yearly ? 'Годовой доступ' : 'Месячный доступ' }} уже действует на этом устройстве. Можно читать сказки, играть и не видеть рекламу.
    </p>
  </section>
</template>
