<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '~app/shared/components';

export default defineComponent({
  name: 'App',
  metaInfo() {
    return {
      title: 'Learn Your People',
      titleTemplate: '%s | Localvoice'
    };
  }
});
</script>

<style scoped>
.container {
  max-width: 1385px !important;
}
</style>
