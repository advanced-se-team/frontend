import { defineStore, acceptHMRUpdate } from 'pinia';
import {
  findIndex, cloneDeep, includes, replace,
} from 'lodash-es';

export const useRoundCardConst = defineStore('constStore', () => {
  const 环节卡片预置常量 = reactive({
    发言人选项: [
      {
        label: '正方',
        value: '1',
        children: [
          { label: '一辩', value: '1.1' },
          { label: '二辩', value: '1.2' },
          { label: '三辩', value: '1.3' },
          { label: '四辩', value: '1.4' },
          { label: '任意一人', value: '1.5' },
          { label: '全体', value: '1.6' },
        ],
      },
      {
        label: '反方',
        value: '2',
        children: [
          { label: '一辩', value: '2.1' },
          { label: '二辩', value: '2.2' },
          { label: '三辩', value: '2.3' },
          { label: '四辩', value: '2.4' },
          { label: '任意一人', value: '2.5' },
          { label: '全体', value: '2.6' },
        ],
      },
    ],
    环节类型选项: [
      {
        label: '常规',
        value: '1',
        children: [
          { label: '单方发言', value: '1.1' },
          { label: '单方发问', value: '1.2' },
          { label: '双边对辩', value: '1.3' },
          { label: '自由辩论', value: '1.4' },
        ],
      },
      {
        label: '基类',
        value: '2',
        children: [
          { label: '无计时器', value: '2.1' },
          { label: '单计时器', value: '2.2' },
          { label: '双计时器', value: '2.3' },
        ],
      },
    ],
  });

  const 从发言人值转为文字描述 = (value) => {
    const db2 = cloneDeep(环节卡片预置常量.发言人选项).map((o) => o.children.map((t) => ({ label: o.label + t.label, value: t.value }))).flat();
    let res = db2[findIndex(db2, (o) => o.value === value)]?.label;
    if (includes(res, '任意一人')) res = replace(res, '任意一人', '');
    if (includes(res, '全体')) res = replace(res, '全体', '');

    return res;
  };

  const 从环节值转为文字描述 = (value) => {
    const db2 = cloneDeep(环节卡片预置常量.环节类型选项).map((o) => o.children).flat();

    return db2[findIndex(db2, (o) => o.value === value)]?.label;
  };

  return {
    环节卡片预置常量,
    从发言人值转为文字描述,
    从环节值转为文字描述,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoundCardConst, import.meta.hot));
}
