type ModifierKey = 'alt' | 'cmd';

/**
 * @see https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
 */
export interface ScriptFilterItem {
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
  }
}


export interface ScriptFilter {
  items: ScriptFilterItem[];
  variables?: {
    [index: string]: string;
  },
  rerun?: number;
}
