import Vue from 'vue'
import Vuex from 'vuex'
import Snack from '@SM/SnackBar'
import Login from '@SM/Login'

Vue.use(Vuex)

// 不要發布環境下啟用嚴格模式
const strictMode = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Snack,
    Login
  },
  strict: strictMode,
})