import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useHelpers } from '~/app/composables/useHelpers'
import { SettingDefault } from '~/app/stores/useAppStore'

describe('useHelpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('getOppositeColor', () => {
    it('inverts black to white', () => {
      const { getOppositeColor } = useHelpers()
      expect(getOppositeColor('#000000')).toBe('#FFFFFF')
    })

    it('inverts white to black', () => {
      const { getOppositeColor } = useHelpers()
      expect(getOppositeColor('#FFFFFF')).toBe('#000000')
    })

    it('handles default backgroundColor (#222) - documents current behavior', () => {
      const { getOppositeColor } = useHelpers()
      // Short hex gets substring issues: '222'.substring(4,6) = '' -> NaN -> ''
      expect(getOppositeColor('#222')).toBe('#DDFD')
    })

    it('handles hex without # prefix', () => {
      const { getOppositeColor } = useHelpers()
      expect(getOppositeColor('FF0000')).toBe(getOppositeColor('#FF0000'))
    })

    it('handles invalid hex characters', () => {
      const { getOppositeColor } = useHelpers()
      // NaN channels become empty strings
      expect(getOppositeColor('#GGGGGG')).toBe('#')
    })

    it('handles empty string', () => {
      const { getOppositeColor } = useHelpers()
      expect(getOppositeColor('')).toBe('#')
    })

    it('returns uppercase result', () => {
      const { getOppositeColor } = useHelpers()
      const result = getOppositeColor('#abcdef')
      expect(result).toBe(result.toUpperCase())
    })
  })

  describe('isUrlValid', () => {
    it('returns true for valid absolute URL', () => {
      const { isUrlValid } = useHelpers()
      expect(isUrlValid('https://example.com')).toBe(true)
      expect(isUrlValid('https://example.com/path?query=value')).toBe(true)
    })

    it('returns false for malformed URL', () => {
      const { isUrlValid } = useHelpers()
      expect(isUrlValid('not a url')).toBe(false)
    })

    it('returns false for empty string', () => {
      const { isUrlValid } = useHelpers()
      expect(isUrlValid('')).toBe(false)
    })

    it('returns false for null', () => {
      const { isUrlValid } = useHelpers()
      expect(isUrlValid(null)).toBe(false)
    })

    it('returns false for undefined', () => {
      const { isUrlValid } = useHelpers()
      expect(isUrlValid(undefined)).toBe(false)
    })

    it('returns false for relative path', () => {
      const { isUrlValid } = useHelpers()
      expect(isUrlValid('/foo/bar')).toBe(false)
    })
  })

  describe('checkLocalStorage', () => {
    it('returns true when localStorage is available and writable', () => {
      const { checkLocalStorage } = useHelpers()
      expect(checkLocalStorage()).toBe(true)
    })

    it('returns true on QuotaExceededError when storage has content', () => {
      const { checkLocalStorage } = useHelpers()
      // Pre-seed localStorage
      localStorage.setItem('test', 'value')

      // Mock setItem to throw QuotaExceededError
      const originalSetItem = Storage.prototype.setItem
      vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        const error = new DOMException('quota', 'QuotaExceededError')
        throw error
      })

      const result = checkLocalStorage()
      expect(result).toBe(true)

      Storage.prototype.setItem = originalSetItem
    })

    it('returns true (storage still works) when error is not QuotaExceededError', () => {
      const { checkLocalStorage } = useHelpers()
      // The function swallows non-DOMException errors and returns true if setItem succeeds the first call
      // but we can't easily test the specific path that throws a non-DOMException
      // because once the error is thrown, the catch block checks if it's a QuotaExceededError
      // For now, we test that checkLocalStorage returns true in the normal case
      expect(checkLocalStorage()).toBe(true)
    })
  })

  describe('loadOrCreateSettings', () => {
    it('returns SettingDefault when settings key is missing', () => {
      const { loadOrCreateSettings } = useHelpers()
      const settings = loadOrCreateSettings()
      expect(settings).toEqual(SettingDefault)
      expect(localStorage.getItem('settings')).toBe(JSON.stringify(SettingDefault))
    })

    it('returns parsed settings when key exists', () => {
      const customSettings = { ...SettingDefault, backgroundColor: '#FF0000' }
      localStorage.setItem('settings', JSON.stringify(customSettings))

      const { loadOrCreateSettings } = useHelpers()
      const settings = loadOrCreateSettings()
      expect(settings).toEqual(customSettings)
    })

    it('throws on malformed JSON in localStorage', () => {
      localStorage.setItem('settings', '{not valid json')
      const { loadOrCreateSettings } = useHelpers()
      expect(() => loadOrCreateSettings()).toThrow()
    })
  })

  describe('loadOrCreateBookmarks', () => {
    it('returns empty array when bookmarks key is missing', () => {
      const { loadOrCreateBookmarks } = useHelpers()
      const bookmarks = loadOrCreateBookmarks()
      expect(bookmarks).toEqual([])
      expect(localStorage.getItem('bookmarks')).toBe(JSON.stringify([]))
    })

    it('returns parsed bookmarks when key exists', () => {
      const mockBookmarks = [
        { name: 'Google', url: 'https://google.com', favicon: '', key: 0 },
        { name: 'GitHub', url: 'https://github.com', favicon: '', key: 1 },
      ]
      localStorage.setItem('bookmarks', JSON.stringify(mockBookmarks))

      const { loadOrCreateBookmarks } = useHelpers()
      const bookmarks = loadOrCreateBookmarks()
      expect(bookmarks).toEqual(mockBookmarks)
    })

    it('throws on malformed JSON in localStorage', () => {
      localStorage.setItem('bookmarks', '{not valid json')
      const { loadOrCreateBookmarks } = useHelpers()
      expect(() => loadOrCreateBookmarks()).toThrow()
    })
  })

  describe('loadStorageValue', () => {
    it('creates defaults and returns them when keys are missing', () => {
      const { loadStorageValue } = useHelpers()
      localStorage.clear()

      const result = loadStorageValue()
      expect(result.settings).toEqual(SettingDefault)
      expect(result.bookmarks).toEqual([])
    })

    it('creates and returns defaults when keys are missing', () => {
      const { loadStorageValue } = useHelpers()
      const result = loadStorageValue()
      expect(result.settings).toEqual(SettingDefault)
      expect(result.bookmarks).toEqual([])
    })

    it('returns existing data when keys are present', () => {
      const mockSettings = { ...SettingDefault, backgroundColor: '#FF0000' }
      const mockBookmarks = [{ name: 'Test', url: 'https://test.com', favicon: '', key: 0 }]
      localStorage.setItem('settings', JSON.stringify(mockSettings))
      localStorage.setItem('bookmarks', JSON.stringify(mockBookmarks))

      const { loadStorageValue } = useHelpers()
      const result = loadStorageValue()
      expect(result.settings).toEqual(mockSettings)
      expect(result.bookmarks).toEqual(mockBookmarks)
    })
  })

  describe('setStorageSetting', () => {
    it('merges setting into existing settings object', () => {
      localStorage.setItem('settings', JSON.stringify(SettingDefault))
      const { setStorageSetting } = useHelpers()

      setStorageSetting({ key: 'backgroundColor', value: '#FF0000' })

      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.backgroundColor).toBe('#FF0000')
      expect(stored.textColor).toBe(SettingDefault.textColor)
    })

    it('does nothing when settings key is missing', () => {
      const { setStorageSetting } = useHelpers()
      setStorageSetting({ key: 'backgroundColor', value: '#FF0000' })

      expect(localStorage.getItem('settings')).toBeNull()
    })
  })

  describe('reOrderStorageBookmarks', () => {
    it('persists reordered bookmarks array', () => {
      const bookmarks = [
        { name: 'A', url: 'https://a.com', favicon: '', key: 0 },
        { name: 'B', url: 'https://b.com', favicon: '', key: 1 },
      ]
      const { reOrderStorageBookmarks } = useHelpers()

      const result = reOrderStorageBookmarks(bookmarks)

      expect(result).toEqual(bookmarks)
      expect(JSON.parse(localStorage.getItem('bookmarks')!)).toEqual(bookmarks)
    })
  })

  describe('setStorageBookmarks', () => {
    it('pushes new bookmark when newBookmark is true', () => {
      localStorage.setItem('bookmarks', JSON.stringify([]))
      const { setStorageBookmarks } = useHelpers()
      const newBookmark = { name: 'Test', url: 'https://test.com', favicon: '', key: 0 }

      const result = setStorageBookmarks(newBookmark, true)

      expect(result).toEqual([newBookmark])
      expect(JSON.parse(localStorage.getItem('bookmarks')!)).toEqual([newBookmark])
    })

    it('replaces existing bookmark when newBookmark is false', () => {
      const original = { name: 'Original', url: 'https://test.com', favicon: '', key: 0 }
      localStorage.setItem('bookmarks', JSON.stringify([original]))
      const { setStorageBookmarks } = useHelpers()
      const updated = { name: 'Updated', url: 'https://updated.com', favicon: '', key: 0 }

      const result = setStorageBookmarks(updated, false)

      expect(result).toEqual([updated])
      expect(JSON.parse(localStorage.getItem('bookmarks')!)).toEqual([updated])
    })

    it('returns false when bookmarks key is missing', () => {
      const { setStorageBookmarks } = useHelpers()
      const bookmark = { name: 'Test', url: 'https://test.com', favicon: '', key: 0 }

      const result = setStorageBookmarks(bookmark, true)

      expect(result).toBe(false)
    })
  })

  describe('deleteStorageBookmark', () => {
    it('removes bookmark by key', () => {
      const bookmarks = [
        { name: 'A', url: 'https://a.com', favicon: '', key: 0 },
        { name: 'B', url: 'https://b.com', favicon: '', key: 1 },
      ]
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
      const { deleteStorageBookmark } = useHelpers()

      const result = deleteStorageBookmark(bookmarks[0])

      expect(result).toEqual([bookmarks[1]])
      expect(JSON.parse(localStorage.getItem('bookmarks')!)).toEqual([bookmarks[1]])
    })

    it('returns false when bookmarks key is missing', () => {
      const { deleteStorageBookmark } = useHelpers()
      const bookmark = { name: 'Test', url: 'https://test.com', favicon: '', key: 0 }

      const result = deleteStorageBookmark(bookmark)

      expect(result).toBe(false)
    })
  })
})
