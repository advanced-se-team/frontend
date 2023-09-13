<template>
  <div class="relative py-12 diy sm:py-32">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
         aria-hidden="true"
         v-if="meta.videoPosition === 'left'"
    >
      <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
           style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
    <div v-else class="absolute inset-x-0 top-[calc(40%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(40%-30rem)]"
         aria-hidden="true"
    >
      <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
           style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8 2xl:max-w-[1440px]">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <div class="lg:ml-auto lg:pt-4 lg:pl-4">
          <div class="lg:max-w-lg">
            <h2 class="text-base font-semibold leading-7 text-green-600">
              {{ meta.smallTitle }}
            </h2>
            <p
              class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              {{ meta.bigTitle }}
            </p>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              {{ meta.description }}
            </p>
            <dl
              class="mt-10 max-w-xl text-base leading-7 text-gray-600 space-y-2 lg:max-w-none"
            >
              <div
                v-for="(feature, idx) in features"
                :key="feature.name"
                class="relative cursor-pointer p-2 transition-all duration-500 rounded-cs"
                @click="videoTo(idx)"
                :class="[
                  idx === autoPlayStatus.active
                    ? 'bg-green-500'
                    : 'bg-gray-50',
                ]"
              >
                <div class="relative pl-9">

                  <dt
                    class="inline font-semibold"
                    :class="[
                      idx === autoPlayStatus.active
                        ? 'text-white active'
                        : 'text-gray-900',
                    ]"
                  >
                    <Component
                      :is="feature.icon"
                      class="absolute top-1 left-1 h-5 w-5"
                      aria-hidden="true"
                      :class="[
                        idx === autoPlayStatus.active
                          ? 'text-white '
                          : 'text-green-600',
                      ]"
                    />
                    {{ feature.name }}
                    <TTag
                        variant="outline"
                        shape="round"
                        :theme="idx===autoPlayStatus.active?'default':'success'"
                        :class="idx===autoPlayStatus.active?'text-white ':'text-green-500'"
                        size="small"
                        v-show="feature.isPro"
                    >
                      Pro
                    </TTag>
                  </dt>
                  &nbsp;
                  <dd
                    class="inline"
                    :class="[
                      idx === autoPlayStatus.active
                        ? 'text-white'
                        : 'text-gray-600',
                    ]"
                  >
                    {{ feature.description }}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
        <div class="flex items-center lg:col-span-2"
             ref="featuresRef"
        :class="[meta.videoPosition === 'left'?' lg:order-first':' lg:order-last']">
          <div class="w-full rounded-2xl bg-gray-200 p-2 shadow-inner ring-1 ring-gray-400/10 diy sm:p-5">
            <video-player
                :src="computedSrc"
                @ended="switchVideo"
                @mounted="onVideoProgress"
                class="rounded-xl shadow-xl"
                fluid
                muted
                autoplay
                playsinline
              ref="videop"
            />

<!--            <img :src="features[autoPlayStatus.active].demoUrl" v-show="features[autoPlayStatus.active]?.isImage" class="w-full rounded-xl object-cover" alt="使用预设的示意图"/>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.diy {
  :deep(.d-player-wrap) {
    @apply rounded-xl;
  }
}
</style>
<script setup>
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/vue/20/solid';
import {useElementSize, useElementVisibility, watchThrottled} from "@vueuse/core";
import {VideoPlayer} from "@videojs-player/vue";
import 'video.js/dist/video-js.css'
const videop = ref(null)
const featuresRef = ref(null)
const targetIsVisible = useElementVisibility(featuresRef)
const isFirstVisible = ref(true)
onMounted(() => {
  videoTo(0)
})
// watch(targetIsVisible, (isVisible) => {
//   if (isVisible) {
//     if(isFirstVisible.value){
//       isFirstVisible.value = false
//       videoTo(0)
//       videoPlayer.value.play()
//       return
//     }
//     videoPlayer.value.play()
//   } else {
//     videoPlayer.value.pause()
//   }
// })
const props = defineProps({
  meta: {
    type: Object,
    default: () => ({
      videoPosition: 'left',
      smallTitle: '计时器',
      bigTitle: '让计时器编辑得心应手',
      description:
        '基于4年的辩论计时器开发经验和数十万场比赛的实际反馈，我们重置了计时器的编辑工具，怎么舒服怎么来。',
    }),
  },
  features: {
    type: Array,
    default: () => [
      {
        name: '使用模板',
        description: '现在，你可以方便地使用其他赛事的计时赛制作为模板。',
        icon: CloudArrowUpIcon,
        demoUrl: 'https://cdn.puluter.cn/f/videos/f21.mp4',
        demoLength: 6000,
        isPro: false,
      },
      {
        name: '环节库',
        description: '我们提供了十余个环节作为模板库，加快您编写赛制的速度。',
        icon: LockClosedIcon,
        demoUrl: 'https://cdn.puluter.cn/f/videos/f21.mp4',
        isPro: false,
      },
      {
        name: '卡片即环节',
        description: '一个环节=一张卡片。从未如此方便修改计时设置。',
        icon: ServerIcon,
        demoUrl: 'https://cdn.puluter.cn/f/videos/f21.mp4',
        isPro: false,
      },
      {
        name: '复制、拖拽、删除',
        description: '为卡片添加了实用功能，试试就知道，真的很好用。',
        icon: ServerIcon,
        demoUrl: 'https://cdn.puluter.cn/f/videos/f21.mp4',
        isPro: false,
      },
      {
        name: '所见即所得',
        description: '一个计时器示例显示在屏幕左侧，你可以实时查看计时器效果。',
        icon: ServerIcon,
        demoUrl: 'https://cdn.puluter.cn/f/videos/f21.mp4',
        isPro: false,
      },
    ],
  },
});
const playOptions = reactive({
  color: '#409eff', //主题色
  width: 'full',
  height: 'auto',
  muted: true, // 静音
  // autoPlay: true, // 自动播放
  loop: false, // 循环播放
  control: false, // 镜像画面
  speed: false,
  src: '/src/assets/videos/F-计时器编辑-1-使用模板.mp4',
});
const {width:containerWidth} = useElementSize(featuresRef)
const autoPlayStatus = reactive({
  active: 0,
});
const computedSrc = computed(()=>props.features[autoPlayStatus.active].demoUrl)
const videoTo = (idx) => {
  autoPlayStatus.active = idx;
  playOptions.src = props.features[idx].demoUrl;
  // videoPlayer.value.play()
  if(props.features[idx]?.isImage){
    setTimeout(() => {
      videoTo(idx+1)
    }, 4000);
  }
};
const switchVideo = () => {
  const featureCnt = props.features.length;
  if (autoPlayStatus.active === featureCnt - 1) {
    videoTo(0);
  } else {
    videoTo(autoPlayStatus.active + 1);
  }
};

const vp = reactive({
  instance: null,
})
const onVideoProgress = ({video, player}) => {
  console.log(video)
  console.log(player)
  vp.instance = player
}

</script>

<style lang="scss" scoped>
.active {
  :deep(.t-tag--default.t-tag--outline) {
    border-color: white !important;
  }
}
 </style>
