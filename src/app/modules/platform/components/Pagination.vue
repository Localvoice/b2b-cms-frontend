<template>
  <v-row class="w-full" justify="space-between" align="center">
    <v-col cols="auto">
      <div class="d-flex align-center">
        <p class="pagination-text mr-4">Rekordów na stronę</p>
        <v-select :items="['5', '10', '15']" density="compact" v-model="limit" bg-color="white" rounded class="select">
        </v-select>
      </div>
    </v-col>
    <v-col cols="auto" class="d-none d-sm-flex">
      <v-row align="center">
        <v-col cols="auto">
          <v-btn @click="goToPreviousPage" :disabled="!hasPrevPage" variant="outlined" class="outlined-btn"
            >Poprzednia strona</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <div class="d-flex align-center">
            <p class="pagination-text mr-2">Strona</p>
            <div class="active-page mr-2">{{ activePage }}</div>
            <p class="pagination-text">z {{ totalPages }}</p>
          </div>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="goToNextPage" :disabled="!hasNextPage" variant="outlined" class="outlined-btn"
            >Następna strona</v-btn
          >
        </v-col>
      </v-row>
    </v-col>
    <v-row class="d-flex d-sm-none w-full">
      <v-col cols="12" class="d-flex justify-center">
        <div class="d-flex align-center">
          <p class="pagination-text mr-2">Strona</p>
          <div class="active-page mr-2">{{ activePage }}</div>
          <p class="pagination-text">z {{ totalPages }}</p>
        </div>
      </v-col>
      <v-col cols="6">
        <v-btn @click="goToPreviousPage" :disabled="!hasPrevPage" variant="outlined" class="outlined-btn w-full"
          >Poprzednia strona</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn @click="goToNextPage" :disabled="!hasNextPage" variant="outlined" class="outlined-btn w-full"
          >Następna strona</v-btn
        >
      </v-col>
    </v-row>
  </v-row>
</template>

<script setup lang="ts">
import { platformActions, platformGetters } from '../store';
import { useStore } from 'vuex';
import { ref, computed, watch, onMounted } from 'vue';

const store = useStore();
const goToNextPage = () => store.dispatch(platformActions.goToNextPage);
const goToPreviousPage = () => store.dispatch(platformActions.goToPreviousPage);

const activePage = computed(() => store.getters[platformGetters.getActivePage]);
const totalPages = computed(() => store.getters[platformGetters.getTotalPages]);
const hasNextPage = computed(() => store.getters[platformGetters.hasNextPage]);
const hasPrevPage = computed(() => store.getters[platformGetters.hasPreviousPage]);
const resultsLimit = computed(() => store.getters[platformGetters.getResultsLimit]);

const setDisplayLimit = (limit: number) => store.dispatch(platformActions.setDisplayLimit, { limit });
const limit = ref('5');

watch(limit, (newLimit) => {
  setDisplayLimit(Number(newLimit));
});

onMounted(() => {
  limit.value = resultsLimit.value.toString();
});
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
.select {
  margin-top: 20px;
}
.select .v-field__outline {
  display: none;
}
.active-page {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #344054;
  background-color: #f9f9fb;
  border: 1px solid #f2f0ff;
}
</style>
