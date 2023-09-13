<template>
  <!--
    Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
    your content from being obscured when the user scrolls to the bottom of the page.
  -->
  <div v-show="shouldShow"
       class="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8"
  >
    <div class="pointer-events-auto flex items-center justify-between gap-x-6 bg-green-500 px-6 py-2.5 sm:pr-3.5 sm:rounded-xl sm:py-3 sm:pl-4">
      <p class="text-sm leading-6 text-white">
        <a href="#pricing">
          <strong class="font-semibold">辩之竹3.0上线优惠</strong><svg viewBox="0 0 2 2"
                                                                class="mx-2 inline fill-current h-0.5 w-0.5"
                                                                aria-hidden="true"
          ><circle cx="1"
                   cy="1"
                   r="1"
          /></svg>上线优惠正在进行中，您可以点击&nbsp;跳转查看<span aria-hidden="true">&rarr;</span>
        </a>
      </p>
      <button type="button"
              class="flex-none -m-1.5 p-1.5"
              @click="shouldShow = false"
      >
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="h-5 w-5 text-white"
                   aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid';

const shouldShow = ref(true);
</script>
