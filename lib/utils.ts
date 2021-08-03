import {ScriptFilter, ScriptFilterItem} from "./interface";

const SPLIT_TOKEN = '✩';
const utils = {
    /**
     * 根据params列出的属性进行过滤，不区分大小写
     * 如果查询关键词为空，返回原数组
     */
    filterItemsBy: (items: ScriptFilterItem[], query: string, ...params: ('title' | 'subtitle')[]) => {
        query = query.trim();
        if (query) {
            return items.filter((item) =>
                params.some((p) => item[p] && item[p].match(new RegExp(query, 'i')))
            );
        } else {
            return items;
        }
    },

    quickLookUrl4File: (filename: string) => `file://${filename.replace(/\s/g, '%20')}`,

    /**
     * 过滤列表
     * @param sf
     */
    outputScriptFilter: (sf: ScriptFilter) => {
        console.log(JSON.stringify(sf));
    },

    /**
     * Script item arg为字符串，有时需要多个参数传递，可以使用字符串拼接
     */
    joinMultiArg: (...args: (number | string | boolean) []) => args.join(SPLIT_TOKEN),

    splitMultiArgStr: (argStr: string): string[] => argStr.split(SPLIT_TOKEN),

    /**
     * Mac自带emoji表情支持
     * @see https://support.apple.com/zh-cn/guide/mac-help/mchlp1560/mac
     */
    emoji: {
        checked: '☑️',
        unchecked: '✖️'
    }
};

export default utils;
