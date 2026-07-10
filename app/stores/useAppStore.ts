import { defineStore, acceptHMRUpdate } from 'pinia'
const {setStorageSetting} = useHelpers()

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
      setStorageSetting({key:'backgroundColor', value})
    },
    handleUpdateTextColor(value: string){
      this.setting.textColor = value
      setStorageSetting({key:'textColor', value})
    },
    handleBackgroundChange(value: string){
      this.setting.backgroundImage = value
      setStorageSetting({key:'backgroundImage', value})
    },
    handleBackgroundSizeChange(value: string){
      this.setting.backgroundSize = value
      setStorageSetting({key:'backgroundSize', value})
    },
    handleBackgroundRepeatChange(value: string){
      this.setting.backgroundRepeat = value
      setStorageSetting({key:'backgroundRepeat', value})
    },
    handleBackgroundAttachmentChange(value: string){
      this.setting.backgroundAttachment = value
      setStorageSetting({key:'backgroundAttachment', value})
    },
    handleBackgroundPositionChange(value: string){
      this.setting.backgroundPosition = value
      setStorageSetting({key:'backgroundPosition', value})
    }
  }
})

if (import.meta.hot != null) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
