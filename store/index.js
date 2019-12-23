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
        state.bookmarks = [...state.bookmarks];
        state.bookmarks.push(bookmark);
        this.$setStorage('bookmarks',state.bookmarks);
    },
    updateBookmark(state, bookmark){
        state.bookmarks = [...state.bookmarks.map(index => {
            if(index.key === 0 && bookmark.key === 0){
                return bookmark;
            } else if(index.key && bookmark.key && index.key === bookmark.key){
                return bookmark;
            } else {
                return index;
            }
        })];
        this.$setStorage('bookmarks',state.bookmarks);
    },
    removeBookmark(state, bookmark){
        state.bookmarks = [...state.bookmarks.filter(index => {
            if(bookmark.key !== index.key){
                return index;
            }
        })];
        this.$setStorage('bookmarks',state.bookmarks);
    },
    reorderBookmarks(state, bookmarks){
        this.state.bookmarks = bookmarks.map((item, index) => {
            item.key = index;
            return item;
        });
        this.$setStorage('bookmarks',this.state.bookmarks);
    }
};

export const getters = {
    settings: state => state.settings,
    bookmarks: state => state.bookmarks,
};
