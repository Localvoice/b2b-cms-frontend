<template>
  <v-row class="w-full" justify="space-between" align="center">
    <v-col cols="auto">
      <v-btn @click="goToPreviousPage" :disabled="!hasPrevPage" variant="outlined" class="outlined-btn"
        >Poprzednia strona</v-btn
      >
    </v-col>
    <v-col cols="auto">
      <p class="pagination-text">Strona {{ activePage }} z {{ totalPages }}</p>
    </v-col>
    <v-col cols="auto">
      <v-btn @click="goToNextPage" :disabled="!hasNextPage" variant="outlined" class="outlined-btn"
        >Następna strona</v-btn
      >
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { coursesListActions, coursesListGetters } from '../store';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const goToNextPage = () => store.dispatch(coursesListActions.goToNextPage);
const goToPreviousPage = () => store.dispatch(coursesListActions.goToPreviousPage);

const activePage = computed(() => store.getters[coursesListGetters.getActivePage]);
const totalPages = computed(() => store.getters[coursesListGetters.getTotalPages]);
const hasNextPage = computed(() => store.getters[coursesListGetters.hasNextPage]);
const hasPrevPage = computed(() => store.getters[coursesListGetters.hasPreviousPage]);
</script>

<style lang="scss">
.outlined-btn {
  border-color: #f2f0ff;
  color: #6b708a;
  text-transform: initial;
  font-size: 13px;
  font-weight: 600;
}
.pagination-text {
  font-weight: 600;
  font-size: 14px;
  color: #6b708a;
}
</style>
