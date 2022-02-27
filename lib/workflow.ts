import { ScriptFilter, ScriptFilterItem, WorkflowItem } from './interface';


export class Workflow {
  private readonly items: WorkflowItem[];
  private filteredItems: WorkflowItem[];

  private conf: {
    query: string;
    params: (keyof Pick<ScriptFilterItem, 'title' | 'subtitle' | 'uid' | 'arg'>)[];
    noResultsItem?: WorkflowItem | null;
  };

  constructor(items: WorkflowItem[] = [], {
    query = '',
    params = ['title'],
  }: {
    query?: string;
    params?: (keyof Pick<ScriptFilterItem, 'title' | 'subtitle' | 'uid' | 'arg'>)[];
    noResultsItem?: WorkflowItem | null;
  }) {
    this.items = items;
    this.filteredItems = [];
    this.conf = {
      query: query.trim(),
      params,
      noResultsItem: null,
    };
  }

  /**
   * 根据score进行再排序,大的向前排
   * 转换为ScriptFilterItem
   * @param sf
   */
  private sort() {
    this.filteredItems.sort((a, b) => {
      return (b.score ?? 0) - (a.score ?? 0);
    });
  }


  private filter() {
    if (this.conf.query) {
      let filterItems = this.items.filter((item) =>
        // 对于没有该参数属性的，返回true，通过
        this.conf.params.some((p) => item.item[p]?.match(new RegExp(this.conf.query, 'i'))),
      );
      if (filterItems.length === 0 && this.conf.noResultsItem) {
        this.filteredItems = [this.conf.noResultsItem];
      } else {
        this.filteredItems = filterItems;
      }
    } else {
      this.filteredItems = this.items;
    }
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
   * 打印
   */
  print(conf: Omit<ScriptFilter, 'items'> = {}) {
    this.filter().sort();
    console.log(JSON.stringify({
      items: this.filteredItems.map(item => item.item),
      ...conf,
    }));
  }
}
