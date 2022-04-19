import { utils } from '../lib';
import { Workflow } from '../lib/workflow';

test('filterItemsBy is ok', () => {
  // title命中
  expect(utils.filterItemsBy([{
    title: 'hello',
    subtitle: '',
  }], 'hel', ['title'])).toStrictEqual([
    {
      title: 'hello',
      subtitle: '',
    },
  ]);
  // subtitle命中
  expect(utils.filterItemsBy([{
    title: 'zxxx',
    subtitle: 'hello',
  }], 'hel', ['title', 'subtitle'])).toStrictEqual([
    {
      title: 'zxxx',
      subtitle: 'hello',
    },
  ]);

  // 无命中项
  expect(utils.filterItemsBy([{
    title: 'zxxx',
    subtitle: 'hello',
  }], '123', ['title', 'subtitle'])).toStrictEqual([]);


  expect(utils.filterItemsBy([{
    title: 'zxxx',
    subtitle: 'hello',
  }], '123', ['title', 'subtitle'], utils.buildItem({
    title: 'no match item',
    subtitle: 'enter to view web',

  }))).toStrictEqual([
    {
      title: 'no match item',
      subtitle: 'enter to view web',
    },
  ]);


  // 关键词为空
  expect(utils.filterItemsBy([{
    title: 'zxxx',
    subtitle: 'hello',
  }], '', ['title', 'subtitle'])).toStrictEqual([
    {
      title: 'zxxx',
      subtitle: 'hello',
    },
  ]);

  // 关键词首尾空格
  expect(utils.filterItemsBy([{
    title: 'hello',
    subtitle: '',
  }], ' hel ', ['title'])).toStrictEqual([
    {
      title: 'hello',
      subtitle: '',
    },
  ]);


  // 参数合并
  expect(utils.joinMultiArg(1, true, 'hello')).toStrictEqual('1✩true✩hello');
});

test('中文拼音处理', () => {
  expect(utils.filterItemsBy([{
    title: '[express demo 测试]本地环境配置',
    subtitle: 'hello',
  }], 'bendi', ['title', 'subtitle'])).toStrictEqual([
    {
      title: '[express demo 测试]本地环境配置',
      subtitle: 'hello',
    },
  ]);

});

test('filterItemsBy query is undefined', () => {
  expect(utils.filterItemsBy([{
    title: 'hello',
    subtitle: '',
  }], undefined, ['title'])).toStrictEqual([
    {
      title: 'hello',
      subtitle: '',
    },
  ]);
});

test('order by score', () => {
  const wf = new Workflow();
  wf.addWorkflowItem({
    item: {
      title: 'hello',
      subtitle: 'hello123',
    },
  });
  wf.addWorkflowItem({
    item: {
      title: 'beijing',
      subtitle: 'hello kitty',
    },
    score: 1,
  });
  wf.run();
  // expect(scriptFilterItems[0].title).toEqual('beijing');
});

test('bytes format', () => {
  expect(utils.formatBytes(3000, 2)).toEqual('2.93 KB');
});

test('mac feat test', () => {
  expect(utils.copyToClipboard(`/Library/Caches/com.runningwithcrayons.Alfred/Workflow Data/cn.alanhe.giphy/qLw4x1K59L0iI_preview.gif`)).toEqual(undefined);
});

test('escape path test', () => {
  const res = utils.escapeFilePath(`/Users/alanhe/Library/Caches/com.runningwithcrayons.Alfred/Workflow Data`);
  expect(res).toEqual('/Users/alanhe/Library/Caches/com.runningwithcrayons.Alfred/Workflow\\ Data');
});
