const getOwnPropertySymbols = Object.getOwnPropertySymbols
const getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors
const defineProperty = Object.defineProperty

export function cloneProperties(source: any, target: any): void {
  const descriptors = getOwnPropertyDescriptors(source)
  const symbols = getOwnPropertySymbols(source)

  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (descriptor.get || descriptor.set) {
      defineProperty(target, key, descriptor)
    }
  }

  for (const sym of symbols) {
    const descriptor = getOwnPropertyDescriptors(source)[sym as any]
    if (descriptor && (descriptor.get || descriptor.set)) {
      defineProperty(target, sym, descriptor)
    }
  }
}
