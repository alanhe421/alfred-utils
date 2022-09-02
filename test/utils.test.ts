import { utils } from '../lib';
import { Workflow } from '../lib/workflow';

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
  const res = utils.escapeFilePath(`~/Library/Caches/com.runningwithcrayons.Alfred/Workflow Data`);
  expect(res).toEqual('/Users/alanhe/Library/Caches/com.runningwithcrayons.Alfred/Workflow\\ Data');
});

test('write pic file test', () => {
  utils.writeToPicFileFromClipboard(`~/Desktop/aaa.png`);
});

test('cache script filter', async () => {
  process.env.alfred_workflow_cache = `${__dirname}/.cache`;
  const wf = new Workflow([], true);
  await wf.runWithCacheData({}, 'script_filter');
  wf.addWorkflowItem({
    item: {
      title: '88888',
      subtitle: 'hello123',
    },
  });
  wf.writeCacheData(100, 'script_filter');
});
