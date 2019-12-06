const initialState = () => {
    return {
        bookmarks: []
    }
};

export const state = () => initialState();

export const mutations = {
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
    bookmarks: state => state.bookmarks,
};
