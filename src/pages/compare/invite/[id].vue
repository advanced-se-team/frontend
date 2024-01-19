<template>
  <VBlankTitle>ta正在邀请你加入课表对比</VBlankTitle>
  <div class="mx-auto mt-6 w-full justify-center flex flex-row"><TButton @click="acceptInvitation">同意加入</TButton></div>
  <div class="mx-auto mt-2 w-full justify-center flex flex-row">关闭页面即可拒绝</div>
</template>

<script setup>
import AV from 'leancloud-storage/live-query';
import {useRoute, useRouter} from 'vue-router';
import VBlankTitle from "@/components/VBlankTitle.vue";
import {useMeta} from "vue-meta";

const router = useRouter();
const route = useRoute()

onMounted(() => {

});
const acceptInvitation = async ()=>{
  if(!AV.User.current()) {
    router.push('/auth/login?re=1');
    return ;
  }
  // 根据user查找是否有课表，没有的话alert提示一下，然后跳转到/
  const user = AV.User.current();
  const query = new AV.Query('UCAS_CourseCalendar');
  query.equalTo('user', user);
  const cnt = await query.count()
  if(cnt === 0) {
    alert('请先导入课表');
    router.push('/');
    return ;
  }

  const {id} = route.params;
  AV.Cloud.run('acceptInvitation', {colId:id}).then((res)=>{
    console.log(res);
    router.push('/compare/'+id);
  }).catch((err)=>{
    console.log(err);
  })
}
useMeta({
  title: '邀请对比',
  htmlAttrs: { lang: 'zh', amp: true },
});
</script>

<route lang="yaml">
meta:
  layout: logoBlank
</route>
