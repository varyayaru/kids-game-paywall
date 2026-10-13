<script setup lang="ts">
import { usePaywallStore } from '../../application/paywall.store';

const store = usePaywallStore()
</script>

<template>
  <div
    class="flex min-h-12 items-center justify-between gap-3 rounded-[14px] bg-pw-error-soft px-3 py-2.5 text-pw-error"
    role="alert"
  >
    <p class="m-0 text-[13px] font-bold leading-[18px]">{{ store.load.error || store.purchase.error || store.restore.error }}</p>
    <button
      type="button"
      class="min-h-9 shrink-0 cursor-pointer rounded-[10px] border-0 bg-white px-3 font-extrabold text-pw-error"
      @click="store.retry()"
    >
      Повторить
    </button>
  </div>
</template>
