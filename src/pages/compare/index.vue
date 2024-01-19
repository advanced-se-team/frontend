<script setup>

import VSheet from "@/components/VSheet.vue";
import VProTag from "@/components/VProTag.vue";
import {DocumentPlusIcon} from "@heroicons/vue/24/outline";
import VSubLock from "@/components/VSubLock.vue";
import {useRouter} from "vue-router";
import AV from "leancloud-storage/live-query";
import {toNumber, toString} from "lodash-es";
import {useClipboard, useThrottleFn} from "@vueuse/core";
import { JSEncrypt } from 'jsencrypt'
import {useMeta} from "vue-meta";
import VNewDialog from "@/pages/components/VNewDialog.vue";
const router = useRouter();

useMeta({
  title: '对比列表',
  htmlAttrs: { lang: 'zh', amp: true },
});
const collisionList = reactive({
  data: []
})
onMounted(async ()=>{
  if(!AV.User.current()) {
    return ;
  }
  const user = AV.User.current();
  const query = new AV.Query('UCAS_Collision');
  query.contains('joinedUsers', user.getObjectId())
  const res = await query.find();
  collisionList.data = res;
})
const showDialog = ref(false)
const createCollision = (data)=>{
  const {reason, week} = data;
  const user = AV.User.current();
  const Collision = AV.Object.extend('UCAS_Collision');
  const collision = new Collision();
  collision.set('name', reason);
  collision.set('createUser', user);
  collision.set('week', toNumber(week));
  collision.set('joinedUsers', [user.getObjectId()]);
  collision.save().then((res)=>{
    router.push(`/compare/${res.id}`);
  }).catch((err)=>{
    console.log(err);
  })
}
</script>

<template>
  <div class="w-full sm:max-w-5xl sm:mx-auto space-y-6 pb-10">
    <VSheet>
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>多人课表对比</div>
        </div>
        <p class="mt-2 text-sm text-gray-500 leading-6">
          对比多人课表，找到共同空闲时间。
        </p>
      </div>
      <div class="p-6 space-y-2">
        <TButton @click="showDialog=true;" class="mb-4">新建一个对比</TButton>
        <div class="w-full bg-gray-100 rounded-xl p-4 cursor-pointer"
          v-for="item in collisionList.data"
         :key="item.id"
           @click="router.push(`/compare/${item.id}`)"
        >
          对比1：{{item.get('name')}} [第{{item.get('week')}}周]
        </div>
      </div>
    </VSheet>
    <VNewDialog :is-visible="showDialog" @close="showDialog = false"
    @submit="createCollision"/>
  </div>
</template>

<style scoped lang="scss">

</style>


<route lang="yaml">
meta:
  layout: with-navbar
</route>
