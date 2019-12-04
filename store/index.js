const initialState = () => {
    return {
        bookmarks: []
    }
};

export const state = () => initialState();

export const mutations = {
    addBookmark (state, bookmark) {
        state.bookmarks.push(bookmark);
    }
};

export const getters = {
    bookmarks: state => state.bookmarks
};
