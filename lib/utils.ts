import { ScriptFilter, ScriptFilterItem } from './interface';
import { pinyin } from 'pinyin-pro';

import { execSync } from 'child_process';


const SPLIT_TOKEN = '✩';
const CN_CHAR_REGEX = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;

const pathUtils = {
  replaceSpace: (path: string) => path.replace(/\s/g, '%20'),
  replaceRelativeHomePath: (path: string) => path.replace('~', process.env.HOME),
  process: (path: string) => pathUtils.replaceRelativeHomePath(pathUtils.replaceSpace(path)),
};

const utils = {


  /**
   * 根据params列出的属性进行过滤，不区分大小写
   * 如果查询关键词为空，返回原数组
   * @param items
   * @param query
   * @param params
   * @param noResultsItem 如果过滤完没有结果则显示该条目
   * @return {ScriptFilterItem[]}
   */
  filterItemsBy: (items: ScriptFilterItem[],
    query = '',
    params: (keyof Pick<ScriptFilterItem, 'title' | 'subtitle' | 'uid' | 'arg'>)[],
    noResultsItem?: ScriptFilterItem) => {
    query = query.trim();
    if (query) {
      let filterItems = items.filter((item) => {
          // 对于没有该参数属性的，返回true，通过
          return params.some((p) => {
            if (item[p] === undefined) {
              return;
            }
            if (item[p]?.match(CN_CHAR_REGEX) && !query.match(CN_CHAR_REGEX)) {
              return pinyin(item[p] as any, {
                toneType: 'none',
                nonZh: 'consecutive',
              }).replace(/\s/g, '')!.match(new RegExp(query, 'i'));
            }
            return item[p]!.match(new RegExp(query, 'i'));
          });
        },
      );
      if (filterItems.length === 0 && noResultsItem) {
        return [noResultsItem];
      }
      return filterItems;
    } else {
      return items;
    }
  },

  /**
   * 构建单个项
   * @param item
   */
  buildItem: (item: ScriptFilterItem) => item,

  /**
   * 路径中空格加转义字符
   * @param filepath
   */
  escapeFilePath: (filepath: string) => pathUtils.replaceRelativeHomePath(filepath).replace(/(\s)/, '\\$1'),

  quickLookUrl4File: (filename: string) => `file://${pathUtils.replaceSpace(filename)}`,

  /**
   * 输出列表
   * @param sf
   */
  printScriptFilter: (sf: ScriptFilter) => {
    console.log(JSON.stringify(sf));
  },

  /**
   * Script item arg为字符串，有时需要多个参数传递，可以使用字符串拼接
   * @param args
   * @return {string}
   */
  joinMultiArg: (...args: (number | string | boolean) []) => args.join(SPLIT_TOKEN),

  /**
   *
   * @param argStr
   * @return {string[]}
   */
  splitMultiArgStr: (argStr: string): string[] => argStr.split(SPLIT_TOKEN),

  /**
   * Mac自带emoji表情支持
   * @see https://support.apple.com/zh-cn/guide/mac-help/mchlp1560/mac
   */
  emoji: {
    checked: '☑️',
    unchecked: '✖️',
    locked: '🔒',
  },

  /**
   * 设置当前workflow环境变量
   * @param key
   * @param value
   */
  setVariable: (key: string, value: any) => {
    execSync(`osascript -e 'tell application id "com.runningwithcrayons.Alfred" to set configuration "${key}" to value "${String(value)}" in workflow "${process.env.alfred_workflow_bundleid}"'`);
  },

  /**
   * 删除当前workflow环境变量
   * @param key
   */
  removeVariable: (key: string) => {
    execSync(`osascript -e 'tell application id "com.runningwithcrayons.Alfred" to remove configuration "${key}" in workflow "${process.env.alfred_workflow_bundleid}"'`);
  },

  /**
   * 拷贝到系统剪贴板
   */
  copyToClipboard(thePath: string) {
    thePath = pathUtils.replaceSpace(thePath);
    execSync(`osascript -e 'set the clipboard to POSIX file "${thePath}"\n delay 1'`);
  },

  /**
   * 剪贴板图片另存到某位置
   * @param filePath
   */
  writeToPicFileFromClipboard(filePath: string) {
    filePath = pathUtils.process(filePath);
    execSync(`osascript -e 'try
  set imageData to the clipboard as {«class PNGf»}
on error
  tell me to error "Clipboard data does not seem to be an image"
end try

set filePath to "${filePath}"
try
set imageFile to open for access filePath with write permission
write imageData to imageFile
close access imageFile
on error
try
        close access myFile
    end try
end try
'`);
  },

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  /**
   * 创建缓存文件夹
   */
  useCache() {
    execSync(`[[ -d "${process.env.alfred_workflow_cache}" ]] || mkdir "${process.env.alfred_workflow_cache}"`);
  },

  /**
   * 不添加新行打印
   * @param options
   */
  log(...options: Parameters<typeof process.stdout.write>) {
    process.stdout.write(...options);
  },
};

export default utils;
