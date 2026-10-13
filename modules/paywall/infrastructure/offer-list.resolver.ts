import type { Offer } from 'modules/paywall/model/offer'
import { unknownToOffers } from 'modules/paywall/utils/schemas'

export const offerListResolver = async (): Promise<Offer[]> => {
  const payload = await $fetch('/api/offers')
  return unknownToOffers(payload)
}
