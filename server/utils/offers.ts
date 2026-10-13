import { OfferType, type Offer } from 'modules/paywall/model/offer'

export const OFFERS: Offer[] = [
  {
    type: OfferType.Monthly,
    title: 'На месяц',
    priceLabel: '299 ₽',
    periodLabel: 'в месяц',
    perks: ['Все сказки', 'Без рекламы'],
  },
  {
    type: OfferType.Yearly,
    title: 'На год',
    priceLabel: '1 990 ₽',
    periodLabel: 'в год',
    badge: 'Выгодно',
    perks: ['Все сказки', 'Без рекламы', 'Новые истории'],
  },
]

export function getOfferById(type: string) {
  return OFFERS.find((offer) => offer.type === type)
}
