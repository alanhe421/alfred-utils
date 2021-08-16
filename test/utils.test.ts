import { utils } from '../lib';

test('filterItemsBy is ok', () => {
  // title命中
  expect(utils.filterItemsBy([{
    title: 'hello',
    subtitle: ''
  }], 'hel', 'title')).toStrictEqual([
    {
      title: 'hello',
      subtitle: ''
    }
  ]);
  // subtitle命中
  expect(utils.filterItemsBy([{
    title: 'zxxx',
    subtitle: 'hello'
  }], 'hel', 'title', 'subtitle')).toStrictEqual([
    {
      title: 'zxxx',
      subtitle: 'hello'
    }
  ]);

  // 关键词为空
  expect(utils.filterItemsBy([{
    title: 'zxxx',
    subtitle: 'hello'
  }], '', 'title', 'subtitle')).toStrictEqual([
    {
      title: 'zxxx',
      subtitle: 'hello'
    }
  ]);

  // 关键词首尾空格
  expect(utils.filterItemsBy([{
    title: 'hello',
    subtitle: ''
  }], ' hel ', 'title')).toStrictEqual([
    {
      title: 'hello',
      subtitle: ''
    }
  ]);

  // 参数合并
  expect(utils.joinMultiArg(1, true, 'hello')).toStrictEqual('1✩true✩hello');
});

test('filterItemsBy query is undefined', () => {
  expect(utils.filterItemsBy([{
    title: 'hello',
    subtitle: ''
  }], undefined, 'title')).toStrictEqual([
    {
      title: 'hello',
      subtitle: ''
    }
  ]);
});

