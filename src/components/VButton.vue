<template>
  <button
    type="button"
    class="relative inline-flex select-none items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
  >
    <span v-show="icon"
          class="h-5 w-5"
          :class="text ? '-ml-0.5 ' : ''"
    >
      <slot name="icon"
            aria-hidden="true"
            class="h-5 w-5"
      />
    </span>
    <slot />
  </button>
</template>

<script setup>
import {} from 'vue';

defineProps({
  icon: {
    type: Boolean,
    default() {
      return false;
    },
  },
  text: {
    type: Boolean,
    default() {
      return true;
    },
  },
});
</script>
