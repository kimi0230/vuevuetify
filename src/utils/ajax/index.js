import axios from "axios";
import {
    encodeAES
} from "@/utils/other/index"
import {
    app
} from "@/main";
import {
    getStorage
}
from '@/utils/localstorage'
axios.interceptors.request.use(
    config => {
        // header 塞 auth
        config.headers = {
            "content-type": "application/json",
            "Authorization": app.$store.getters.getAuth
        };
        // 補上token, 語言, 時區
        const userInfo = getStorage("localUserInfo");
        config.data["userToken"] = userInfo.token;
        config.data["lang"] = userInfo.lang;
        config.data["zone"] = userInfo.userZone;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export const Ajax = (method, url, params, checkToken = true) => {
    let methodStr = method.toLowerCase();
    let data = axios.create({
        // Now all requests using this instance will wait 3 seconds before timing out
        // timeout: 3000,
        // headers: {
        //     "content-type": "application/json"
        // }
    });
    const userInfo = app.$store.getters.getUserInfo;
    if (checkToken) {
        params.token = userInfo.token;
        params.email = userInfo.email;
    }
    switch (methodStr) {
        case "get":
            let tmpParas = params => {
                return QS.stringify(params);
            };
            data = axios.get(url, tmpParas);
            break;
        case "post":
            data = axios.post(url, params);
            break;
        default:
            data = axios.post(url, {})
    }

    data = data.then((res) => {
        return res.data;
    }).catch(error => {
        // 錯誤處理
        console.log("!!!!! AJAX error !!!!!", error);
        if (error.response) {
            // 自定義的錯誤
            return {
                ...error.response.data
            }
        } else {
            //斷網回傳格式
            return (error.response = {
                Data: {},
                Result: {
                    status: false,
                    code: "404",
                    message: "not network"
                }
            });
        }
    });

    return data;
};