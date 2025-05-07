<template>
  <v-main app class="main-wrapper">
    <div v-if="showNavigation">
      <Appbar />
    </div>
    <v-container class="pa-8">
      <router-view />
    </v-container>
  </v-main>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Appbar from '~app/navigation/components/Appbar.vue';
const route = useRoute();

const showNavigation = computed(() => !route.meta.hideNavigation);
</script>

<style lang="scss">
.v-main__wrap {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.main-wrapper {
  background-color: #f9f9fb;
  height: 100%;
  min-height: 100vh;
}
</style>
