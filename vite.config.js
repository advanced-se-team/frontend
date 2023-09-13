/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Components from 'unplugin-vue-components/vite';
import Layouts from 'vite-plugin-vue-layouts';
import AutoImport from 'unplugin-auto-import/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import externalGlobals from 'rollup-plugin-external-globals';
import EnhanceLog from 'vite-plugin-enhance-log';
import seoPrerender from 'vite-plugin-seo-prerender';

const productionPlugins = process.env.NODE_ENV === 'production' ? [
] : [
  EnhanceLog({
    splitBy: ';',
    preTip: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
  }),
];

export default defineConfig({
  server:{
    port: 8008
    ,
  },
  build: {
    target: ['edge90', 'chrome90', 'firefox90', 'safari15'],

    // sourcemap: true,
    rollupOptions: {
      external: [
        'video.js',
        'leancloud-storage/live-query',
      ],
      plugins: [
        externalGlobals({
          'video.js': 'videojs',
          'leancloud-storage/live-query': 'AV',
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    visualizer({
      emitFile: false,
      file: 'states.html',
      open: true,
    }),
    Pages({
      exclude: ['**/components/*.vue'],
    }),
    Layouts(),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true,
      },
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
    ...productionPlugins,
  ],
});
