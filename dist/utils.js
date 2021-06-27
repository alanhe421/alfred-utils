"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SPLIT_TOKEN = '✩';
const utils = {
    /**
     * 根据params列出的属性进行过滤，不区分大小写
     * 如果查询关键词为空，返回原数组
     */
    filterItemsBy: (items, query, ...params) => {
        if (query) {
            return items.filter((item) => params.some((p) => item[p] && item[p].match(new RegExp(query, 'i'))));
        }
        else {
            return items;
        }
    },
    quickLookUrl4File: (filename) => `file://${filename.replace(/\s/g, '%20')}`,
    outputScriptFilter: (sf) => {
        console.log(JSON.stringify(sf));
    },
    /**
     * Script item arg为字符串，有时需要多个参数传递，可以使用字符串拼接
     */
    joinMultiArg: (...args) => args.join(SPLIT_TOKEN),
    splitMultiArgStr: (argStr) => argStr.split(SPLIT_TOKEN),
    /**
     * Mac自带emoji表情支持
     * @see https://support.apple.com/zh-cn/guide/mac-help/mchlp1560/mac
     */
    emoji: {
        checked: '☑️',
        unchecked: '✖️'
    }
};
exports.default = utils;
