import axios from "axios";

export default {createHttpClient};

/**
 * 提供HTTP请求相关能力
 * @param baseURL
 * @return {AxiosInstance}
 */
function createHttpClient(baseURL: string) {
    return axios.create({
        baseURL,
        headers: {},
    });
}
