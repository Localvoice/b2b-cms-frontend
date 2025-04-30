<template>
  <DataContainer />
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { layoutGetters } from './store';
import DataContainer from './components/DataContainer.vue';

const store = useStore();
const layoutState = computed(() => layoutGetters.getState(store));
</script>
