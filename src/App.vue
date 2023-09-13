<template>
  <Metainfo>
    <template #title="{ content }">
      {{ content ? `${content} | ${siteName}` : siteName }}
    </template>
  </Metainfo>
  <RouterView />
</template>

<script setup>
import { useMeta } from 'vue-meta';

const siteName = 'UCAS帮帮忙';

</script>
