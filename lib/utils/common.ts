export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getStringFromBuffer(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
