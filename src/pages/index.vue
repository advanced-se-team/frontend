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
  <div class="w-full sm:max-w-3xl sm:mx-auto space-y-6 pb-10">
    <VSheet v-if="shouldShowSubscribe">
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>课表订阅</div>
        </div>
        <p class="mt-2 text-sm text-gray-500 leading-6">
          请跟随提示添加订阅。
        </p>
      </div>
      <div class="p-6" v-if="isWechat">
        <p class="pb-0 mb-0">您正从<span class="text-green-600">微信</span>打开：</p>
        <div class="items-center">
          ①第一步：
          <TButton v-if="isSupported"
                   size="small"
                   theme="success"
                   variant="outline"
                   @click="copy(subscribeUrl)"
          >
            {{ copied?'复制成功！':'点此复制' }}
          </TButton>
          <br>
          ②第二步：粘贴到任意其他浏览器打开（ios-safari等，安卓-任意浏览器）
        </div>
        <TDivider>或</TDivider>
        如果您使用第三方日历软件：
        复制以下的链接，手动添加到您的日历软件
        <div class="select-all w-full bg-gray-100 shadow-inner rounded-md p-3 mt-2 break-words text-center">
          {{subscribeUrlRaw}}
        </div>
      </div>
      <div class="p-6" v-else>
        <p class="pb-0 mb-0">如果您从<span class="text-green-600">微信</span>打开：</p>
        <div class="items-center">
          ①第一步：
          <TButton v-if="isSupported"
                   size="small"
                   theme="success"
                   variant="outline"
                   @click="copy(subscribeUrl)"
          >
            {{ copied?'复制成功！':'点此复制' }}
          </TButton>
          <br>
          ②第二步：粘贴到任意其他浏览器打开（ios-safari等，安卓-任意浏览器）
        </div>
        <TDivider>或</TDivider>
        如果您使用macbook或ipad，且目前从浏览器打开：
        <TButton
            as="a"
            :href="subscribeUrl"
            size="small"
            theme="success"
            variant="outline"
        >
          直接点此添加订阅
        </TButton>
        <TDivider>或</TDivider>
        如果您使用第三方日历软件：
        复制以下的链接，手动添加到您的日历软件
        <div class="select-all w-full bg-gray-100 shadow-inner rounded-md p-3 mt-2 break-words text-center">
          {{subscribeUrlRaw}}
        </div>
      </div>
    </VSheet>
    <VSheet>
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>SEP邮箱&密码维护</div>
        </div>
        <p class="mt-2 text-sm text-gray-500 leading-6">
          需知： <br>
          1. 本软件不明文存储或传输您的密码：您的密码将在浏览器中先进行一次RSA加密，随后将加密后的密码传输到服务器。后台看不到密码是什么，您的密码也不会明文在网络上传输。<br>
          2. 您的所有数据不会经过开发者的任何服务器，而是直接加密存储在第三方供应商leancloud的服务器中，leancloud为知乎、懂球帝等提供数据服务，安全性有保障。<br>
          3. SEP不定期抽风，会导致查询不到。如果反复刷新都没有出现订阅链接，请等待1-2小时再次绑定。<br>
          4. 课程表 <span class="text-red-500">不会自动更新</span>，所以如果换了课，请务必重新绑定一次，绑定时会刷新课表。<br>
          5. 小于向你问好qwqq希望你今天过得顺利、愉快！
        </p>
      </div>
      <div class="p-6">
        <TButton
            v-if="!AV.User.current()"
            class="w-full mb-3"
            @click="router.push('/auth/login?re=1')"
            theme="warning"
        >
          请先点此登录
        </TButton>
        <p class="text-sm pb-5 text-gray-500 pl-5">友情提示：您也可以用电脑打开本链接，手机扫码登录。信息是同步的。</p>
        <TForm ref="createForm"
               :data="basicInfo.data"
               :rules="rules"
               @submit="formSubmit"
        >
          <TFormItem label="SEP邮箱"
                     name="email"
          >
            <TInput
                id="email"
                v-model="basicInfo.data.email"
                name="email"
                autocomplete="username"
                placeholder="...@mails.ucas.ac.cn"
                type="text"
            />
          </TFormItem>
          <TFormItem label="SEP密码"
                     name="password"
          >
            <TInput
                id="password"
                v-model="basicInfo.data.password"
                aria-describedby="password"
                name="password"
                placeholder="请输入密码"
                type="password"
                autocomplete="current-password"
            />
          </TFormItem>

          <div>您的密码经RSA加密后：（我们会向服务器上传此值）</div>
          <div class="mt-2 p-4 shadow-inner bg-gray-100 break-words rounded-md">
            {{rsaPass}}
          </div>

          <div class="mt-5 sm:mt-6">
            <TButton
                :disabled="!AV.User.current()"
                :loading="isDisabled"
                class="w-full"
                type="submit"
            >
              {{!isDisabled?'绑定以上用户名密码':'请等待30秒左右后刷新页面'}}
            </TButton>
          </div>
        </TForm>
      </div>
    </VSheet>
    <VSheet class="p-6">
      <p>

        本项目使用了以下开源代码的部分：<br>
        作者barryZZJ：https://github.com/barryZZJ/ucas_course_to_calendar<br>
        作者A-Stupid-Sun: https://github.com/A-Stupid-Sun/Enroll-helper<br>
        作者amefumi：https://github.com/A-Stupid-Sun/Enroll-helper<br>
        作者LyleMi：https://github.com/LyleMi/ucas<br>
        <br>
        感谢这几位开源开发者们的工作！
      </p>
    </VSheet>
  </div>
</template>

<style scoped lang="scss">

</style>


<route lang="yaml">
meta:
  layout: with-navbar
  heading: 我的赛事
  description: 在本页面是您使用过或创建的赛事，可以在这里编辑、分享、计时它们。进行一场计时？直接点击“计时”。
</route>
