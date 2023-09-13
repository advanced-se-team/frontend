<template>
  <VBlankTitle>诶！走错啦，此处无页面。</VBlankTitle>
</template>

<script setup>
import { useRouter } from 'vue-router';
import VBlankTitle from '@/components/VBlankTitle.vue';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push('/');
  }, 3000);
});
</script>

<route lang="yaml">
meta:
  layout: logoBlank
</route>
