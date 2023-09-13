<script setup>
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';
import VSubLock from '@/components/VSubLock.vue';
import VProTag from '@/components/VProTag.vue';
import { useThrottleFn } from '@vueuse/core';
import { toNumber, toString } from 'lodash-es';
import AV from 'leancloud-storage/live-query';
import { useRouter } from 'vue-router';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits(['submit', 'close']);

const basicInfo = reactive({
  data: {
    name: '',
    founderName: '',
    monthRange: [],
  },
});

const router = useRouter();

watch(props, () => {
  if (AV.User.current() === null) {
    router.push('/auth/login?re=1');
  }
});

const createForm = ref(null);

const rules = reactive({
  name: [
    {
      required: true, message: '赛事名必填', type: 'error', trigger: 'blur',
    },
    {
      validator: (val) => val.length >= 5, message: '名称过短！', type: 'error', trigger: 'blur',
    },
    {
      validator: (val) => toString(toNumber(val)) !== val, message: '请勿输入纯数字！', type: 'error', trigger: 'blur',
    },
  ],
  founderName: [
    {
      required: true, message: '主办方必填', type: 'error', trigger: 'blur',
    },
    {
      validator: (val) => val.length >= 3, message: '名称过短！', type: 'error', trigger: 'blur',
    },
    {
      validator: (val) => toString(toNumber(val)) !== val, message: '请勿输入纯数字！', type: 'error', trigger: 'blur',
    },
  ],
  monthRange: [
    { required: true, message: '赛事举办周期必填', type: 'error' },
  ],
});

const isDisabled = ref(false);

const formSubmit = useThrottleFn((value) => {
  if (value.validateResult === true) {
    console.log(basicInfo);
    emit('submit', basicInfo.data);
    isDisabled.value = true;
  } else {
    return false;
  }

  return true;
}, 2000);
</script>

<template>
  <TransitionRoot :show="isVisible"
                  as="template"
  >
    <Dialog as="div"
            class="relative z-10"
            @close="emit('close')"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6"
            >
              <!-- 🖥 Modal内部 -->
              <!-- 🖥 modal标题 -->
              <div class="pb-2 text-center">
                <DialogTitle
                  as="h1"
                  class="text-xl leading-6 text-gray-900 text-serif"
                >
                  创建赛事
                </DialogTitle>
                <div class="mt-2 text-sm text-gray-500">
                  录入赛事基础信息
                </div>
              </div>
              <!-- !🖥 -->
              <div class="p-2 text-center shadow-inner bg-gray-100 rounded-md">
                提示：您也可以在“我的辩论赛”页面中修改您此前创建的赛事
              </div>
              <div
                class="pt-6"
              >
                <TForm ref="createForm"
                       :data="basicInfo.data"
                       :rules="rules"
                       @submit="formSubmit"
                >
                  <TFormItem label="赛事名称"
                             name="name"
                  >
                    <TInput
                      id="competition"
                      v-model="basicInfo.data.name"
                      aria-describedby="competition-description"
                      name="competition"
                      placeholder="XX大学 第X届 XX辩论赛"
                      type="text"
                    />
                  </TFormItem>
                  <TFormItem label="赛事主办方"
                             name="founderName"
                  >
                    <TInput
                      id="competition"
                      v-model="basicInfo.data.founderName"
                      aria-describedby="competition-description"
                      name="competition"
                      placeholder="共青团XXXX大学委员会"
                      type="text"
                    />
                  </TFormItem>
                  <TFormItem label="举办周期"
                             name="monthRange"
                  >
                    <TDateRangePicker
                      v-model="basicInfo.data.monthRange"
                      mode="month"
                    />
                  </TFormItem>
                  <TFormItem help="赛事默认公开。如果您是企业内部赛事，可以将其在这里隐藏（专业版特供功能）"
                             label="私密赛事"
                             name="hidden"
                  >
                    <VSubLock category="专业版">
                      <div class="flex items-center space-x-2">
                        <TSwitch v-model="basicInfo.data.hidden"
                                 size="large"
                        >
                          <template #label="slotProps">
                            <template v-if="slotProps.value">
                              隐藏
                            </template>
                            <template v-else>
                              公开
                            </template>
                          </template>
                        </TSwitch>
                        <VProTag />
                      </div>
                    </VSubLock>
                  </TFormItem>

                  <div class="mt-5 sm:mt-6">
                    <TButton
                      :loading="isDisabled"
                      class="w-full"
                      type="submit"
                    >
                      <DocumentPlusIcon class="mr-1 h-5 w-5" />
                      创建
                    </TButton>
                  </div>
                </TForm>
              </div>
              <!-- 🖥 Form -->
              <!-- !🖥 -->
              <!-- !🖥 -->
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped>

</style>
