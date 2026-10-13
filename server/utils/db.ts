import { neon } from '@neondatabase/serverless'

export type PurchaseRow = {
  offer_id: string
  device_id: string
  created_at: string
}

let ensured = false
const memoryPurchases: PurchaseRow[] = []

function hasDatabaseUrl() {
  return Boolean(useRuntimeConfig().databaseUrl)
}

function requireDatabaseInProduction() {
  if (hasDatabaseUrl()) {
    return
  }
  const isProd = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
  if (isProd) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Не настроена база данных',
    })
  }
}

export function getSql() {
  const config = useRuntimeConfig()
  const databaseUrl = config.databaseUrl
  if (!databaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Не настроена база данных',
    })
  }
  return neon(databaseUrl)
}

export async function ensurePurchasesTable() {
  if (!hasDatabaseUrl() || ensured) {
    return
  }
  const sql = getSql()
  await sql`
    CREATE TABLE IF NOT EXISTS purchases (
      id SERIAL PRIMARY KEY,
      offer_id TEXT NOT NULL,
      device_id TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS purchases_device_id_idx ON purchases (device_id)
  `
  ensured = true
}

export async function insertPurchase(offerId: string, deviceId: string): Promise<PurchaseRow> {
  requireDatabaseInProduction()
  if (!hasDatabaseUrl()) {
    const row: PurchaseRow = {
      offer_id: offerId,
      device_id: deviceId,
      created_at: new Date().toISOString(),
    }
    memoryPurchases.unshift(row)
    return row
  }

  await ensurePurchasesTable()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO purchases (offer_id, device_id)
    VALUES (${offerId}, ${deviceId})
    RETURNING offer_id, device_id, created_at::text
  `
  return rows[0] as PurchaseRow
}

export async function findLatestPurchase(deviceId: string): Promise<PurchaseRow | undefined> {
  requireDatabaseInProduction()
  if (!hasDatabaseUrl()) {
    return memoryPurchases.find((row) => row.device_id === deviceId)
  }

  await ensurePurchasesTable()
  const sql = getSql()
  const rows = await sql`
    SELECT offer_id, device_id, created_at::text
    FROM purchases
    WHERE device_id = ${deviceId}
    ORDER BY created_at DESC
    LIMIT 1
  `
  return rows[0] as PurchaseRow | undefined
}
