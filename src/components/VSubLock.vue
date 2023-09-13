<script setup>
import { isSubActive } from '@/pages/composable/useSubscription';
import { useElementSize } from '@vueuse/core';
import AV from 'leancloud-storage/live-query';

const props = defineProps({
  category: {
    type: String,
    default: '教育版',
  },
  useCreatorLock: {
    type: Boolean,
    default: false,
  },
  creatorLock: {
    type: Boolean,
    default: false,
  },
});

const divRef = ref(null);
const { width } = useElementSize(divRef);
const isActive = isSubActive();
const isProAndUserNotPro = computed(() => props.category === '专业版' && AV.User.current().get('subscribeCategory') !== '专业版');

const shouldDisable = computed(() => {
  if (props.useCreatorLock) return props.creatorLock;

  return !isActive || isProAndUserNotPro.value;
});

const doNothing = (e) => {
  // eslint-disable-next-line no-use-before-define
  if (!isActive.value)e.stopPropagation();
};

const toolTipContent = computed(() => {
  if (props.creatorLock) {
    return '您的赛事主办方为体验版且体验已过期，该功能无法使用。';
  }
  if (isActive) {
    if (isProAndUserNotPro) return '该功能为专业版特供，您是教育版，无法使用。可以选择升级为专业版。';

    return '';
  }

  return '您的订阅已过期，该设置无法修改。已配置好的可继续使用。';
});

const contentTip = computed(() => {
  if (width.value > 200) {
    if (props.creatorLock) {
      return '您的赛事主办方为体验版且体验已过期，该功能无法使用。';
    }

    return `您的订阅已过期，需要${props.category === '专业版' ? '专业版' : '专业版或教育版'}以使用此功能`;
  }
  if (width.value > 30) {
    return (props.category === '专业版' ? 'Pro' : 'E/P');
  }

  return '';
});
</script>

<template>
  <div>
    <TTooltip :content="toolTipContent">
      <div ref="divRef"
           :class="shouldDisable?'cursor-not-allowed relative':''"
      >
        <div
          v-show="shouldDisable"
          class="absolute z-10 flex h-full w-full items-center justify-center rounded-md bg-gray-50 opacity-70 shadow-inner text-green-700 p-2 text-center"
        >
          {{ contentTip }}
        </div>
        <div :class="shouldDisable?'shadow-inner p-1 rounded-md pointer-events-none':''">
          <div :class="shouldDisable?'blur-sm':''"
               @click="doNothing"
          >
            <slot />
          </div>
        </div>
      </div>
    </TTooltip>
  </div>
</template>

<style lang="scss" scoped>

</style>
