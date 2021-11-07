import { dateUtils } from '../lib';

test('formatToCalendar is ok', () => {
  expect(dateUtils.formatToCalendar(1636205893658)).toStrictEqual('Yesterday at 9:38 PM');
});

