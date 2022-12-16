
import { ofetch } from 'ofetch'

export const isLocalStorageAvailable = () => {
    try {
        const localStorage = window?.localStorage ? window.localStorage : false
        if (localStorage && typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('feature_test', 'yes');
                if (localStorage.getItem('feature_test') === 'yes') {
                    localStorage.removeItem('feature_test');
                    return true
                } else {
                    return false
                }
            } catch(e) {
                return false
            }
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}

export const setLocalStorage = ({key, value}:{key: string, value: object | string}) =>{
    return window.localStorage.setItem(key,JSON.stringify(value))
}

export const getLocalStorage = async (key: string) =>{
    const storageValue = window.localStorage.getItem(key)
    if(storageValue?.length){
        return JSON.parse(storageValue)
    }
    return ''
}

export const retrieveStorageCredentials = () => {
    const gistId = getLocalStorage('gistId')
    const token = getLocalStorage('token')
    return {
        gistId,
        token
    }
}

/**
 * Fetch Gist
 * @param gistId
 * @param token
 */
export const fetchGist = ({gistId, token}: {gistId: string, token: string}) => ofetch(`https://api.github.com/gists/${gistId}`, { headers:{'Accept':'application/vnd.github+json','Authorization':`Bearer ${token}`}, parseResponse: JSON.parse })
