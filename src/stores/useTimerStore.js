import { acceptHMRUpdate, defineStore } from 'pinia';
import ToNumber from 'lodash-es/toNumber';
import { 正方标识符 } from '@/stores/Keys';

export const useTimerStore = defineStore('useTimerStore', () => {
  const 元数据 = reactive({
    topicsAndTeams: {
      topicA: '',
      topicB: '',
      teamA: '',
      teamB: '',
    },
    tournamentTitle: '',
  });

  const resetMeta = () => {
    元数据.topicsAndTeams = {
      topicA: '',
      topicB: '',
      teamA: '',
      teamB: '',
    };
    元数据.tournamentTitle = '';
  };

  const 源环节 = reactive({
    原始环节数据: [{
      cardType: 1,
      cardData: {
        typeValue: '2.1',
        title: '开场',
        formatTitle: '开场',
        durationA: '',
        durationB: '',
        spokesmanA: {
          display: '',
          data: [],
        },
        spokesmanB: {
          display: '',
          data: [],
        },
      },
      cardConfig: {
        type: {
          id: 1,
          label: '无计时器',
          value: '2.1',
        },
        formatString: '{t}',
        timerCount: 0,
        spokesmanCount: 0,
        examples: '例如：开场、致词、评委点评、结果揭晓、颁奖…',
        uiComponent: {
          useLongTime: false,
          useDuelTime: false,
          useSpokeTime: false,
          useDuelSpoke: false,
        },
      },
      id: 'ETm06_5iWvMmHLZB9mLP5',
    }],
    解析后环节数据: [],
    存储的计时情况: [],
    奇袭环节数据: [],
  });

  const 当前环节下标 = ref(0);

  const 解析数据 = () => {
    const normalTmp = [];
    const quickTmp = [{}];

    源环节.原始环节数据.forEach((环节) => {
      const data = {
        环节信息: {
          计时器数量: 环节.cardConfig.timerCount,
          环节名称: 环节.cardData.formatTitle,
          计时器A初始时间: ToNumber(环节.cardData.durationA),
          计时器B初始时间: ToNumber(环节.cardData.durationB),
          先发言者信息: 环节.cardData.spokesmanA,
        },
      };

      if (环节.cardData?.isQuick) {
        data.环节信息.环节名称 = `[${data.环节信息.环节名称}]`;
        quickTmp.push(data);

        return;
      }
      normalTmp.push(data);
    });
    源环节.解析后环节数据 = normalTmp;
    源环节.奇袭环节数据 = quickTmp;
    源环节.存储的计时情况 = 源环节.原始环节数据.map((环节) => ({
      正在发言的标识符: 正方标识符,
      正在发言的描述: 正方标识符.description,
      计时器A剩余时间: ToNumber(环节.cardData.durationA),
      计时器B剩余时间: ToNumber(环节.cardData.durationB),
    }));
  };

  解析数据();

  const 设置当前环节 = (新环节下标) => {
    当前环节下标.value = 新环节下标;
  };

  const 设置源环节 = (新源环节) => {
    设置当前环节(0);
    源环节.原始环节数据 = [...新源环节];
    解析数据();
  };

  const 用偏移设置环节 = (偏移值) => {
    if (当前环节下标.value + 偏移值 < 0) {
      return;
    }
    if (当前环节下标.value + 偏移值 > 源环节.原始环节数据.length) {
      return;
    }
    当前环节下标.value += 偏移值;
  };

  const 当前环节运行中信息 = computed(() => {
    if (当前环节下标.value < 0) return 源环节.奇袭环节数据[-当前环节下标.value];

    return 源环节.解析后环节数据[当前环节下标.value];
  });

  const 当前环节计时信息 = computed(() => {
    if (当前环节下标.value < 0) {
      const 环节 = 源环节.奇袭环节数据[-当前环节下标.value];

      console.log(环节);

      return {
        正在发言的标识符: 正方标识符,
        正在发言的描述: 正方标识符.description,
        计时器A剩余时间: ToNumber(环节.环节信息.计时器A初始时间),
        计时器B剩余时间: ToNumber(环节.环节信息.计时器B初始时间),
      };
    }

    return 源环节.存储的计时情况[当前环节下标.value];
  });

  const 当前环节计时器数量 = computed(() => 当前环节运行中信息.value.环节信息.计时器数量);

  const 当前环节 = {
    解析后环节数据: 当前环节运行中信息,
    存储的计时信息: 当前环节计时信息,
    计时器数量: 当前环节计时器数量,
  };

  /**
   * 更新环节计时信息
   * @param {Symbol} 标识符
   * @param 计时器A剩余时间
   * @param 计时器B剩余时间
   */
  const 存入环节计时信息 = (标识符, 计时器A剩余时间, 计时器B剩余时间) => {
    源环节.存储的计时情况[当前环节下标.value] = {
      正在发言的标识符: 标识符,
      正在发言的描述: 标识符.description,
      计时器A剩余时间,
      计时器B剩余时间,
    };
  };

  return {
    元数据,
    resetMeta,
    源环节,
    设置源环节,

    设置当前环节,
    用偏移设置环节,

    当前环节下标,
    当前环节,
    当前环节运行中信息,
    当前环节计时器数量,
    当前环节计时信息,

    存入环节计时信息,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot));
}
