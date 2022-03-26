import { execSync } from 'child_process';

const SPLIT_TOKEN = '✩';
const utils = {


  quickLookUrl4File: (filename: string) => `file://${filename.replace(/\s/g, '%20')}`,

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
};

export default utils;
