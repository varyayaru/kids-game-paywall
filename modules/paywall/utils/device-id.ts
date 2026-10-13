const STORAGE_KEY = 'lukomorye.deviceId'

export function getDeviceId(): string {
  if (!import.meta.client) {
    return ''
  }

  const existing = window.localStorage.getItem(STORAGE_KEY)
  if (existing) {
    return existing
  }

  const deviceId = crypto.randomUUID()
  window.localStorage.setItem(STORAGE_KEY, deviceId)
  return deviceId
}
