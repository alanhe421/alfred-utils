const moment = require('moment');

const utils = {

  /**
   *
   * @param timestamp 单位：毫秒/时间字符串
   * @returns {string}
   */
  formatToCalendar: (timestamp: number | string) => moment(timestamp).calendar(),
};

export default utils;
