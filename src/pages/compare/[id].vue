<script setup>

import VSheet from "@/components/VSheet.vue";
import VProTag from "@/components/VProTag.vue";
import {DocumentPlusIcon} from "@heroicons/vue/24/outline";
import VSubLock from "@/components/VSubLock.vue";
import {useRoute, useRouter} from "vue-router";
import AV from "leancloud-storage/live-query";
import {toNumber, toString} from "lodash-es";
import {useClipboard, useThrottleFn} from "@vueuse/core";
import { JSEncrypt } from 'jsencrypt'
import {useMeta} from "vue-meta";
import {cloneDeep} from 'lodash-es'

const router = useRouter();
const route = useRoute()
const createForm = ref(null);

const lessonTable = reactive({
  data: [
    [[],[{name:'于卓浩'}],[],[],[],[],[],[],[],[],[],[],],
    [[],[],[],[],[],[],[],[],[],[],[],[],],
    [[],[],[],[{name:'于卓浩'}],[],[],[],[],[],[],[],[],],
    [[],[],[],[],[],[],[],[],[],[],[],[],],
    [[],[],[],[],[],[],[],[],[{name:'于卓浩'}],[],[],[],],
    [[],[],[],[],[],[],[],[],[],[],[],[],],
    [[],[],[],[],[],[],[],[],[],[],[],[],],
  ],
  info: {

  }
})
onMounted(async ()=>{
  const {id} = route.params;
  // 获取课表对比数据
  const query = new AV.Query('UCAS_Collision');
  query.equalTo('objectId', id);
  const result = (await query.find())[0]
  lessonTable.info = {
    name: result.get('name'),
    week: result.get('week'),
  }
  if(result.get('shouldUpdate')) {
    AV.Cloud.run('calculateCollision', {colId:id}).then((res)=>{
      console.log(res);
      lessonTable.data = res.data;
    }).catch((err)=>{
      console.log(err);
    })
  } else {
    lessonTable.data = result.get('collisionResult').data;
  }
})
const indexedTable = computed(()=>{
  const data = cloneDeep(lessonTable.data)
  // put a object in data's first place
  data.unshift(['#1','#2','#3','#4','#5','#6','#7','#8','#9','#10','#11','#12'])
  const heads = ['例','一','二','三','四','五','六','日']
  for(let i=0;i<data.length;i+=1) {
    data[i].unshift(heads[i])
  }
  return data
})
const computeOutput = (day, lesson, lessonArr) => {
  return day===0||lesson===0?lessonArr:(lessonArr.length===0?' ':lessonArr.length);
}
const computeTooltip = (day, lesson, lessonArr) => {
  return day===0||lesson===0?'':(lessonArr?.length===0?'':lessonArr.map((item)=>item.name).join('、'));
}
const isEmpty = (day, lesson, lessonArr) => {
  const out = computeOutput(day, lesson, lessonArr)
  return out === ' ';
}
useMeta({
  title: '课表对比',
  htmlAttrs: { lang: 'zh', amp: true },
});
const computeAllParticipants = computed(() => {
  const res = []
  let data = lessonTable.data
  console.log(data)
  for(let i=0;i<data.length;i+=1) {
    for(let j=0;j<data[i].length;j+=1) {
      if(data[i][j].length>0) {
        for(let k=0;k<data[i][j].length;k+=1) {
          res.push(data[i][j][k].name)
        }
      }
    }
  }
  // res去重
  console.log(res)
  const set = new Set(res)
  const res1 = [...set].join('、')
  return res1
})
</script>

<template>
  <div class="w-full sm:max-w-5xl sm:mx-auto space-y-6 pb-10">
    <VSheet>
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>对比：{{lessonTable.info.name}} [第{{lessonTable.info.week}}周]</div>
        </div>
      </div>
      <div class="p-6">
        <div class="pb-5">
          <div>分享以下链接以邀请加入：</div>
          <div class="break-words bg-gray-100 shadow-inner p-3 select-all mt-1 w-full rounded-xl">
            https://ucas.puluter.cn/compare/invite/{{route.params.id}}
          </div>
        </div>
        <div class="w-full bg-gray-100 rounded-xl p-4 cursor-pointer">
          已加入人员：{{computeAllParticipants}}
        </div>
        <div class="w-full flex justify-center">
          <div
              class="flex justify-start items-start space-x-1 mt-5">
            <div v-for="(dayArr, day) in indexedTable"
                 class="flex flex-col justify-start items-center space-y-1"
            >
              <div v-for="(lessonArr, lesson) in dayArr">
                <TTooltip :content="computeTooltip(day, lesson, lessonArr)">
                <div class="p-2 rounded w-[40px] sm:w-[70px] text-center h-8 flex justify-center items-center"
                :class="[
                    isEmpty(day, lesson, lessonArr)?'bg-green-100':'bg-blue-400 text-white',
                ]">
                    {{computeOutput(day, lesson, lessonArr)}}
                </div>
              </TTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VSheet>
  </div>
</template>

<style scoped lang="scss">

</style>


<route lang="yaml">
meta:
  layout: with-navbar
</route>
