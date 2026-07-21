import { describe, it, expect, beforeEach, vi } from 'vitest'
import { throttle } from '../../src/function'

// Use vitest fake timers
vi.useFakeTimers()

describe('throttle', () => {
  beforeEach(() => {
    vi.useRealTimers()
    vi.useFakeTimers()
    vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  })

  it('is a function', () => {
    expect(typeof throttle).toBe('function')
  })

  it('Throttling', async() => {
    let counts = 0
    const fn = () => counts += 1
    const throttFn = throttle(fn, 32)

    throttFn(); throttFn()
    expect(counts).toBe(1)

    await vi.advanceTimersByTimeAsync(64)
    expect(counts).toBe(2)
  })

  it('arguments', async() => {
    let value = null
    const fn = (val: any) => { value = val }
    const throttledFn = throttle(fn, 32)

    throttledFn(1)
    throttledFn(2)
    expect(value).toBe(1)

    await vi.advanceTimersByTimeAsync(64)
    expect(value).toBe(2)
  })

  it('throttle call once', async() => {
    const fn = vi.fn(() => 5)
    const throttledFn = throttle(fn, 32)

    const result = throttledFn()
    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(result).toBe(5)
  })

  it('throttle call twice', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn()
    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('throttle call three times', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn(); throttledFn()
    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('multiple throttle calls', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(32)
    expect(fn).toHaveBeenCalledTimes(2)
    throttledFn()
    await vi.advanceTimersByTimeAsync(32)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('return value with multiple throttle calls', async() => {
    let counts = 0
    const fn = () => counts += 1
    const throttledFn = throttle(fn, 100)

    const results: number[] = []
    results.push(throttledFn())
    results.push(throttledFn())
    expect(results[0]).toBe(1)
    expect(results[1]).toBe(1)

    await vi.advanceTimersByTimeAsync(200)
    results.push(throttledFn())
    expect(results[2]).toBe(3)
  })

  it('trigger delayed call after multiple calls', async() => {
    let counts = 0
    const fn = () => { counts += 1 }
    const throttledFn = throttle(fn, 32)

    // Simulate rapid calls
    for (let i = 0; i < 100; i++) {
      throttledFn()
    }

    const lastCount = counts
    expect(lastCount).toBeGreaterThan(0)

    await vi.advanceTimersByTimeAsync(96)
    expect(counts).toBeGreaterThan(lastCount)
  })

  it('does not trigger first call when leading is set to false', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32, { leading: false })

    throttledFn()
    throttledFn()
    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('multiple throttle calls do not trigger first call when leading: false', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100, { leading: false })

    throttledFn()
    throttledFn()
    await vi.advanceTimersByTimeAsync(100)
    expect(fn).toHaveBeenCalledTimes(1) // First trigger

    throttledFn()
    throttledFn() // Immediate call, reset timer
    await vi.advanceTimersByTimeAsync(50)
    expect(fn).toHaveBeenCalledTimes(1) // Still 1 time, because 50ms < 100ms

    await vi.advanceTimersByTimeAsync(50)
    expect(fn).toHaveBeenCalledTimes(2) // Now it's 2 times (100ms after last call)
  })

  it('more leading: false tests', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100, { leading: false })

    // Simulate rapid calls
    for (let i = 0; i < 10; i++) {
      throttledFn()
      await vi.advanceTimersByTimeAsync(36)
    }

    expect(fn).toHaveBeenCalledTimes(3)
    await vi.advanceTimersByTimeAsync(200)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  it('throttle does not trigger last delayed call when trailing is set to false', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 60, { trailing: false })

    throttledFn(); throttledFn(); throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(90)
    expect(fn).toHaveBeenCalledTimes(1)
    throttledFn(); throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(90)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('throttle function continues to work when system time is modified', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    // Use spy to replace Date methods
    const dateNowSpy = vi.spyOn(Date, 'now').mockReturnValue(1000000)
    const dateGetTimeSpy = vi.spyOn(Date.prototype, 'getTime').mockReturnValue(1000000)

    throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    // Modify time
    dateNowSpy.mockReturnValue(2000000)
    dateGetTimeSpy.mockReturnValue(2000000)

    await vi.advanceTimersByTimeAsync(200)
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    // Restore original functions
    dateNowSpy.mockRestore()
    dateGetTimeSpy.mockRestore()
  })

  it('throttle function continues to work when system time is inaccessible', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(100)
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(100)
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('throttled function can be called with context', async() => {
    let values: any[] = []
    const fn = vi.fn(function(...args) {
      values = values.concat([this, ...args])
    })

    const throttledFn = throttle(fn, 32)

    throttledFn.call('a1', 'a2')
    expect(values).toEqual(['a1', 'a2'])

    await vi.advanceTimersByTimeAsync(32)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('can cancel throttle', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32)
    throttledFn()
    throttledFn.cancel()
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(32)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('cancel delayed call when leading: false', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32, { leading: false })
    throttledFn()
    throttledFn.cancel()

    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(0)
  })
})
