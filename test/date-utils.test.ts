import { dateUtils } from '../lib';

test('formatToCalendar is ok', () => {
  expect(dateUtils.formatToCalendar(1636205893658)).not.toBeNull();
  expect(dateUtils.formatToCalendar('2022-04-03 16:02:16')).not.toBeNull();
});

