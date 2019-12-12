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
        state.settings = {...settings};
        this.$setStorage('settings',settings);
    },
    bookmarks(state, bookmarks){
        state.bookmarks = bookmarks;
    },
    addBookmark (state, bookmark) {
        state.bookmarks.push(bookmark);
        this.$setStorage('bookmarks',state.bookmarks);
    },
    updateBookmark(state, bookmark){
        let bookmarks = {...state.bookmarks};
        bookmarks[bookmark.key] = bookmark;
        state.bookmarks = bookmarks;
        this.$setStorage('bookmarks',bookmarks);
    },
    removeBookmark(state, bookmark){
        let bookmarks = {...state.bookmarks};
        let boomarkers = {};
        Object.keys(bookmarks).forEach(item => {
            if(bookmarks[item].key === bookmark.key){
            } else {
                boomarkers[item] = bookmarks[item];
            }
        });
        state.bookmarks = boomarkers;
        this.$setStorage('bookmarks',boomarkers);
    }
};

export const getters = {
    settings: state => state.settings,
    bookmarks: state => state.bookmarks,
};
