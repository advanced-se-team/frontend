import { acceptHMRUpdate, defineStore } from 'pinia';
import { 默认界面参数 } from '@/stores/Keys';

export const useSkinStore = defineStore('useSkinStore', () => {
  const 背景图片 = reactive({
    useImg: false,
    imgUrl: 'https://cdn.puluter.cn/f/0821-WindowManager-1254-H1soLaJg@2x.png',
  });

  const 位置参数库 = reactive({
    值: {
      ...默认界面参数().值,
    },
  });

  const 提示音 = reactive({
    发声时间: {
      首次: 30,
      二次: 5,
      三次: 0,
    },
  });

  const reset = () => {
    背景图片.useImg = false;
    背景图片.imgUrl = 'https://cdn.puluter.cn/f/0821-WindowManager-1254-H1soLaJg@2x.png';
    位置参数库.值 = {
      ...默认界面参数().值,
    };
    提示音.发声时间 = {
      首次: 30,
      二次: 5,
      三次: 0,
    };
  };

  return {
    reset,
    背景图片,
    位置参数库,
    提示音,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSkinStore, import.meta.hot));
}
