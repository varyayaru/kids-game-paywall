import type { OfferType } from 'modules/paywall/model/offer'

export type Purchase = {
  offerType: OfferType
  deviceId: string
  createdAt: string
}

export type RestoreResult = {
  found: boolean
  purchase?: Purchase
}
