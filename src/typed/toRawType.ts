import { ObjectToString } from '../internal/constants'

/**
 * Gets the raw type of a value by extracting it from Object.prototype.toString result.
 * This replaces the isTypeString method with a more descriptive name.
 * @param value The value to check
 * @returns The raw type string (e.g., 'Object', 'Array', 'String')
 *
 * @example
 * toRawType({})
 * // => 'Object'
 *
 * toRawType([])
 * // => 'Array'
 *
 * toRawType('hello')
 * // => 'String'
 *
 * toRawType(123)
 * // => 'Number'
 */
export function toRawType(value: unknown): string {
  // extract "RawType" from strings like "[object RawType]"
  return ObjectToString.call(value).slice(8, -1)
}
