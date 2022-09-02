import { ScriptFilter, ScriptFilterItem, WorkflowItem } from './interface';
import utils, { CN_CHAR_REGEX } from './utils';
import { pinyin } from 'pinyin-pro';

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
  runWithCacheData(config: Omit<ScriptFilter, 'items'> = { rerun: 0.1 }, cacheKey: string) {
    return utils.readCacheData<WorkflowItem[]>(cacheKey).then(data => {
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
  writeCacheData(maxAge: number, cacheKey: string) {
    utils.writeCacheData(cacheKey, maxAge, this.items);
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
   * 过滤结果集
   */
  filterWorkflowItemsBy(query = '',
    params: (keyof Pick<ScriptFilterItem, 'title' | 'subtitle' | 'uid' | 'arg'>)[],
    noResultsItem?: WorkflowItem) {
    query = query.trim();
    if (query) {
      let filterItems = this.items.filter((item) => {
          // 对于没有该参数属性的，返回true，通过
          return params.some((p) => {
            const scriptFilterItem = item.item;
            if (scriptFilterItem[p] === undefined) {
              return;
            }
            if (scriptFilterItem[p]?.match(CN_CHAR_REGEX) && !query.match(CN_CHAR_REGEX)) {
              return pinyin(scriptFilterItem[p] as any, {
                toneType: 'none',
                nonZh: 'consecutive',
              }).replace(/\s/g, '')!.match(new RegExp(query, 'i'));
            }
            return scriptFilterItem[p]!.match(new RegExp(query, 'i'));
          });
        },
      );
      if (filterItems.length === 0 && noResultsItem) {
        this.items = [noResultsItem];
      } else {
        this.items = filterItems;
      }
    }
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
