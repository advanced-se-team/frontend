<template>
  <div id="pricing"
       class="py-24 sm:pt-32"
  >
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base font-semibold leading-7 text-green-600">
          价格
        </h2>
        <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          付费以解锁高级能力
        </p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        您付费后，我们希望高级能力能伴您比赛始终，因此我们将能力解锁的时长设置为半年。半年足够您完成任意规模的比赛。
      </p>
      <div class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div v-for="(tier, tierIdx) in tiers"
             :key="tier.id"
             :class="[tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8', tierIdx === 0 ? 'lg:rounded-r-none' : '', tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '']"
             class="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3 :id="tier.id"
                  :class="[tier.mostPopular ? 'text-green-600' : 'text-gray-900']"
                  class="text-lg font-semibold leading-8"
              >
                {{ tier.name }}
              </h3>
              <p v-if="tier.mostPopular"
                 class="rounded-full bg-green-600/10 py-1 text-xs font-semibold leading-5 text-green-600 px-2.5"
              >
                最受欢迎
              </p>
            </div>
            <p class="mt-4 text-start text-sm leading-6 text-gray-600">
              {{ tier.description }}
            </p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <del v-if="tier.priceDiscount!=='0'"
                   class="text-2xl font-bold tracking-tight text-gray-900"
              >
                {{ tier.priceMonthly }}
              </del>
              <span
                :class="[
                  tier.priceDiscount !== '0' ? 'text-green-600' : 'text-gray-900',
                ]"
                class="text-4xl font-bold tracking-tight"
              >
                {{ tier.priceDiscount }}
              </span>
              <span class="text-sm font-semibold leading-6 text-gray-600">元（解锁后可在半年内使用）</span>
            </p>
            <ul class="mt-8 text-sm leading-6 text-gray-600 space-y-3"
                role="list"
            >
              <li v-for="feature in tier.features"
                  :key="feature"
                  class="flex gap-x-3"
              >
                <CheckIcon aria-hidden="true"
                           class="h-6 w-5 flex-none text-green-600"
                />
                {{ feature }}
              </li>
              <li v-for="feature in tier.noFeatures"
                  :key="feature"
                  class="flex gap-x-3 text-start"
              >
                <NoSymbolIcon aria-hidden="true"
                              class="h-6 w-5 flex-none text-red-600"
                />
                {{ feature }}
              </li>
            </ul>
          </div>
          <div :aria-describedby="tier.id"
               :class="[tier.mostPopular ? 'bg-green-600 text-white shadow-sm hover:bg-green-500' : 'text-green-600 ring-1 ring-inset ring-green-200 hover:ring-green-300']"
               class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer"
               @click="$router.push('/subscription')"
          >
            {{ tier.id!=='tier-freelancer'?'订阅此版本':'无需订阅' }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <p class="relative rounded-full px-4 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/10 py-1.5 hover:ring-gray-900/20">
        <span class="hidden md:inline">我们提供完整的功能对比，您可以</span>
        <a class="font-semibold text-green-600"
           href="/pricing"
        ><span aria-hidden="true"
               class="absolute inset-0"
        /> 深入了解版本区别 <span aria-hidden="true">&rarr;</span></a>
      </p>
    </div>
    <div class="mt-2 flex justify-center">
      <p class="relative rounded-full px-4 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/10 py-1.5 hover:ring-gray-900/20">
        <span class="hidden md:inline">嘿！您是之前付费过的老用户？请点击这里</span>
        <a class="font-semibold text-green-600"
           href="#"
        ><span aria-hidden="true"
               class="absolute inset-0"
        /> 获得新版订阅回馈 <span aria-hidden="true">&rarr;</span></a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/20/solid';
import { NoSymbolIcon } from '@heroicons/vue/24/outline';

const tiers = [
  {
    name: '免费版',
    id: 'tier-freelancer',
    href: '#',
    priceMonthly: '0',
    priceDiscount: '0',
    description: '任何用户都可以免费使用以下功能。',
    features: [
      '所有的计时器功能',
      '所有的赛制修改功能',
    ],
    noFeatures: ['其余所有标“Pro”的功能', '客服支持'],
    mostPopular: false,
  },
  {
    name: '专业版',
    id: 'tier-startup',
    href: '#',
    priceMonthly: '299',
    priceDiscount: '99',
    description: '只要您想办出一场优秀的、美观的、顺利的辩论赛，这就是您的最佳选择。',
    features: [
      '所有的计时器功能',
      '所有的赛制修改功能',
      '样式：自定义背景、调整元素位置等',
      '赛程：预配置赛程',
      '关闭或修改计时器Logo',
      '更多其他待更新功能',
      '客服支持：工作日9~17时',
    ],
    noFeatures: [],
    mostPopular: true,
  },
  {
    name: '教育版',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '299',
    priceDiscount: '39',
    description: '为在校学生、校级团委、学生会、辩论队、网辩队伍、地区非盈利学生赛事等赛事预算在10,000元以内的非盈利性赛事提供优惠版本。',
    features: [
      '专业版全部能力',
      '如果您存在切实的财务困难，可以附说明继续降价',
    ],
    noFeatures: [
      '关闭或修改计时器Logo',
      '客服支持',
      '您需要提供有效的教育用户验证材料',
    ],
    mostPopular: false,
  },
];
</script>
