export const emptyArray: readonly any[] = Object.freeze([])

export const setHidden = (obj: any, key: any, value: any) =>
  Object.defineProperty(obj, key, { value, writable: true, configurable: true })

export const isMap = (value: unknown): value is Map<unknown, unknown> =>
  value instanceof Map

export const isObject = (value: unknown): value is object =>
  value && typeof value == 'object'

export const isFunction = (value: unknown): value is Function =>
  typeof value == 'function'

export const isUndefined = (value: unknown): value is undefined =>
  value === void 0

export function rethrowError(error: Error) {
  throw error
}

export const hasOwn = Function.call.bind({}.hasOwnProperty) as (
  obj: object,
  key: keyof any
) => boolean

export const noop = () => {}

export const nope = () => false

export const todo: any = () => {
  throw Error('Not yet implemented')
}
