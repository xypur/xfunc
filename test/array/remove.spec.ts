import { describe, it, expect } from 'vitest'
import { remove } from '../../src/array'

describe('remove', () => {
  it('should remove the first occurrence of an item', () => {
    const arr = [1, 2, 3, 2]
    remove(arr, 2)
    expect(arr).toEqual([1, 3, 2])
  })

  it('should not modify array when item is not found', () => {
    const arr = [1, 2, 3]
    remove(arr, 4)
    expect(arr).toEqual([1, 2, 3])
  })

  it('should remove the only element', () => {
    const arr = [1]
    remove(arr, 1)
    expect(arr).toEqual([])
  })

  it('should handle empty array', () => {
    const arr: number[] = []
    remove(arr, 1)
    expect(arr).toEqual([])
  })

  it('should work with strings', () => {
    const arr = ['a', 'b', 'c', 'b']
    remove(arr, 'b')
    expect(arr).toEqual(['a', 'c', 'b'])
  })

  it('should work with boolean values', () => {
    const arr = [true, false, true]
    remove(arr, false)
    expect(arr).toEqual([true, true])
  })

  it('should modify the original array', () => {
    const arr = [1, 2, 3]
    const result = remove(arr, 2)
    expect(result).toBe(arr)
  })

  it('should use strict equality (Object.is)', () => {
    const a = { id: 1 }
    const b = { id: 1 }
    const arr = [a, b]
    remove(arr, b)
    expect(arr).toEqual([a])
  })
})
