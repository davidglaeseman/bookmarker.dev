const initialState = () => {
    return {
        bookmarks: [],
        settings:{
            backgroundColor: '#efefef',
            backgroundImages:[]
        }
    }
};

export const state = () => initialState();

export const mutations = {
    settings(state, settings){
        state.settings = settings;
    },
    updateSettings(state, settings){
        state.settings = settings;//{...state.settings, 'xxx': setting};
        localStorage.setItem('settings',JSON.stringify(settings));
    },
    bookmarks(state, bookmarks){
        state.bookmarks = bookmarks;
    },
    addBookmark (state, bookmark) {
        state.bookmarks.push(bookmark);
    },
    updateBookmark(state, bookmark){
        let bookmarks = {...state.bookmarks};
        bookmarks[bookmark.key] = bookmark;
        state.bookmarks = bookmarks;
        localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
    }
};

export const getters = {
    settings: state => state.settings,
    bookmarks: state => state.bookmarks,
};
