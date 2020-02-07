import {
    decodeAES
} from "@/utils/other/index"

export let getStorage = key => {
    let val = localStorage.getItem(key);
    return val ? decodeAES(val) : "";
}