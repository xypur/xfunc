import { describe, it, expect } from 'vitest'
import { memoize } from '../../src/function'

describe('memoize', () => {
  it('should memoize function results', () => {
    let callCount = 0
    const fn = memoize((n: number) => {
      callCount++
      return n * 2
    })

    expect(fn(2)).toBe(4)
    expect(fn(2)).toBe(4)
    expect(callCount).toBe(1)
  })

  it('should compute distinct results for different arguments', () => {
    const fn = memoize((n: number) => n * 2)
    expect(fn(2)).toBe(4)
    expect(fn(3)).toBe(6)
  })

  it('should use custom resolver', () => {
    let callCount = 0
    const fn = memoize(
      (obj: { id: number }) => {
        callCount++
        return obj.id
      },
      { resolver: obj => obj.id }
    )

    expect(fn({ id: 1 })).toBe(1)
    expect(fn({ id: 1 })).toBe(1)
    expect(callCount).toBe(1)

    expect(fn({ id: 2 })).toBe(2)
    expect(callCount).toBe(2)
  })

  it('should respect maxSize', () => {
    let callCount = 0
    const fn = memoize(
      (n: number) => {
        callCount++
        return n
      },
      { maxSize: 2 }
    )

    fn(1)
    fn(2)
    expect(callCount).toBe(2)

    fn(1)
    fn(2)
    expect(callCount).toBe(2)

    fn(3)
    expect(callCount).toBe(3)

    fn(1)
    expect(callCount).toBe(4)
  })

  it('should preserve this context', () => {
    const fn = memoize(function(this: any) {
      return this.value
    })

    const obj = { value: 42, fn }
    expect(obj.fn()).toBe(42)
  })

  it('should use JSON.stringify as default resolver', () => {
    const fn = memoize((obj: any) => obj)
    const a = { x: 1 }
    const b = { x: 1 }
    expect(fn(a)).toBe(a)
    expect(fn(b)).toBe(a)
  })
})
