const state = {
    showSnackBarObj: {
        snackbar: false,
        color: "success",
        text: "init Snack Bar"
    }
};
const actions = {
    updateSnackBar(context, obj) {
        context.commit('SNACKBAR', obj);
    },
    closeSnackBar(context) {
        context.commit('CLOSESNACKBAR');
    }
};
const mutations = {
    SNACKBAR(state, obj) {
        state.showSnackBarObj = obj;
    },
    CLOSESNACKBAR(state) {
        state.showSnackBarObj.snackbar = false;
    }
};
const getters = {
    showSnackBarObj: state => state.showSnackBarObj,
};

export default {
    state,
    actions,
    mutations,
    getters
};