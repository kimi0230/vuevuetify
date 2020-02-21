import AES from 'crypto-js/aes';
import CryptoJS from "crypto-js";
const secretKey = "kimi";

//加密規則
export const encodeAES = value => {
    return CryptoJS.AES.encrypt(value, secretKey).toString();
};

//解密規則
export const decodeAES = value => {
    if (value) {
        var bytes = CryptoJS.AES.decrypt(value, secretKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } else {
        return ""
    }
};