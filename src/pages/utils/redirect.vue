<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const { redirectTo } = route.query;

  router.push(redirectTo || '/');
});
</script>

<template><div /></template>
