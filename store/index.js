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
    }
};

export const getters = {
    bookmarks: state => state.bookmarks,
};
