type ModifierKey = 'alt' | 'cmd';

/**
 * 工具类初始化搜索项，最终转化成ScriptFilterItem进行打印
 */
export interface WorkflowItem {
  item: ScriptFilterItem;
  /**
   * 分值越高，排名越靠前
   */
  score?: number;
}

/**
 * @see https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
 */
export interface ScriptFilterItem {
  /**
   * 每个 item 的唯一标识，后续 Alfred 能依托这个 uid，根据用户操作进行排序。如果想保持自己脚本返回的顺序，不用 Alfred 的排序，可以不设置这个字段。
   */
  uid?: string;
  type?: 'default' | 'file' | 'file:skipcheck';
  title: string;
  subtitle: string;
  arg?: string;
  /**
   * 按tab键，自动补全的值
   */
  autocomplete?: string;
  icon?: {
    type?: 'fileicon';
    /**
     * 相对路径，绝对路径均可
     */
    path: string;
  },
  /**
   * url,filepath,相对路径，绝对路径均可
   */
  quicklookurl?: string;
  /**
   * 针对script filter,打开Alfred Filters Results选项，则可以利用Alfred直接按照关键词与match值进行匹配筛选，避免多次脚本执行
   * 匹配大小写敏感
   */
  match?: string;
  text?: {
    copy?: string;
    largetype?: string;
  },
  mods?: {
    [index in ModifierKey]: {
      valid: boolean;
      arg: string;
      subtitle: string;
      icon: string;
      variables: ScriptFilter['variables']
    }
  },
  action?: string | string[] | {
    text?: string[],
    url?: string,
    /**
     * 文件绝对路径
     */
    file?: string,
    /**
     * 以上三种类型均可
     */
    auto?: string | string[];
  }
}

export interface ScriptFilter {
  items: ScriptFilterItem[];
  variables?: {
    [index: string]: string;
  },
  /**
   * 0.1-5.0秒之后重新run，不要随意的打印多次，如果有缓存数据，只需要更新到缓存数据内容即可
   * @since 3.2
   */
  rerun?: number;
}
