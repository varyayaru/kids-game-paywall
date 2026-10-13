import { findLatestPurchase } from '../utils/db'
import { delay } from '../utils/delay'

type RestoreBody = {
  deviceId?: string
}

export default defineEventHandler(async (event) => {
  await delay()
  const body = await readBody<RestoreBody>(event)
  const deviceId = body?.deviceId?.trim()

  if (!deviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Нужен deviceId',
    })
  }

  const row = await findLatestPurchase(deviceId)
  if (!row) {
    return { found: false }
  }

  return {
    found: true,
    purchase: {
      offerType: row.offer_id,
      deviceId: row.device_id,
      createdAt: row.created_at,
    },
  }
})
