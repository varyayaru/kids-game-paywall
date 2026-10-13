<script setup lang="ts">
import type { Offer } from 'modules/paywall/model/offer'

defineProps<{
  offer: Offer
  selected: boolean
  disabled?: boolean
}>()

defineEmits<{
  select: []
}>()
</script>

<template>
  <button
    type="button"
    class="relative grid min-h-[92px] w-full cursor-pointer grid-cols-[22px_1fr_auto] items-center gap-3 rounded-pw-card border-2 py-4 pl-3.5 pr-4 text-left text-inherit shadow-pw disabled:cursor-not-allowed disabled:opacity-70"
    :class="selected ? 'border-pw-selected bg-pw-selected-soft' : 'border-pw-line bg-pw-card'"
    :disabled="disabled"
    :aria-pressed="selected"
    @click="$emit('select')"
  >
    <span
      v-if="offer.badge"
      class="absolute -top-2.5 right-3.5 h-[22px] rounded-full bg-pw-badge px-2 text-[11px] font-extrabold uppercase leading-[22px] tracking-[0.04em]"
    >
      {{ offer.badge }}
    </span>
    <span
      class="h-[22px] w-[22px] rounded-full border-2 bg-white"
      :class="selected ? 'border-pw-selected shadow-pw-radio' : 'border-pw-radio-ring'"
      aria-hidden="true"
    />
    <span class="flex min-w-0 flex-col gap-1">
      <span class="text-[17px] font-extrabold leading-[22px]">{{ offer.title }}</span>
      <span class="line-clamp-2 text-xs font-semibold leading-4 text-pw-muted">
        {{ offer.perks.join(' · ') }}
      </span>
    </span>
    <span class="flex flex-col items-end gap-0.5">
      <strong class="text-lg font-extrabold leading-[22px]">{{ offer.priceLabel }}</strong>
      <small class="text-xs font-bold text-pw-muted">{{ offer.periodLabel }}</small>
    </span>
  </button>
</template>
