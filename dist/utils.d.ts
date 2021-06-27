import { ScriptFilter, ScriptFilterItem } from "./interface";
declare const utils: {
    /**
     * 根据params列出的属性进行过滤，不区分大小写
     * 如果查询关键词为空，返回原数组
     */
    filterItemsBy: (items: ScriptFilterItem[], query: string, ...params: ('title' | 'subtitle')[]) => ScriptFilterItem[];
    quickLookUrl4File: (filename: string) => string;
    outputScriptFilter: (sf: ScriptFilter) => void;
    /**
     * Script item arg为字符串，有时需要多个参数传递，可以使用字符串拼接
     */
    joinMultiArg: (...args: string[]) => string;
    splitMultiArgStr: (argStr: string) => string[];
    /**
     * Mac自带emoji表情支持
     * @see https://support.apple.com/zh-cn/guide/mac-help/mchlp1560/mac
     */
    emoji: {
        checked: string;
        unchecked: string;
    };
};
export default utils;
