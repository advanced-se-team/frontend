<script setup>

import VSheet from "@/components/VSheet.vue";
import {DocumentPlusIcon} from "@heroicons/vue/24/outline";
import {useRouter} from "vue-router";
import AV from "leancloud-storage/live-query";
import {useMeta} from "vue-meta";

const router = useRouter();
const isDisabled = ref(false);

useMeta({
  title: '读读论文',
  htmlAttrs: {lang: 'zh', amp: true},
});

const currentPagination = ref(1);
const searchResult = reactive({
  count: 0,
  data: [],
});


const onCurrentChange = () => {
  startSearch((currentPagination.value - 1) * 10);
};

const startSearch = async (skip) => {
  const query = new AV.Query('ReadPaper_Paper');
  query.limit(10);
  query.skip(skip);
  query.descending('updatedAt');
  const res = await query.find();
  searchResult.count = await query.count();
  searchResult.data = res.map((item) => {
    const filename = item.get('pdf').get('name');
    const stillProcessing = (item.get('LLMContent') === undefined) + (item.get('pdfContent') === undefined);
    return {
      id: item.id,
      paperName: filename,
      stillProcessing,
    };
  });
};

const papers = ref([{}, {}, {}])
onMounted(() => {
  startSearch(0)
})
const isWechat = ref(false)
wx.checkJsApi({
  jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  success() {
    isWechat.value = true
  },
});
const uploadRef = ref(null);

const uploadImg = async (file) => {
  const {name} = file;
  const avFile = new AV.File(name, file.raw);

  const fileSaved = await avFile.save({
    onprogress: (progress) => {
      uploadRef.value.uploadFilePercent({file, percent: progress.percent});
    },
  });

  const Paper = AV.Object.extend('ReadPaper_Paper');
  const paper = new Paper();
  paper.set('pdf', fileSaved);
  await paper.save();

  AV.Cloud.run('LLMOutline', {
    paperId: paper.id,
  })
  alert('上传成功！正在后台处理中，请4~5分钟后请返回界面。')
};

</script>

<template>
  <div class="w-full flex flex-row space-x-6 pb-10 grid grid-cols-12">
    <VSheet class="col-span-8">
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>论文阅读器</div>
        </div>
      </div>
      <div class="p-6 flex flex-col space-y-2">
        <div v-for="paper in searchResult.data">
          <div class="flex flex-row items-center space-x-2 p-4 rounded-xl shadow-card border-[1px]">
            <DocumentPlusIcon class="w-6 h-6 text-gray-400"/>
            <div class="flex-grow">
              <div class="text-lg font-semibold">
                {{ paper.paperName }}
              </div>
            </div>
            <div class="flex flex-row items-center space-x-2 flex-shrink-0">
              <TButton theme="success" variant="outline" @click="router.push(`/pdf/${paper.id}`)"
                       :disabled="paper.stillProcessing > 0"
                       :loading="paper.stillProcessing > 0"

              >
                {{ paper.stillProcessing > 0 ? `处理中(${paper.stillProcessing}/2)` : '阅读' }}
              </TButton>
            </div>
          </div>
        </div>

        <TPagination
            v-model="currentPagination"
            page-size="10"
            :page-size-options="[]"
            :total="searchResult.count"
            @current-change="onCurrentChange"
        />
      </div>
    </VSheet>
    <VSheet class="col-span-4">
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>论文知音</div>
        </div>
        <p class="mt-2 text-sm text-gray-500 leading-6">
          上传一篇论文 <br>
        </p>
      </div>
      <div class="p-6 flex flex-col items-center space-y-4">
        <div
            v-if="!AV.User.current()">

            <TButton @click="router.push('/auth/login?retry=1')">点此登录</TButton>
          <div>
            需要登录才能上传论文（微信扫码）；阅读论文点击左侧即可。
          </div>
        </div>
        <div v-else>

          <TUpload
              :disabled="!AV.User.current()"
              ref="uploadRef"
              :locale="{
                      triggerUploadText: {
                        image: '上传一篇论文',
                      },
                    }"
              :request-method="uploadImg"
              accept=".pdf"
              auto-upload
          />

          <div>
            上传论文后会自动解析。
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
