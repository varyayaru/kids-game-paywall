export function createMapGetter<
  I extends string | number,
  O,
  P extends 'partial' | 'full' = 'full',
>(
  map: P extends 'partial' ? Partial<Record<I, O>> : Record<I, O>,
  options?: { defaultValue?: O },
): (i: I) => O {
  const { defaultValue } = options || {}

  return (i: I) => {
    if (map[i] === undefined && defaultValue === undefined) {
      throw new TypeError(`${String(i)} is not set in createMapGetter`)
    }

    return (map[i] ?? defaultValue) as O
  }
}
