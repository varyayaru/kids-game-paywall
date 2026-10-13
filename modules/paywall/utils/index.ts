import { createMapGetter } from 'core/utils/create-map-getter'
import { OfferType } from 'modules/paywall/model/offer'

export const responseToOfferType = createMapGetter<string, OfferType>({
  monthly: OfferType.Monthly,
  yearly: OfferType.Yearly,
})
