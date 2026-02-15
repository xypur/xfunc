import { isNil } from '../typed/isNil'
import { Key } from '../internal/interfaces'
import { baseOmitBy } from '../internal/baseOmitBy'

/**
 * Creates a new object by omitting key-value pairs where the callback returns true.
 * @param object The source object to filter entries from
 * @param callback Function that determines whether to omit each key-value pair
 * @returns A new object with the filtered entries
 *
 * @example
 * omitBy({ a: 1, b: null, c: 3 }, (value) => value === null)
 * // => { a: 1, c: 3 }
 *
 * omitBy({ name: 'John', age: 30, active: false }, (value, key) => key === 'active')
 * // => { name: 'John', age: 30 }
 */
export function omitBy(object: unknown, callback: (value: unknown, key: Key) => boolean) {
  return isNil(object) ? {} : baseOmitBy(object, callback)
}
