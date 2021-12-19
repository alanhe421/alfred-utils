import { ScriptFilter, ScriptFilterItem, WorkflowItem } from './interface';

const SPLIT_TOKEN = '✩';


const utils = {
  /**
   * 根据score进行再排序,大的向前排
   * 转换为ScriptFilterItem
   * @param sf
   */
  convertWorkflowItems(items: WorkflowItem[]) {
    return items.sort((a, b) => {
      return (b.score ?? 0) - (a.score ?? 0);
    }).map(item => item.item);
  },

  /**
   * 构建搜索项
   * @param item
   */
  buildWorkflowItem: (item: WorkflowItem) => item,

  /**
   * 根据params列出的属性进行过滤，不区分大小写
   * 如果查询关键词为空，返回原数组
   * @param items
   * @param query
   * @param params
   * @return {ScriptFilterItem[]}
   */
  filterItemsBy: (items: ScriptFilterItem[], query = '',
    ...params: (keyof Pick<ScriptFilterItem, 'title' | 'subtitle' | 'uid' | 'arg'>)[]) => {
    query = query.trim();
    if (query) {
      return items.filter((item) =>
        // 对于没有该参数属性的，返回true，通过
        params.some((p) => item[p]?.match(new RegExp(query, 'i'))),
      );
    } else {
      return items;
    }
  },

  /**
   * 构建单个项
   * @param item
   */
  buildItem: (item: ScriptFilterItem) => item,

  quickLookUrl4File: (filename: string) => `file://${filename.replace(/\s/g, '%20')}`,

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
  },
};

export default utils;
