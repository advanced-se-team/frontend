<script setup>
import { ArrowLeftCircleIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { useDebounceFn, useElementHover } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import AV from 'leancloud-storage/live-query';
import { useCreateNavbarStore } from '@/stores/useCreateNavbarStore';

const props = defineProps({
  it: Object,
});

const hoverRef = ref(null);
const isHovered = useElementHover(hoverRef);
const editName = '我的辩论赛';

const route = useRoute();
const isEditing = computed(() => route.path.startsWith('/edit') && props.it.name === editName);

const myTournamentList = reactive({
  data: [],
});

const 导航栏数据库 = useCreateNavbarStore();
const router = useRouter();

const changeEditTournament = ({ value }) => {
  console.log(value);
  if (value === 'new') {
    router.push('/mine?create=true');
  } else if (value === 'more') {
    router.push('/mine');
  } else {
    router.push(`/utils/redirect?redirectTo=/edit/${value}`);
  }
};

const fetchTournamentList = useDebounceFn(async () => {
  const query = new AV.Query('Tournament');

  query.equalTo('createUser', AV.User.current());

  const res = await query.find({
    limit: 5,
  });

  myTournamentList.data = res.map((item) => {
    const a = item.toJSON();

    return { content: `${a.BasicInfo.name}`, value: a.objectId };
  });
  myTournamentList.data.at(-1).divider = true;
  myTournamentList.data.push({
    content: '查看更多…',
    value: 'more',
  });
  myTournamentList.data.push({
    content: '+ 新建一个',
    value: 'new',
  });
}, 500, { maxWait: 1000 });

watch(route, async () => {
  if (isEditing.value === true) {
    console.log('这是route改变的');
    await fetchTournamentList();
  }
});
onMounted(() => {
  if (isEditing.value === true) {
    console.log('这是onMounted');
    fetchTournamentList();
  }
});
</script>

<template>
  <div>
    <div v-if="it.name !== editName"
         @click="router.push(it.href)"
    >
      <div
        :class="[
          it.current
            ? 'bg-white text-green-600 shadow-cs'
            : 'text-gray-500 hover:bg-gray-200',
          it.name === editName ? '' : 'px-2',
        ]"
        class="inline-flex cursor-pointer items-center text-base font-semibold gap-x-1.5 px-3.5 py-2.5 rounded-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span aria-hidden="true"
              class="h-6 w-6 -ml-0.5"
        >
          <span v-if="it.current">
            <Component :is="it.iconSolid"
                       aria-hidden="true"
            />
          </span>
          <span v-else>
            <Component :is="it.icon"
                       aria-hidden="true"
            />
          </span>
        </span>

        <div class="">
          {{ it.name }}
        </div>
      </div>
    </div>
    <div
      v-else
      :class="[
        it.current
          ? 'bg-white text-green-600 shadow-cs'
          : 'text-gray-500 hover:bg-gray-200',
        it.name === editName ? '' : 'px-2',
      ]"
      class="inline-flex cursor-pointer items-center text-base font-semibold gap-x-1.5 rounded-[10px] py-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <div
        ref="hoverRef"
        :class="[isEditing ? 'hover:bg-green-50 ' : 'pr-2.5']"
        class="inline-flex flex-row items-center py-[7px] ml-[3px] space-x-1.5 rounded-[9px] pr-1.5"
        @click="$router.push('/mine')"
      >
        <div aria-hidden="true"
             class="ml-1 h-6 w-6"
        >
          <span v-if="it.current">
            <Component
              :is="it.iconSolid"
              v-show="!isEditing || !isHovered"
              aria-hidden="true"
              class="h-6 w-6"
            />
            <Component
              :is="ArrowLeftCircleIcon"
              v-show="isEditing && isHovered"
              aria-hidden="true"
              class="h-6 w-6"
            />
          </span>
          <span v-else>
            <Component :is="it.icon"
                       aria-hidden="true"
            />
          </span>
        </div>

        <div class="">
          {{ it.name }}
        </div>
      </div>

      <div v-show="isEditing"
           class="text-gray-400"
      >
        /
      </div>
      <TDropdown
        :max-column-width="200"
        :options="myTournamentList.data"
        placement="bottom"
        @click="changeEditTournament"
      >
        <div
          v-show="isEditing"
          :class="[isEditing ? 'hover:bg-green-50 ' : '']"
          class="inline-flex flex-row items-center pr-1 pl-1 py-[7px] mr-[3px] space-x-1.5 rounded-[9px]"
        >
          <div class="ml-1">
            {{ 导航栏数据库.组件间传输数据.title }}
          </div>

          <div class="h-4 w-4">
            <ChevronDownIcon />
          </div>
        </div>
      </TDropdown>
    </div>
  </div>
</template>
