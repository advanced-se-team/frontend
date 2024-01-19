<script setup>

import VSheet from "@/components/VSheet.vue";
import {useRoute, useRouter} from "vue-router";
import AV from "leancloud-storage/live-query";
import {useMeta} from "vue-meta";
const router = useRouter();
const route = useRoute()
import WebViewer from '@pdftron/webviewer'
import {MdPreview, MdCatalog} from "md-editor-v3";
import 'md-editor-v3/lib/preview.css';

useMeta({
  title: '课表订阅',
  htmlAttrs: { lang: 'zh', amp: true },
});
const filePath = ref("")
const markdownPaper = ref("")
const markdownOutline = ref("")

const parseOneLayer = (content, grade) => {
  const {Title, Content, Below} = content;
  markdownPaper.value += `${'#'.repeat(grade+1)} ${Title}\n\n${Content}\n\n`
  if(Below) {
    Below.forEach((item)=>{
      parseOneLayer(item, grade+1)
    })
  }
}

const parseMarkdown = (content) => {
  const {Title, AuthorInfo, Abstract} = content;
  markdownPaper.value += `# ${Title}\n---\n > ${AuthorInfo}\n\n${Abstract}\n\n`
  const {Content} = content;
  // Content里面，有多个object对象，对象可能会嵌套，嵌套的子节点存储于 Below中；层级用Grade表示；根据层级大小+1，为Title添加合适的#数量。每一层的Content实际上就是普通正文。
  // 按照以上标准，将Content遍历转换为Markdown
  Content.forEach((item)=>{
    parseOneLayer(item, 1)
  })
}
const parseLLM = (content) => {
  const {Title:TitleMax} = content;
  markdownOutline.value += `# ${TitleMax}\n---\n\n`
  const {Outline:OutlineMax} = content;
  console.log(OutlineMax)
  OutlineMax.forEach((item)=>{
    const {Title, Outline} = item;
    markdownOutline.value += `${'##'} ${Title}\n\n\n${Outline}\n\n`
  })
  console.log(markdownOutline.value)
}
onMounted(async ()=>{
  if(!AV.User.current()) {
    return ;
  }
  const {id} = route.params;
  console.log(route.params)
  if(id) {
    const paper = AV.Object.createWithoutData('ReadPaper_Paper',route.params.id);
    await paper.fetch()

    const pdf = paper.get('pdf')
    const pdfContent = paper.get('pdfContent')
    parseMarkdown(pdfContent);
    const LLMContent = paper.get('LLMContent')
    parseLLM(LLMContent);

    filePath.value = pdf.get('url');
    WebViewer.WebComponent({
      path: '/webviewer',
      licenseKey: import.meta.env.VITE_APP_PDF_TRON_KEY,
    }, document.getElementById('viewer'))
        .then(instance => {
          const { UI, Core } = instance;
          const { documentViewer, annotationManager, Tools, Annotations } = Core;
          // call methods from UI, Core, documentViewer and annotationManager as needed

          documentViewer.addEventListener('documentLoaded', () => {
            // call methods relating to the loaded document
          });

          instance.UI.loadDocument(filePath.value);
        })
  }
})


const isPDFReader = ref(true);

</script>

<template>
  <div class="w-full grid grid-cols-12 space-x-6 pb-10">
    <VSheet class="col-span-6">
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>论文阅读器</div>
        </div>
      </div>
      <div class="overflow-auto">
        <div id="viewer" v-if="isPDFReader"></div>
        <div class="w-full h-full p-5 bg-gray-50" v-else>
          <div class="rounded-xl">
            <MdPreview :model-value="markdownPaper"></MdPreview>
          </div>
        </div>
      </div>
    </VSheet>
    <VSheet class="col-span-6">
      <div class="rounded-t-xl border-b border-gray-200 bg-white p-4 sm:p-6">
        <div
            class="flex flex-row items-center text-xl font-semibold leading-6 text-gray-900 space-x-2"
        >
          <div>论文知音</div>
        </div>
        <p class="mt-2 text-sm text-gray-500 leading-6">
          使用LLM来加快论文阅读速度 <br>
        </p>
      </div>
      <div class="p-6"
           v-if="!AV.User.current()">
        <TButton
            class="w-full mb-3"
            @click="router.push('/auth/login?re=1')"
            theme="warning"
        >
          请先点此登录
        </TButton>
        <p class="text-sm pb-5 text-gray-500 pl-5">友情提示：您也可以用电脑打开本链接，手机扫码登录。信息是同步的。</p>
      </div>
      <div v-else  class="list-disc lllst"  >
<!--        <TButton>点击切换为pdf阅读</TButton>-->

        <MdPreview preview-theme="vuepress" :model-value="markdownOutline"></MdPreview>
      </div>
    </VSheet>
  </div>
</template>

<style scoped lang="scss">
.lllst {
  :deep(ul) {
    @apply list-disc;
  }
  :deep(li) {
    list-style: inherit;
  }
}
</style>


<route lang="yaml">
meta:
  layout: with-navbar
  heading: 我的赛事
  description: 在本页面是您使用过或创建的赛事，可以在这里编辑、分享、计时它们。进行一场计时？直接点击“计时”。
</route>
