import { insertPurchase } from '../utils/db'
import { delay } from '../utils/delay'
import { getOfferById } from '../utils/offers'

type PurchaseBody = {
  offerId?: string
  deviceId?: string
}

export default defineEventHandler(async (event) => {
  await delay()
  const body = await readBody<PurchaseBody>(event)
  const offerId = body?.offerId?.trim()
  const deviceId = body?.deviceId?.trim()

  if (!offerId || !deviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Нужны offerId и deviceId',
    })
  }

  if (!getOfferById(offerId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Тариф не найден',
    })
  }

  const row = await insertPurchase(offerId, deviceId)

  return {
    purchase: {
      offerType: row.offer_id,
      deviceId: row.device_id,
      createdAt: row.created_at,
    },
  }
})
