<template>
  <VBlankTitle>正在登录中，请稍候……</VBlankTitle>
</template>

<script setup>
/* eslint-disable camelcase */
import { useRoute, useRouter } from 'vue-router';
import AV from 'leancloud-storage/live-query';
import { useRouteQuery } from '@vueuse/router';
import VBlankTitle from '@/components/VBlankTitle.vue';

const router = useRouter();
const route = useRoute();

const loginViaWechat = async () => {
  try {
    const code = useRouteQuery('code');
    const funcName = 'WechatCodeToInfoFromWx';

    const loginInfo = await AV.Cloud.run(funcName, {
      code: code.value,
    });

    const {
      access_token, refresh_token, openid, unionid,
      nickname, headimgurl,
    } = loginInfo;

    const thirdPartyData = {
      openid,
      access_token,
      unionid,
      expires_in: 7200,
      refresh_token,
      scope: 'snsapi_userinfo,snsapi_base',
    };

    await AV.User.loginWithAuthDataAndUnionId(thirdPartyData, 'debateBambooWx', unionid, {
      unionIdPlatform: 'weixin', // 这里指定 UnionIdPlatform，使用「weixin」来指代微信平台。
      asMainAccount: false,
    });

    await AV.Cloud.run('WechatInfoUpdateToDB', {
      nickname, headimgurl,
    });

    await AV.User.current().fetch();
  } catch (e) {
    router.push('/auth/login?retry=1');
  }

  setTimeout(() => {
    router.push('/');
  }, 3000);
};

onMounted(() => {
  const code = useRouteQuery('code');
  if (AV.User.current()) {
    router.push('/lobby');
  } else if (code.value) {
    loginViaWechat();
  }
});
</script>

<route lang="yaml">
meta:
  layout: logoBlank
</route>
