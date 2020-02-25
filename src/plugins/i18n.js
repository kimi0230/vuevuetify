import Vue from "vue";
import store from "@/store";
import VueI18n from "vue-i18n";

import zh_TW from "@LANG/zh-TW.json";
import en_US from "@LANG/en-US.json";

Vue.use(VueI18n);

export default new VueI18n({
    locale: store.getters.getUserInfo.lang ? store.getters.getUserInfo.lang : "zh",
    messages: {
        "zh": zh_TW,
        "en": en_US
    }
});