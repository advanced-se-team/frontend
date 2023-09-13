<template>
  <TTag
    :theme="isActive?'success':'warning'"
    shape="round"
    size="small"
    variant="outline"
  >
    Pro{{ disableSubDisplay?'':isActive?' √':'|您的订阅已过期' }}
  </TTag>
</template>

<script setup>
import { isSubActive } from '@/pages/composable/useSubscription';

defineProps({
  disableSubDisplay: {
    type: Boolean,
    default: false,
  },
});

const isActive = isSubActive();
</script>
