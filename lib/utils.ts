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
};

export default utils;
