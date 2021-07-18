import axios from "axios";

export default {createHttpClient};

/**
 * 提供HTTP请求相关能力
 */
function createHttpClient(baseURL: string) {
    return axios.create({
        baseURL,
        headers: {},
    });
}
