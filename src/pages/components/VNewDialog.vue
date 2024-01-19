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
    reason: '',
    week: ''
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
  reason: [
    {
      required: true, message: '事由必填', type: 'error', trigger: 'blur',
    },
  ],
  week: [
    {
      required: true, message: '周次必填', type: 'error', trigger: 'blur',
    },
  ],
});

const isDisabled = ref(false);

const formSubmit = useThrottleFn((value) => {
  if (value.validateResult === true) {
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
                  创建对比
                </DialogTitle>
                <div class="mt-2 text-sm text-gray-500">
                  发起一个对比
                </div>
              </div>
              <!-- !🖥 -->
              <div
                class="pt-6"
              >
                <TForm ref="createForm"
                       :data="basicInfo.data"
                       :rules="rules"
                       @submit="formSubmit"
                >
                  <TFormItem label="对比事由"
                             name="reason"
                  >
                    <TInput
                      id="reason"
                      v-model="basicInfo.data.reason"
                      name="reason"
                      placeholder="...会议"
                      type="text"
                    />
                  </TFormItem>
                  <TFormItem label="对比周次"
                             name="week"
                  >
                    <TInput
                      id="week"
                      v-model="basicInfo.data.week"
                      name="week"
                      type="number"
                    />
                  </TFormItem>

                  <div class="mt-5 sm:mt-6">
                    <TButton
                      :loading="isDisabled"
                      class="w-full"
                      type="submit"
                    >
                      <DocumentPlusIcon class="mr-1 h-5 w-5" />
                      发起
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
