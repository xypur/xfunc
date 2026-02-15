import { hasOwnProperty } from '../internal/constants'

/**
 * Checks if an object has a specific own property.
 * @param val The object to check
 * @param key The property key to check for
 * @returns True if the object has the own property, false otherwise
 *
 * @example
 * hasOwn({ a: 1 }, 'a')
 * // => true
 *
 * hasOwn({ a: 1 }, 'b')
 * // => false
 */
export function hasOwn(val: object, key: string | symbol): key is keyof typeof val {
  return hasOwnProperty.call(val, key)
}
