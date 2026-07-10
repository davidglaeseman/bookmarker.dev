import {type Bookmark, SettingDefault} from "@/stores/useAppStore";

export const useHelpers = () => {

    const getOppositeColor = (hex: string)=> {
        const cleanHex = hex.replace('#', '');
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        const oppositeR = 255 - r;
        const oppositeG = 255 - g;
        const oppositeB = 255 - b;
        let hexR = oppositeR.toString(16).padStart(2, '0');
        let hexG = oppositeG.toString(16).padStart(2, '0');
        let hexB = oppositeB.toString(16).padStart(2, '0');
        if(hexR==='NaN'){
            hexR = ''
        }
        if(hexG==='NaN'){
            hexG = ''
        }
        if(hexB==='NaN'){
            hexB = ''
        }
        return `#${hexR}${hexG}${hexB}`.toUpperCase();
    }

    const isUrlValid = (url: string | null | undefined) => {
        if(url && url?.length > 0){
            return URL.canParse(url)
        }
        return false
    }

    const checkLocalStorage = () => {
        try {
            const storage = window.localStorage;
            const testKey = "--bookmarkerdev--";
            storage.setItem(testKey, testKey);
            storage.removeItem(testKey);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                window.localStorage &&
                window.localStorage.length !== 0
            );
        }
    }

    const loadOrCreateSettings = () => {
        const validSettings = window.localStorage.getItem('settings')
        if(!validSettings){
            window.localStorage.setItem('settings', JSON.stringify(SettingDefault))
            return SettingDefault
        }
        return JSON.parse(validSettings)
    }

    const loadOrCreateBookmarks = () => {
        const validBookmarks = window.localStorage.getItem('bookmarks')
        if(!validBookmarks){
            window.localStorage.setItem('bookmarks', JSON.stringify([]))
            return []
        }
        return JSON.parse(validBookmarks)
    }

    const loadStorageValue = () => {
        const validStorage = checkLocalStorage()
        if(validStorage){
            const settings = loadOrCreateSettings()
            const bookmarks = loadOrCreateBookmarks()

            return {
                bookmarks,
                settings,
            }
        }

        return {
            settings:{},
            bookmarks: []
        }

    }

    const setStorageSetting = ({key, value}: {key: string; value: string}) => {
        const settings = window.localStorage.getItem('settings')
        const settingsJson = settings ? JSON.parse(settings) : null
        if(settingsJson){
            const data = {
                ...settingsJson,
                [key]: value
            }
            window.localStorage.setItem('settings', JSON.stringify(data))
        }
    }

    const reOrderStorageBookmarks = (reOrderedBookmarks: Bookmark[]) => {
        window.localStorage.setItem('bookmarks', JSON.stringify(reOrderedBookmarks))
        return reOrderedBookmarks
    }

    const setStorageBookmarks = (bookmark: Bookmark, newBookmark: boolean) => {
        const bookmarks = window.localStorage.getItem('bookmarks')
        let bookmarksJson = bookmarks ? JSON.parse(bookmarks) : null
        if(bookmarksJson){
            if(newBookmark){
                bookmarksJson.push(bookmark)
            } else{
                bookmarksJson = bookmarksJson.map((bm: Bookmark) => bm.key === bookmark.key ? bookmark : bm)
            }
            window.localStorage.setItem('bookmarks', JSON.stringify(bookmarksJson))
            return bookmarksJson
        }
        return false
    }

    const deleteStorageBookmark = (bookmark: Bookmark) => {
        const bookmarks = window.localStorage.getItem('bookmarks')
        let bookmarksJson = bookmarks ? JSON.parse(bookmarks) : null
        if(bookmarksJson){
            bookmarksJson = bookmarksJson.filter((bm: Bookmark) => bm.key !== bookmark.key)
            window.localStorage.setItem('bookmarks', JSON.stringify(bookmarksJson))
            return bookmarksJson
        }
        return false
    }

    return {
        reOrderStorageBookmarks,
        deleteStorageBookmark,
        setStorageBookmarks,
        setStorageSetting,
        loadStorageValue,
        getOppositeColor,
        isUrlValid,
        checkLocalStorage,
        loadOrCreateSettings,
        loadOrCreateBookmarks
    }

}
