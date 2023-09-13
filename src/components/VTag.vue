<script setup>
import { ref } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default() {
      return 'primary';
    },
  },
  icon: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const colorPatterns = {
  primary: {
    bg: 'text-green-700 bg-green-50 ring-green-600/20',
    icon: 'text-green-500',
  },
  gray: {
    bg: 'text-gray-700 bg-gray-50 ring-gray-600/20',
    icon: 'text-gray-500',
  },
};

const colors = ref(colorPatterns[props.color].bg);
const colorIcon = ref(colorPatterns[props.color].icon);
</script>

<template>
  <span
    class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
    :class="colors"
  >
    <span v-show="icon"
          class="mr-1 h-4 w-4"
          :class="colorIcon"
    >
      <slot name="icon" /></span>

    <slot />
  </span>
</template>
