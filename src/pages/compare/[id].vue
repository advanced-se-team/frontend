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
const router = useRouter();
const createForm = ref(null);
const rules = reactive({
  email: [
    {
      required: true, message: '邮箱必填', type: 'error', trigger: 'blur',
    },
  ],
  password: [
    {
      required: true, message: '密码必填', type: 'error', trigger: 'blur',
    },
  ],
});

const isDisabled = ref(false);
const formSubmit = useThrottleFn((value) => {
  if(!AV.User.current()) {
    router.push('/auth/login?re=1');
  }
  if (value.validateResult === true) {
    isDisabled.value = true;
    AV.Cloud.run('bindSEPInfo',{
      email: basicInfo.data.email,
      password: rsaPass.value,
    }).then((res)=>{
      console.log(res);
      router.push('/');
    }).catch((err)=>{
      console.log(err);
      alert(err.message);
    })
  } else {
    return false;
  }

  return true;
}, 2000);

useMeta({
  title: '课表订阅',
  htmlAttrs: { lang: 'zh', amp: true },
});
const rsaPass = computed(()=>{
  if(basicInfo.data.password === '') {
    return '等待输入中……'
  }
  const r = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxG1zt7VW/VNk1KJC7AuoInrMZKTf0h6S6xBaROgCz8F3xdEIwdTBGrjUKIhIFCeDr6esfiVxUpdCdiRtqaCS9IdXO+9Fs2l6fx6oGkAA9pnxIWL7bw5vAxyK+liu7BToMFhUdiyRdB6erC1g/fwDVBywCWhY4wCU2/TSsTBDQhuGZzy+hmZGEB0sqgZbbJpeosW87dNZFomn/uGhfCDJzswjS/x0OXD9yyk5TEq3QEvx5pWCcBJqAoBfDDQy5eT3RR5YBGDJODHqW1c2OwwdrybEEXKI9RCZmsNyIs2eZn1z1Cw1AdR+owdXqbJf9AnM3e1CN8GcpWLDyOnaRymLgQIDAQAB";
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(r);
  return encrypt.encrypt(basicInfo.data.password);
})
const basicInfo = reactive({
  data: {
    email: '',
    password: '',
  },
});
const shouldShowSubscribe = ref(false)
const subscribeUrl = ref('sss')
const subscribeUrlRaw = ref('sss')
onMounted(()=>{
  if(!AV.User.current()) {
    return ;
  }
  const ucas_course = new AV.Query('UCAS_CourseCalendar')
  ucas_course.equalTo('user',AV.User.current())
  ucas_course.include('course_ics')
  ucas_course.find().then((res)=>{
    console.log(res);
    if(res.length !== 0) {
      const cr = res[0]
      shouldShowSubscribe.value = true
      subscribeUrl.value = `webcal://ucas-engine.puluter.cn/cal/${cr.get('objectId')}`
      subscribeUrlRaw.value = `https://ucas-engine.puluter.cn/cal/${cr.get('objectId')}`
    }
  }).catch((err)=>{
    console.log(err);
  })
})
const { copy, copied, isSupported } = useClipboard({ source: subscribeUrl });
const isWechat = ref(false)
wx.checkJsApi({
  jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  success() {
    isWechat.value = true
  },
});
</script>

<template>
  <div class="w-full sm:max-w-5xl sm:mx-auto space-y-6 pb-10">
    <VSheet>
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>对比1：党支部会议</div>
        </div>
        <p class="mt-2 text-sm text-gray-500 leading-6">
          当前已有15人加入对比。
        </p>
      </div>
      <div class="p-6">
        <div class="w-full bg-gray-200 rounded-xl p-4 cursor-pointer">
          对比1：党支部会议
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
