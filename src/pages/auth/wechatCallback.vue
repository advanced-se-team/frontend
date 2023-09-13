<template>
  <VBlankTitle>正在登录中，请稍候……</VBlankTitle>
</template>

<script setup>
/* eslint-disable camelcase */
import { useRouter } from 'vue-router';
import AV from 'leancloud-storage/live-query';
import { useRouteQuery } from '@vueuse/router';
import VBlankTitle from "@/components/VBlankTitle.vue";

const router = useRouter();

const loginViaWechat = async () => {
  try {
    const code = useRouteQuery('code');

    const loginInfo = await AV.Cloud.run('WechatCodeToInfo', {
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
      scope: 'snsapi_login',
    };

    // await AV.User.loginWithAuthData(thirdPartyData, 'weixin');
    await AV.User.loginWithAuthDataAndUnionId(thirdPartyData, 'debateBambooWeb', unionid, {
      unionIdPlatform: 'weixin', // 这里指定 UnionIdPlatform，使用「weixin」来指代微信平台。
      asMainAccount: true,
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
    router.push('/');
  } else if (code.value) {
    loginViaWechat();
  }
});
</script>

<route lang="yaml">
meta:
  layout: logoBlank
</route>
