import { isNil } from '../typed/isNil'
import { Key } from '../internal/interfaces'
import { basePickBy } from '../internal/basePickBy'

/**
 * Creates a new object by picking only the specified keys from the source object.
 * @param object The source object to pick keys from
 * @param includes Array of keys to include in the new object
 * @returns A new object with only the specified keys
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
 * // => { a: 1, c: 3 }
 *
 * pick({ name: 'John', age: 30, city: 'NYC' }, ['name', 'city'])
 * // => { name: 'John', city: 'NYC' }
 */
export function pick(object: unknown, includes: Key[]) {
  return isNil(object) ? {} : basePick(object, includes)
}

function basePick(obj: unknown, keys: Key[]) {
  return basePickBy(obj, keys, (_value, key) => Object.hasOwn(obj as object, key))
}
