import { unknownToRestore } from 'modules/paywall/utils/schemas'

export const restoreResolver = async (deviceId: string) => {
  const payload = await $fetch('/api/restore', {
    method: 'POST',
    body: { deviceId },
  })
  return unknownToRestore(payload)
}
