import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore, SettingDefault } from '~/app/stores/useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    // Pre-seed settings to localStorage so store actions can persist
    localStorage.setItem('settings', JSON.stringify(SettingDefault))
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('initial state', () => {
    it('has settingsModalOpen as false', () => {
      const store = useAppStore()
      expect(store.settingsModalOpen).toBe(false)
    })

    it('has empty bookmarks array', () => {
      const store = useAppStore()
      expect(store.bookmarks).toEqual([])
    })

    it('has SettingDefault as initial setting', () => {
      const store = useAppStore()
      expect(store.setting).toEqual(SettingDefault)
    })
  })

  describe('handleUpdateBackgroundColor', () => {
    it('updates backgroundColor in state', () => {
      const store = useAppStore()
      store.handleUpdateBackgroundColor('#FF0000')
      expect(store.setting.backgroundColor).toBe('#FF0000')
    })

    it('persists to localStorage', () => {
      const store = useAppStore()
      store.handleUpdateBackgroundColor('#FF0000')
      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.backgroundColor).toBe('#FF0000')
    })

    it('preserves other settings', () => {
      const store = useAppStore()
      const originalTextColor = store.setting.textColor
      store.handleUpdateBackgroundColor('#FF0000')
      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.textColor).toBe(originalTextColor)
    })
  })

  describe('handleUpdateTextColor', () => {
    it('updates textColor in state', () => {
      const store = useAppStore()
      store.handleUpdateTextColor('#00FF00')
      expect(store.setting.textColor).toBe('#00FF00')
    })

    it('persists to localStorage', () => {
      const store = useAppStore()
      store.handleUpdateTextColor('#00FF00')
      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.textColor).toBe('#00FF00')
    })
  })

  describe('handleBackgroundChange', () => {
    it('updates backgroundImage in state', () => {
      const store = useAppStore()
      store.handleBackgroundChange('https://example.com/image.jpg')
      expect(store.setting.backgroundImage).toBe('https://example.com/image.jpg')
    })

    it('persists to localStorage', () => {
      const store = useAppStore()
      store.handleBackgroundChange('https://example.com/image.jpg')
      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.backgroundImage).toBe('https://example.com/image.jpg')
    })
  })

  describe('handleBackgroundSizeChange', () => {
    it('updates backgroundSize in state', () => {
      const store = useAppStore()
      store.handleBackgroundSizeChange('contain')
      expect(store.setting.backgroundSize).toBe('contain')
    })

    it('persists to localStorage', () => {
      const store = useAppStore()
      store.handleBackgroundSizeChange('contain')
      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.backgroundSize).toBe('contain')
    })
  })

  describe('handleBackgroundRepeatChange', () => {
    it('updates backgroundRepeat in state', () => {
      const store = useAppStore()
      store.handleBackgroundRepeatChange('repeat')
      expect(store.setting.backgroundRepeat).toBe('repeat')
    })

    it('persists to localStorage', () => {
      const store = useAppStore()
      store.handleBackgroundRepeatChange('repeat')
      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.backgroundRepeat).toBe('repeat')
    })
  })

  describe('handleBackgroundAttachmentChange', () => {
    it('updates backgroundAttachment in state', () => {
      const store = useAppStore()
      store.handleBackgroundAttachmentChange('scroll')
      expect(store.setting.backgroundAttachment).toBe('scroll')
    })

    it('persists to localStorage', () => {
      const store = useAppStore()
      store.handleBackgroundAttachmentChange('scroll')
      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.backgroundAttachment).toBe('scroll')
    })
  })

  describe('handleBackgroundPositionChange', () => {
    it('updates backgroundPosition in state', () => {
      const store = useAppStore()
      store.handleBackgroundPositionChange('top left')
      expect(store.setting.backgroundPosition).toBe('top left')
    })

    it('persists to localStorage', () => {
      const store = useAppStore()
      store.handleBackgroundPositionChange('top left')
      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.backgroundPosition).toBe('top left')
    })
  })

  describe('multiple action calls', () => {
    it('updates state across multiple actions', () => {
      const store = useAppStore()
      store.handleUpdateBackgroundColor('#AABBCC')
      store.handleUpdateTextColor('#112233')
      store.handleBackgroundChange('https://example.com/bg.jpg')

      expect(store.setting.backgroundColor).toBe('#AABBCC')
      expect(store.setting.textColor).toBe('#112233')
      expect(store.setting.backgroundImage).toBe('https://example.com/bg.jpg')
    })

    it('persists all changes to localStorage', () => {
      const store = useAppStore()
      store.handleUpdateBackgroundColor('#AABBCC')
      store.handleUpdateTextColor('#112233')
      store.handleBackgroundChange('https://example.com/bg.jpg')

      const stored = JSON.parse(localStorage.getItem('settings')!)
      expect(stored.backgroundColor).toBe('#AABBCC')
      expect(stored.textColor).toBe('#112233')
      expect(stored.backgroundImage).toBe('https://example.com/bg.jpg')
    })
  })
})
