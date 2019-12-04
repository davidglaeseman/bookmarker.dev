let initialState = () => {
    return {
        modal: false
    }
};

export const state = () => initialState();

export const mutations = {
    modal (state, modal) {
        state.modal = modal;
    }
};

export const getters = {
    modal: state => state.modal
};
