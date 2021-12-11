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
