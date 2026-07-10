// URL.canParse polyfill for Node < 20 and older happy-dom versions
if (typeof URL.canParse !== 'function') {
  URL.canParse = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
}
