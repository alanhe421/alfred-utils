import { ScriptFilter, ScriptFilterItem, WorkflowItem } from './interface';
import utils from "./utils";

export class Workflow {
  private items: WorkflowItem[];
  private sortedItems: ScriptFilterItem[];

  constructor(items: WorkflowItem[] = [], cacheable = false) {
    this.items = items;
    this.sortedItems = [];

    if (cacheable) {
      utils.useCache();
    }
  }

  /**
   * 缓存数据显示
   */
  runWithCacheData(config: Omit<ScriptFilter, 'items'>) {
    return utils.readCacheData<WorkflowItem[]>('script_filter').then(data => {
      if (data) {
        this.items = data;
        this.run(config);
        this.items = [];
      }
    });
  }

  /**
   *
   * @param maxAge
   */
  writeCacheData(maxAge: number) {
    utils.writeCacheData('script_filter', maxAge, this.items);
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
