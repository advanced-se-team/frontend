<template>
  <div class="flex min-h-[100vh] flex-1 flex-col justify-center bg-gray-100 px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img alt="Your Company"
           class="mx-auto h-32 w-auto rounded-full shadow-2xl"
           src="https://cdn.puluter.cn/bamboo-cqu2019_logo1.png?imageView2/2/w/300"
      >
      <!--      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> -->
      <!--        微信登录 -->
      <!--      </h2> -->
    </div>

    <div id="weixin"
         class="mx-auto mt-10 h-[400px] w-[300px]"
    />

    <p v-if="route.query?.re"
       class="mx-auto"
    >
      您尝试使用了一个必须登录才能使用的功能，请登录。
    </p>
  </div>
</template>

<script setup>
import AV from 'leancloud-storage/live-query';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (AV.User.current()) {
    router.push('/');
  } else {
    const loginDomain = import.meta.env.DEV ? 'http://localhost:5173' : 'https://puluter.cn';
    const callbackDomain = import.meta.env.DEV ? 'http://localhost:8008' : 'https://ucas.puluter.cn';

    let callback = callbackDomain+'/auth/wechatCallback';
    window.location.href = loginDomain+'/auth/login?re=1&redirectTo='+encodeURIComponent(callback);
  }
});
</script>

<route lang="yaml">
meta:
  layout: blank
  heading: 计时器页面
  description: 在本页面是您使用过或创建的赛事，可以在这里编辑、分享、计时它们。进行一场计时？直接点击“计时”。
</route>
