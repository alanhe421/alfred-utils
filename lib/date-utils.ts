const moment = require('moment');

const utils = {

  /**
   *
   * @param timestamp 单位：毫秒
   * @returns {string}
   */
  formatToCalendar: (timestamp: number) => moment(timestamp).calendar(),
};

export default utils;
