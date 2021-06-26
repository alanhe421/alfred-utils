import axios from "axios";

/**
 * 提供HTTP请求相关能力
 */
const createHttpClient = (baseURL: string) => {
    return axios.create({
        baseURL,
        headers: {},
    });
}

export default {createHttpClient};
