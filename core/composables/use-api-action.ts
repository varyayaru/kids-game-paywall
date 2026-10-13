import { reactive } from 'vue'

type AsyncFn<Args extends unknown[], Result> = (...args: Args) => Promise<Result>

export interface ActionState<Args extends unknown[], Result> {
  isLoading: boolean
  error?: string
  execute: (...args: Args) => Promise<Result>
}

function toErrorMessage(error: unknown): string | undefined {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data?: { statusMessage?: string; message?: string } }).data
    if (data?.statusMessage) {
      return data.statusMessage
    }
    if (data?.message) {
      return data.message
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return undefined
}

export function useApiAction<Args extends unknown[], Result>(
  fn: AsyncFn<Args, Result>,
): ActionState<Args, Result> {
  const state = reactive({
    isLoading: false,
    error: undefined as string | undefined,
    async execute(...args: Args): Promise<Result> {
      state.isLoading = true
      state.error = undefined
      try {
        return await fn(...args)
      } catch (error) {
        state.error = toErrorMessage(error)
        throw error
      } finally {
        state.isLoading = false
      }
    },
  })

  return state
}
