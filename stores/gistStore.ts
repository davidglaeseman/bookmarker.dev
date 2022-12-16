import { defineStore, acceptHMRUpdate } from 'pinia'
import {ofetch} from "ofetch";
import {getLocalStorage, setLocalStorage} from "~/composables/utilities";

interface OwnerInterface {
    login: string;
    id: number;
    node_id: string;
    html_url: string;
    avatar_url: string;
}

interface GistInterface {
    comments: number
    comments_url: string,
    owner: OwnerInterface,
}

interface Bookmark{
    name: string;
    url: string;
    favicon: string;
    key: number;
    svg?: string;
}

export const storeGist = defineStore('storeGist', {
    state: () => ({
        defaultBackgroundClass:'bg-gradient-to-b from-[#141535] to-[#0d1116]',
        gistId: '',
        token: '',
        gist: null as GistInterface | null,
        error: false,
        bookmarks: [] as Bookmark[],
        settings: {
            backgroundColor:'',
            backgroundImage:''
        }
    }),
    getters:{
        backgroundStyles(state){
            if(state.settings?.backgroundColor || state.settings?.backgroundImage){
                return {
                    style: `background: url(${state.settings?.backgroundImage}) ${state.settings?.backgroundColor} no-repeat center center fixed; background-size: cover;`
                }
            }
            return {
                class: state.defaultBackgroundClass
            }
        },
        settingsPayload(state){
            return {
                description:"Bookmarker.dev Settings",
                files: {
                    'bookmark-settings.json':{
                        content: JSON.stringify({ backgroundColor: state.settings.backgroundColor, backgroundImage: state.settings.backgroundImage,})
                    }
                }
            }
        },
        bookmarksPayload(state){
            return {
                description:"Bookmarker.dev Bookmarks",
                files: {
                    'bookmarks.json':{
                        content: JSON.stringify(state.bookmarks)
                    }
                }
            }
        }
    },
    actions: {
        async sync(){
            this.gistId = await getLocalStorage('gistId')
            this.token = await getLocalStorage('token')

            if(this.gistId && this.token){
                return await this.fetchGist()
            } else {
                this.settings = await getLocalStorage('settings')
                this.bookmarks = await getLocalStorage('bookmarks')
            }

        },
        transformData(data: string){
            try{
                return JSON.parse(data)
            } catch (e) {
                return data
            }
        },
        async fetchGist() {
            if(!this.gistId || !this.token || this.gist?.owner){
                return false
            }
            const gist = await ofetch(`https://api.github.com/gists/${this.gistId}`, { headers:{'Accept':'application/vnd.github+json','Authorization':`Bearer ${this.token}`}, parseResponse: JSON.parse }).catch((error)=>{
                this.error = error
                return Promise.reject(error)
            })
            this.bookmarks = gist?.files['bookmarks.json']?.content ? this.transformData(gist.files['bookmarks.json'].content) : []
            this.settings = gist?.files['bookmark-settings.json']?.content ? this.transformData(gist.files['bookmark-settings.json'].content) : {}
            this.gist = gist
            return gist
        },
        async saveToken(){
            const isValidGist = await ofetch(`https://api.github.com/gists/${this.gistId}`, { method:'get', parseResponse: JSON.parse }).catch((error)=> Promise.reject(error.data))
            if(this.gistId && this.token && isValidGist){
                setLocalStorage({key:'gistId', value: this.gistId})
                setLocalStorage({key:'token', value: this.token})
            } else {
                console.log('snmaksksk')
            }
        },
        async saveData(section: string){
            if(!this.gist){
                if(section === 'section'){
                    setLocalStorage({key:'settings', value: this.settings})
                } else if(section === 'bookmarks'){
                    setLocalStorage({key:'bookmarks', value: this.bookmarks})
                }
            } else {

                const body = section === 'settings' ? this.settingsPayload : this.bookmarksPayload
                await ofetch(`https://api.github.com/gists/${this.gistId}`, { method:'PATCH', body, headers:{'Accept':'application/vnd.github+json','Authorization':`Bearer ${this.token}`}, parseResponse: JSON.parse }).catch((error)=> error.data)
            }
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(storeGist, import.meta.hot))
}
