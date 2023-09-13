<script setup>
const faqs = [
  {
    id: 0,
    question: '我的比赛只使用一个月/一次，也得付全部价格么？',
    answer:
        '请您理解，收费是为了给您的比赛解锁高级功能。而半年的时限相当于为您的比赛横跨的时间设置了一个半年的上限。因此实际上订阅费用您可以理解为是按比赛收取，而不是按时间收取。因此，无论您的比赛实际使用多长时间，都需要付全部价格。',
  },
  {
    id: 1,
    question: '购买一次能够使用多久？',
    answer:
        '每次购买，会将您的订阅时长延长6个月，即半年。对于99%的辩论赛事，这个时长都足够覆盖其从小组赛到总决赛。',
  },
  {
    id: 2,
    question: '有没有教育优惠？',
    answer:
        '有的，您可以向我们提供【在校学生、校级团委、学生会、辩论队、网辩队伍】等证明，购买教育版。请注意，赛事预算在10,000元以上的不享受此优惠。',
  },
  {
    id: 3,
    question: '我付费之后，使用者是否还需要付费？',
    answer:
        '只有您——赛事创建者需要付费。任何使用者都可以不付费使用您的比赛里的高级功能。',
  },
  {
    id: 4,
    question: '订阅过期后？',
    answer:
        '订阅过期后您将不再能调整这些设置。但是，您已经设置过的高级功能会被保留，仍然可以正常使用。',
  },
  {
    id: 5,
    question: '体验版过期后？',
    answer:
        '如果您是未付费的体验4天，过期后所有的高级设置均会被重置、冻结，付费后可正常修改。',
  },
  {
    id: 6,
    question: '能否开具发票？',
    answer:
        '暂时不能。我们正在积极推进合规化，但是发票的开具仍需要一定时间的前期筹备。目前已有企业主体，预计不晚于10月中旬我们可以为您补开发票。在具备发票开具的条件后，我们会在软件内提示您。',
  },
];
</script>

<template>
  <!-- FAQs -->
  <div class="mx-auto max-w-2xl px-6 pb-8 divide-y divide-gray-900/10 sm:pt-12 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pb-32">
    <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
      常见问题
    </h2>
    <dl class="mt-10 text-start space-y-8 divide-y divide-gray-900/10">
      <div v-for="faq in faqs"
           :key="faq.id"
           class="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
      >
        <dt class="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
          {{ faq.question }}
        </dt>
        <dd class="mt-4 lg:col-span-7 lg:mt-0">
          <p class="text-base leading-7 text-gray-600">
            {{ faq.answer }}
          </p>
        </dd>
      </div>
    </dl>
  </div>
</template>
