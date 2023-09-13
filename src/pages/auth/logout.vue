<template>
  <VBlankTitle>登出成功</VBlankTitle>
</template>

<script setup>
import AV from 'leancloud-storage/live-query';
import { useRouter } from 'vue-router';
import VBlankTitle from "@/components/VBlankTitle.vue";

const router = useRouter();

onMounted(() => {
  if (AV.User.current()) {
    AV.User.logOut();

    setTimeout(() => {
      router.push('/');
    }, 3000);
  } else {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }
});
</script>

<route lang="yaml">
meta:
  layout: logoBlank
  heading: 计时器页面
  description: 在本页面是您使用过或创建的赛事，可以在这里编辑、分享、计时它们。进行一场计时？直接点击“计时”。
</route>
