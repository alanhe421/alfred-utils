import { Workflow } from '../lib/workflow';

test('order by score', () => {
  const wf = new Workflow([], {});
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
  });

  wf.print();

});
