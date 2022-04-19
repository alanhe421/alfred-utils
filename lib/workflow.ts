import { ScriptFilter, ScriptFilterItem, WorkflowItem } from './interface';

export class Workflow {
  private items: WorkflowItem[];
  private sortedItems: ScriptFilterItem[];

  constructor(items: WorkflowItem[] = []) {
    this.items = items;
    this.sortedItems = [];
  }

  /**
   * 根据score进行再排序,大的向前排
   * 转换为ScriptFilterItem
   * @param sf
   */
  private convertWorkflowItems(): this {
    this.sortedItems = this.items.sort((a, b) => {
      return (b.score ?? 0) - (a.score ?? 0);
    }).map(item => item.item);
    return this;
  }


  /**
   * 构建搜索项
   * @param item
   */
  addWorkflowItem(item: WorkflowItem) {
    this.items.push(item);
    return this;
  }

  /**
   * 输出
   */
  run(config: Omit<ScriptFilter, 'items'> = {}) {
    console.log(JSON.stringify({
      ...config,
      items: this.convertWorkflowItems().sortedItems,
    }));
  }
}
