import { defineStore, acceptHMRUpdate } from 'pinia'
import {ofetch} from "ofetch";
import {getLocalStorage} from "~/composables/utilities";

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
        }
    },
    actions: {
        async sync(){
            this.gistId = await getLocalStorage('gistId')
            this.token = await getLocalStorage('token')
            return await this.fetchGist()
        },
        async fetchGist() {
            if(!this.gistId || !this.token || this.gist?.owner){
                return false
            }
            const gist = await ofetch(`https://api.github.com/gists/${this.gistId}`, { headers:{'Accept':'application/vnd.github+json','Authorization':`Bearer ${this.token}`}, parseResponse: JSON.parse }).catch((error)=>{
                this.error = error
                return Promise.reject(error)
            })
            this.bookmarks = gist?.files['bookmarks.json']?.content ? JSON.parse(gist.files['bookmarks.json'].content) : []
            this.settings = gist?.files['bookmark-settings.json']?.content ? JSON.parse(gist.files['bookmark-settings.json'].content) : {}
            this.gist = gist
            return gist
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(storeGist, import.meta.hot))
}
