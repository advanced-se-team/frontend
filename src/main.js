import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import AV from 'leancloud-storage/live-query';

// import TDesign from 'tdesign-vue-next';
import piniaStore from '@/stores';
import App from './App.vue';
import './index.css';

import 'tdesign-vue-next/es/style/index.css';
import './theme.css';
import './tweak.css';

import 'video.js/dist/video-js.css';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

AV.init({
  appId: import.meta.env.VITE_APP_LEANCLOUD_ID,
  appKey: import.meta.env.VITE_APP_LEANCLOUD_KEY,
  serverURL: import.meta.env.VITE_APP_LEANCLOUD_HOST,
});

if (import.meta.env.DEV) {
  AV.debug.enable();
  // AV.setProduction(false);
}

const app = createApp(App)
  .use(router)
  .use(piniaStore)
  .use(createMetaManager());

// .use(TDesign)

app.mount('#app');
