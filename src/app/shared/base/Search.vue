<template>
  <v-sheet :class="['d-flex', { border: activeSearch }]" rounded="lg" :width="activeSearch ? '300' : 'auto'">
    <v-text-field
      ref="inputRef"
      variant="plain"
      density="compact"
      placeholder="Wyszukaj"
      class="px-3"
      hide-details
      v-if="activeSearch"
    ></v-text-field>
    <v-btn
      :icon="activeSearch ? 'mdi-close' : 'mdi-magnify'"
      :variant="activeSearch ? 'plain' : 'outlined'"
      rounded="md"
      class="search-btn"
      size="small"
      @click="activeSearch = !activeSearch"
    ></v-btn>
  </v-sheet>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const activeSearch = ref(false);
const inputRef = ref(null);

watch(activeSearch, async (newActiveSearch) => {
  if (newActiveSearch) {
    await nextTick();
    inputRef.value.focus();
  }
});
</script>

<style lang="scss">
.search-btn {
  border-color: #f2f0ff;
  color: #fe5b14;
  font-size: 16px;
}
</style>
