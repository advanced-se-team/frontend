import { defineStore, acceptHMRUpdate } from 'pinia';
import { nanoid } from 'nanoid';
import { 从值获取计时器环节模板 } from '@/stores/const/RoundCardTemplate';
import { cloneDeep } from 'lodash-es';

export const generateRoundCard = (
  cardType,
  typeValue,
  title,
  formatTitle,
  durationA,
  durationB,
  spokesmanA,
  spokesmanB,
  isQuick,
) => {
  const cardConfig = 从值获取计时器环节模板(typeValue);
  let q = isQuick?isQuick:false;
  return {
    cardType,
    cardData: {
      typeValue,
      title,
      formatTitle,
      durationA,
      durationB,
      spokesmanA,
      spokesmanB,
      isQuick: q,
    },
    cardConfig,
    id: nanoid(),
  };
};

export const predefinedTemplate = {
  roundCards: [
    generateRoundCard(
      1,
      '2.1',
      '开场',
      '开场',
      '',
      '',
      { display: '', data: [] },
      { display: '', data: [] },
    ),
    generateRoundCard(
      1,
      '2.1',
      '双方介绍',
      '双方介绍',
      '',
      '',
      { display: '', data: [] },
      { display: '', data: [] },
    ),
    generateRoundCard(
      1,
      '2.1',
      '提示音介绍',
      '提示音介绍',
      '',
      '',
      { display: '', data: [] },
      { display: '', data: [] },
    ),
    generateRoundCard(
      4,
      '1.1',
      '开篇陈词',
      '正方一辩 · 开篇陈词',
      '180',
      '',
      { display: '正方一辩', data: ['1.1'] },
      { display: '', data: [] },
    ),
    generateRoundCard(
      5,
      '1.2',
      '质询',
      '反方四辩 · 质询 · 正方一辩',
      '120',
      '',
      { display: '反方四辩', data: ['2.4'] },
      { display: '正方一辩', data: ['1.1'] },
    ),
    generateRoundCard(
      7,
      '1.4',
      '自由辩论',
      '自由辩论',
      '240',
      '240',
      { display: '', data: ['1.1'] },
      { display: '', data: [] },
    ),
    generateRoundCard(
      4,
      '1.1',
      '总结陈词',
      '反方四辩 · 总结陈词',
      '240',
      '',
      { display: '反方四辩', data: ['2.4'] },
      { display: '', data: [] },
    ),
    generateRoundCard(
      1,
      '2.1',
      '评委点评',
      '评委点评',
      '',
      '',
      { display: '', data: [] },
      { display: '', data: [] },
    ),
    generateRoundCard(
      1,
      '2.1',
      '公布结果',
      '公布结果',
      '',
      '',
      { display: '', data: [] },
      { display: '', data: [] },
    ),
    generateRoundCard(
      1,
      '2.1',
      '颁奖',
      '颁奖',
      '',
      '',
      { display: '', data: [] },
      { display: '', data: [] },
    ),
  ],
};

export const useRoundCardsStore = defineStore('roundCardStore', () => {
  const 环节卡片 = reactive({
    库: [...predefinedTemplate.roundCards],
  });

  // Following codes are tranlasted from useRoundCardsStore
  const lastDeletedRoundCard = ref(null);
  const lastDeletedIdx = ref(-1);

  const reset = () => {
    环节卡片.库 = [...predefinedTemplate.roundCards];
    console.log('🌛 这里reset了');
  };

  const duplicateRoundCard = (idx) => {
    const card = cloneDeep(环节卡片.库[idx]);

    card.id = nanoid();

    card.cardData.title = `[复制]${card.cardData.title}`;

    环节卡片.库.splice(idx + 1, 0, { ...card });
  };

  const updateRoundCard = (idx, data) => {
    环节卡片.库[idx].cardType = data.cardType;
    环节卡片.库[idx].cardData = data.cardData;
    环节卡片.库[idx].cardConfig = data.cardConfig;
  };

  const appendRoundCard = (card) => {
    环节卡片.库.push(card);
  };

  const appendInitialRoundCard = () => {
    appendRoundCard(
      generateRoundCard(
        4,
        '1.1',
        '',
        '',
        '',
        '',
        { display: '', data: [] },
        { display: '', data: [] },
      ),
    );
  };

  const deleteRoundCard = (idx) => {
    // eslint-disable-next-line prefer-destructuring
    lastDeletedRoundCard.value = 环节卡片.库.splice(idx, 1)[0];
    lastDeletedIdx.value = idx;
  };

  const undoDeleteRoundCard = () => {
    if (lastDeletedRoundCard.value) {
      环节卡片.库.splice(
        lastDeletedIdx.value,
        0,
        lastDeletedRoundCard.value,
      );
      lastDeletedRoundCard.value = null;
      lastDeletedIdx.value = -1;
    }
  };

  return {
    环节卡片, lastDeletedRoundCard, lastDeletedIdx, duplicateRoundCard, updateRoundCard, appendRoundCard, appendInitialRoundCard, deleteRoundCard, undoDeleteRoundCard, reset,
  };
}, { persist: true });

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoundCardsStore, import.meta.hot));
}
