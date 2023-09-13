import { acceptHMRUpdate, defineStore } from 'pinia';

export const useCreateNavbarStore = defineStore(
  'useCreateNavbarStore',
  () => {
    const 组件间传输数据 = reactive({
      打开了使用模板modal: false,
      title: '',
      当前创建环节下标: 0,
    });

    const 当前创建环节下标 = ref(0);

    const 当前编辑id = reactive({
      id: '',
      finishLoading: false,
    });

    const 锚点配置库 = ref([
      {
        container: '#anchor-container',
        list: [
          {
            href: '#锚点一',
            title: '背景修改',
          },
          {
            href: '#锚点二',
            title: '元素调整',
          },
          {
            href: '#锚点三',
            title: '音频修改',
          },
        ],
      }, {
        container: '#anchor-container2',
        list: [
          {
            href: '#计时1',
            title: '计时数量',
          },
          {
            href: '#计时2',
            title: '单方发言',
          },
          {
            href: '#计时3',
            title: '单方发问',
          },
          {
            href: '#计时4',
            title: '双边对辩',
          },
        ],
      }, {
        container: '#anchor-container',
        list: [
          {
            href: '#锚点一',
            title: '背景修改',
          },
          {
            href: '#锚点二',
            title: '元素调整',
          },
          {
            href: '#锚点三',
            title: '音频修改',
          },
        ],
      }, {
        container: '#anchor-container',
        list: [
          {
            href: '#锚点一',
            title: '背景修改',
          },
          {
            href: '#锚点二',
            title: '元素调整',
          },
          {
            href: '#锚点三',
            title: '音频修改',
          },
        ],
      },
    ]);

    const 当前锚点配置 = computed(() => 锚点配置库.value[当前创建环节下标.value]);

    return {
      当前锚点配置,
      锚点配置库,
      当前创建环节下标,
      当前编辑id,
      组件间传输数据,
    };
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCreateNavbarStore, import.meta.hot));
}
