import { isNil } from '../typed/isNil'
import { Key } from '../internal/interfaces'
import { baseOmitBy } from '../internal/baseOmitBy'

/**
 * Creates a new object by excluding the specified keys from the source object.
 * @param object The source object to omit keys from
 * @param excludes Array of keys to exclude from the new object
 * @returns A new object without the specified keys
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])
 * // => { b: 2 }
 *
 * omit({ name: 'John', age: 30, city: 'NYC' }, ['age'])
 * // => { name: 'John', city: 'NYC' }
 */
export function omit(object: any, excludes: Key[]) {
  return isNil(object) ? {} : baseOmit(object, excludes)
}

function baseOmit(object: any, excludes: Key[]) {
  return baseOmitBy(object, (_value, key) => excludes.indexOf(key) !== -1)
}
