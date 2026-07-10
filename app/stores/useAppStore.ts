import { defineStore, acceptHMRUpdate } from 'pinia'
import { useHelpers } from '~/app/composables/useHelpers'

export type Bookmark = {
  name: string;
  url: string;
  favicon: string;
  key: number;
  new?: boolean
}
export type Bookmarks = Bookmark[]
export const SettingDefault = {
  backgroundColor:"#222",
  textColor:"#fff",
  backgroundImage: null,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center center',
}
export type Setting = {
  backgroundColor: string;
  textColor: string;
  backgroundImage: string | undefined | null;
  backgroundSize: string | null;
  backgroundRepeat: string | null;
  backgroundAttachment: string | null;
  backgroundPosition: string | null;
}

export type AppStoreType = {
  settingsModalOpen: boolean,
  bookmarks: Bookmarks,
  setting:  Setting
}

export const useAppStore = defineStore('useAppStore', {
  state: () => ({
    settingsModalOpen: false,
    bookmarks: [] as Bookmarks,
    setting:  SettingDefault as Setting
  } as AppStoreType),
  getters: {},
  actions: {
    handleUpdateBackgroundColor(value: string){
      this.setting.backgroundColor = value
      const { setStorageSetting } = useHelpers()
      setStorageSetting({key:'backgroundColor', value})
    },
    handleUpdateTextColor(value: string){
      this.setting.textColor = value
      const { setStorageSetting } = useHelpers()
      setStorageSetting({key:'textColor', value})
    },
    handleBackgroundChange(value: string){
      this.setting.backgroundImage = value
      const { setStorageSetting } = useHelpers()
      setStorageSetting({key:'backgroundImage', value})
    },
    handleBackgroundSizeChange(value: string){
      this.setting.backgroundSize = value
      const { setStorageSetting } = useHelpers()
      setStorageSetting({key:'backgroundSize', value})
    },
    handleBackgroundRepeatChange(value: string){
      this.setting.backgroundRepeat = value
      const { setStorageSetting } = useHelpers()
      setStorageSetting({key:'backgroundRepeat', value})
    },
    handleBackgroundAttachmentChange(value: string){
      this.setting.backgroundAttachment = value
      const { setStorageSetting } = useHelpers()
      setStorageSetting({key:'backgroundAttachment', value})
    },
    handleBackgroundPositionChange(value: string){
      this.setting.backgroundPosition = value
      const { setStorageSetting } = useHelpers()
      setStorageSetting({key:'backgroundPosition', value})
    }
  }
})

if (import.meta.hot != null) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
