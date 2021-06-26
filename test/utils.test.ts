import {utils} from "../lib";

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
});
