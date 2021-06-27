"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
/**
 * 提供HTTP请求相关能力
 */
const createHttpClient = (baseURL) => {
    return axios_1.default.create({
        baseURL,
        headers: {},
    });
};
exports.default = { createHttpClient };
