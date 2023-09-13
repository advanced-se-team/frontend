import { defineStore, acceptHMRUpdate } from 'pinia';
import { useRoundCardConst } from './const/useRoundCardConst';
import 计时器环节模板, { 从下标获取计时器环节模板, 从值获取计时器环节模板 } from './const/RoundCardTemplate';

export const useConst = defineStore('Const', () => {
  const 环节卡片 = useRoundCardConst();

  return {
    环节卡片,
    环节模板: {
      计时器环节模板,
      从下标获取计时器环节模板,
      从值获取计时器环节模板,
    },
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConst, import.meta.hot));
}
