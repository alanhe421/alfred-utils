import { ScriptFilterItem, WorkflowItem } from './interface';

export class Workflow {
  private items: WorkflowItem[];

  constructor(items: WorkflowItem[] = []) {
    this.items = items;
  }

  /**
   * 根据score进行再排序,大的向前排
   * 转换为ScriptFilterItem
   * @param sf
   */
  convertWorkflowItems(): ScriptFilterItem[] {
    return this.items.sort((a, b) => {
      return (b.score ?? 0) - (a.score ?? 0);
    }).map(item => item.item);
  }


  /**
   * 构建搜索项
   * @param item
   */
  addWorkflowItem(item: WorkflowItem) {
    this.items.push(item);
    return this;
  }
}
