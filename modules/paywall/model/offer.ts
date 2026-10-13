export enum OfferType {
  Monthly = 'monthly',
  Yearly = 'yearly',
}

export type Offer = {
  type: OfferType
  title: string
  priceLabel: string
  periodLabel: string
  badge?: string
  perks: string[]
}
