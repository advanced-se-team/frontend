<script setup>
import { useRoute, useRouter } from 'vue-router';
import {useRouteQuery} from "@vueuse/router/index";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const { redirectTo, code } = route.query;
  // if(redirectTo.split('.'))
  if (code) {
    router.push(redirectTo+'?code='+code);
  }
  // router.push(redirectTo || '/');
});
</script>

<template><div /></template>
