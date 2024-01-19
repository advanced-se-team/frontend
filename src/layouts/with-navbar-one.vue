<template>
  <div
    class="flex select-none flex-col justify-start bg-gray-100 min-h-[100vh] max-h-[100vh]"
  >
    <div class="block min-h-16">
      <Disclosure
        v-slot="{ open }"
        as="nav"
        class="min-h-16 border-b border-gray-200"
      >
        <div
            class="hidden min-h-16 items-center sm:space-x-3 sm:-my-px sm:flex sm:absolute sm:w-full sm:flex-row top-3 sm:justify-center"
        >
          <VNavItem v-for="it in navigation"
                    :key="it.name"
                    :it="it"
          />
        </div>
        <div class="w-full px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between">
            <a class="flex items-center justify-start space-x-2"
               href="/"
            >
              <div class="flex flex-shrink-0 items-center">
                <div class="h-10 w-10 rounded-full bg-white p-1 shadow-inner">
                  <img
                    alt="Your Company"
                    class="block h-8 w-auto lg:hidden"
                    src="https://cdn.puluter.cn/f/favicon.ico"
                  >
                  <img
                    alt="Your Company"
                    class="hidden h-8 w-auto lg:block rounded-full"
                    src="https://cdn.puluter.cn/avatar.jpg"
                  >
                </div>
              </div>
              <div class="text-2xl text-serif">UCAS课表日历</div>
            </a>
            <!-- 中间的navitem部分 开始 -->


            <!-- 中间的navitem部分 结束 -->
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
              <Menu as="div"
                    class="relative ml-3"
              >
                <div>
                  <MenuButton
                    class="flex max-w-xs items-center justify-start rounded-full text-sm"
                  >
                    <img
                      v-if="user.nickname !== '12o3ui128sflakfjsdl'"
                      :src="user.headimgurl"
                      alt=""
                      class="h-8 w-8 rounded-full"
                    >
                    <TButton v-else
                             as="a"
                             theme="primary"
                             @click="gotoLogin"
                    >
                      点此登录
                    </TButton>
                  </MenuButton>
                </div>
                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="scale-95 transform opacity-0"
                  enter-to-class="scale-100 transform opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="scale-100 transform opacity-100"
                  leave-to-class="scale-95 transform opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem v-slot="{ active }">
                      <div
                        :class="[active ? 'bg-gray-100' : '']"
                        class="block px-4 py-2 text-sm text-gray-700"
                      >
                        {{ user.nickname }}
                      </div>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="/auth/logout">
                        <div
                          :class="[active ? 'bg-gray-100' : '']"
                          class="block px-4 py-2 text-sm text-gray-700"
                        >
                          登出
                        </div>
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>

            <div class="-mr-2 flex items-center sm:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="sr-only">Open main menu</span>
                <Bars3Icon
                  v-if="!open"
                  aria-hidden="true"
                  class="block h-6 w-6"
                />
                <XMarkIcon v-else
                           aria-hidden="true"
                           class="block h-6 w-6"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel class="sm:hidden">
          <div class="pt-2 pb-3 space-y-1">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              :aria-current="item.current ? 'page' : undefined"
              :class="[
                item.current
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
              ]"
              as="a"
              class="block border-l-4 py-2 pr-4 pl-3 text-base font-medium"
              @click="$router.push(item.href)"
            >
              {{ item.name }}
            </DisclosureButton>
          </div>
          <div class="border-t border-gray-200 pt-4 pb-3">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <img
                  :src="user.imageUrl"
                  alt=""
                  class="h-10 w-10 rounded-full"
                >
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">
                  {{ user.name }}
                </div>
                <div class="text-sm font-medium text-gray-500">
                  {{ user.email }}
                </div>
              </div>
              <button
                class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2"
                type="button"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon aria-hidden="true"
                          class="h-6 w-6"
                />
              </button>
            </div>
            <div class="mt-3 space-y-1">
              <DisclosureButton
                v-for="item in userNavigation"
                :key="item.name"
                :href="item.href"
                as="a"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                {{ item.name }}
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>

    <main class="grow">
      <div class="px-2 pt-6 sm:px-6 lg:px-8">
        <RouterView />
        <footer
          class="fixed right-0 bottom-0 left-0 flex h-8 w-full justify-center text-center text-gray-500"
        >
          <div
            class="flex h-6 w-auto justify-between rounded-full bg-white px-2 shadow space-x-3"
          >
            <a href="/">Made with ❤️ by 于卓浩</a>
            <a href="https://beian.miit.gov.cn">鲁ICP备19033198号</a>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/vue';
import {
  Bars3Icon,
  BellIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  Squares2X2Icon,
  WalletIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import {
  DocumentMagnifyingGlassIcon as DocumentMagnifyingGlassSolid,
  HomeIcon as HomeSolid,
  Squares2X2Icon as Square2X2Solid,
} from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import VNavItem from '@/components/VNavItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import AV from 'leancloud-storage/live-query';
import {
  expireFreeIn, expireIn7Days, isSubActive, isTrailFromUser,
} from '@/pages/composable/useSubscription';
import dayjs from 'dayjs';

const editName = ref('我的辩论赛');

const navigation = ref([
  {
    name: '读读论文',
    href: '/pdf',
    current: false,
    iconId: 0,
    icon: HomeIcon,
    iconSolid: HomeSolid,
  },
  {
    name: '个人课表',
    href: '/',
    current: true,
    iconId: 0,
    icon: HomeIcon,
    iconSolid: HomeSolid,
  },
  {
    name: '多人对比课表',
    href: '/compare',
    current: false,
    iconId: 1,
    icon: Squares2X2Icon,
    iconSolid: Square2X2Solid,
  },
]);

const userNavigation = reactive({
  data: [
    { name: 'Your Profile', href: '#' },
    { name: '登出', href: '#' },
  ],
});

const router = useRouter();

const gotoLogin = () => {
  router.push('/auth/login');
};

const user = reactive({
  nickname: '12o3ui128sflakfjsdl',
  headimgurl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
});

const route = useRoute();

const refreshNavbar = () => {
  navigation.value = navigation.value.map((item) => {
    const item1 = cloneDeep(item);

    item1.current = route.path.startsWith(item1.href);
    if(route.path.length>1 && item1.href === '/') {
      item1.current = false;
    }

    return item1;
  });
};

watch(route, () => {
  refreshNavbar();
});

const availableUntil = ref('');

onMounted(async () => {
  refreshNavbar();

  const realUser = AV.User.current();

  if (realUser) {
    // await realUser.fetch();
    user.headimgurl = realUser.get('headimgurl');
    user.nickname = realUser.get('nickname');
    userNavigation.data[0] = {
      name: `微信：${realUser.get('nickname')}`,
      href: '#',
    };
    availableUntil.value = dayjs(realUser.get('subscribeAvailableUntil')).format('YYYY年MM月DD日');
  }
});

const subText = computed(() => {
  if (isTrailFromUser()) {
    if (!isSubActive()) {
      return '体验版已过期';
    }

    return `体验版${expireFreeIn()}`;
  }
  if (!isSubActive()) {
    return '已过期';
  }

  const result = dayjs(AV.User.current()
    .get('subscribeAvailableUntil')).diff(dayjs(), 'day');

  if (result > 7) return '订阅有效';

  return `${result}天内过期`;
});
</script>
