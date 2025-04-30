<template>
  <v-app>
    <LayoutLoader />
  </v-app>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const LayoutLoader = defineAsyncComponent(() => import(/* webpackChunkName: "layout" */ '@/app/layout/loader.vue'));
</script>
