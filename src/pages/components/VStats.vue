<template>
  <div class="py-12 sm:py-20">
    <div class="mx-auto max-w-7xl px-6 space-y-16 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">持续更新4年，深受用户信赖</h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">截止2023年9月2日，我们已经服务了全世界各地的辩论——</p>
      </div>
      <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
        <div v-for="stat in stats" :key="stat.id" class="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt class="text-base leading-7 text-gray-600">{{ stat.name }}</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{{ stat.value }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { id: 1, name: '登记的辩论赛事', value: '107702 个' },
  { id: 2, name: '过去一年中进行的辩论场次', value: '466934 场' },
  { id: 3, name: '政府、企业、律师所、银行等', value: '300 余个' },
]
</script>
