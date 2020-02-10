import {
    encodeAES,
    decodeAES
} from "@/utils/other/index"
import {
    app
} from "@/main";
import {
    Ajax
} from "@/utils/ajax/index";

const state = {
    userInfo: initInfo,
    userPermission: {},
    lang: "",
    userZone: "",
    authorization: ""
};

const initInfo = {
    id: "",
    email: "",
    name: "",
    avatarPath: "",
    token: "",
    expirationDate: ""
}

const actions = {
    login({
        dispatch,
        commit
    }, obj) {
        const getAjax = (async () => {
            const data = await Ajax(
                "post",
                process.env.VUE_APP_API_URL + "/api/login",
                obj,
                false
            );
            if (!data.Result.status) {
                //有錯誤跳 snackbar
                dispatch("updateSnackBar", {
                    snackbar: true,
                    color: "error",
                    text: data.Result.message
                });
            } else {
                // 塞資料給vuex
                dispatch("updateInfo", {
                    id: data.Data.id,
                    email: data.Data.email,
                    name: data.Data.name,
                    avatarPath: data.Data.avatarPath,
                    token: data.Data.token,
                    expirationDate: data.Data.expirationDate
                });
                dispatch("updatePermission", {
                    allowURL: data.Data.allowURL,
                    allowID: data.Data.allowID
                });
                app.$router.push({
                    path: "/admin/home"
                });
            }
        })();
    },
    updateInfo(context, obj) {
        const auth = encodeAES(JSON.stringify(obj));
        localStorage.setItem("localUserInfo", auth);
        context.commit('UPDATE_USER_INFO', obj);
        context.commit('UPDATE_AUTH', auth);
    },
    updatePermission(context, obj) {
        const permission = encodeAES(JSON.stringify(obj));
        localStorage.setItem("localUserPermission", permission);
        context.commit('UPDATE_USER_PERMISSION', obj);
    },
    logout(context) {
        localStorage.removeItem("localUserInfo");
        context.commit('DELETE_USER_INFO');
        localStorage.removeItem("localUserPermission");
        context.commit('DELETE_USER_PERMISSION');
        app.$router.push({
            path: "/login"
        });
    }
};
const mutations = {
    UPDATE_USER_INFO(state, obj) {
        state.userInfo = obj;
    },
    DELETE_USER_INFO(state) {
        state.userInfo = initInfo;
    },
    UPDATE_AUTH(state, obj) {
        state.authorization = obj;
    },
    UPDATE_USER_PERMISSION(state, obj) {
        state.userPermission = obj;
    },
    DELETE_USER_PERMISSION(state, obj) {
        state.userPermission = {};
    },
};
const getters = {
    getUserInfo(state) {
        let userInfo = state.userInfo;
        if (!userInfo && localStorage.getItem('localUserInfo')) {
            userInfo = decodeAES(localStorage.getItem('localUserInfo'));
        }
        return userInfo;
    },
    getUserPermission(state) {
        let userPermission = state.userPermission;
        if (!userPermission && localStorage.getItem('localUserPermission')) {
            userPermission = decodeAES(localStorage.getItem('localUserPermission'));
        }
        return userPermission;
    },
    getAuth(state) {
        return state.authorization;
    }

};

export default {
    state,
    actions,
    mutations,
    getters
};