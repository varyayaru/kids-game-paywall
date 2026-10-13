import * as v from 'valibot'
import { OfferType, type Offer } from 'modules/paywall/model/offer'
import type { Purchase } from 'modules/paywall/model/purchase'
import { responseToOfferType } from 'modules/paywall/utils'

export const OfferSchema = v.object({
  type: v.enum(OfferType),
  title: v.string(),
  priceLabel: v.string(),
  periodLabel: v.string(),
  badge: v.optional(v.string()),
  perks: v.array(v.string()),
})

export const OfferListResponseSchema = v.object({
  items: v.array(OfferSchema),
})

export const PurchaseSchema = v.object({
  offerType: v.enum(OfferType),
  deviceId: v.string(),
  createdAt: v.string(),
})

export const PurchaseResponseSchema = v.object({
  purchase: PurchaseSchema,
})

export const RestoreResponseSchema = v.object({
  found: v.boolean(),
  purchase: v.optional(PurchaseSchema),
})

export function unknownToOffers(payload: unknown): Offer[] {
  return v.parse(OfferListResponseSchema, payload).items.map((item) => ({
    ...item,
    type: responseToOfferType(item.type),
  }))
}

export function unknownToPurchase(payload: unknown): Purchase {
  const purchase = v.parse(PurchaseResponseSchema, payload).purchase
  return {
    ...purchase,
    offerType: responseToOfferType(purchase.offerType),
  }
}

export function unknownToRestore(payload: unknown) {
  const result = v.parse(RestoreResponseSchema, payload)
  if (!result.purchase) {
    return result
  }

  return {
    ...result,
    purchase: {
      ...result.purchase,
      offerType: responseToOfferType(result.purchase.offerType),
    },
  }
}
