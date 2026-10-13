import { delay } from '../utils/delay'
import { OFFERS } from '../utils/offers'

export default defineEventHandler(async () => {
  await delay()
  return { items: OFFERS }
})
