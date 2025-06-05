<template>
  <v-dialog max-width="550" :activator="btn">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        :variant="filtersCount > 0 ? 'tonal' : 'outlined'"
        :color="filtersCount > 0 ? 'purple' : 'gray'"
        prepend-icon="mdi-filter-outline"
        class="outlined-btn mr-3"
      >
        Filtry
        <span v-if="filtersCount > 0">(aktywne {{ filtersCount }})</span>
        <v-btn
          v-if="filtersCount > 0"
          density="compact"
          variant="plain"
          icon="mdi-close"
          size="small"
          class="ml-1"
          @click="clearFilters"
        ></v-btn>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="dialog-card pa-8">
        <form @submit.prevent="applyFilters">
          <v-row class="w-full mb-8" justify="space-between" align="center">
            <v-col cols="auto" class="pa-0">
              <v-card-title class="dialog-title">Filtry</v-card-title>
            </v-col>
            <v-col cols="auto" class="pa-0">
              <v-btn icon="mdi-close" size="small" rounded="lg" @click="isActive.value = false"></v-btn>
            </v-col>
          </v-row>
          <p class="filter-label mb-3">Kategoria</p>
          <v-row class="w-full row">
            <v-chip
              :key="category"
              v-for="category in categories"
              :color="filters.category.includes(category) ? 'purple' : 'white'"
              :variant="!filters.category.includes(category) ? 'elevated' : 'tonal'"
            >
              <v-checkbox
                v-model="filters.category"
                :color="filters.category.includes(category) ? 'purple' : 'gray'"
                density="compact"
                hide-details
                :label="category"
                :value="category"
              ></v-checkbox>
            </v-chip>
          </v-row>
          <p class="filter-label mb-3">Poziom trudności</p>
          <v-row class="w-full row">
            <v-chip
              :key="proficiencyLevel"
              v-for="proficiencyLevel in proficiencyLevels"
              :color="filters.proficiencyLevel.includes(proficiencyLevel) ? 'purple' : 'white'"
              :variant="!filters.proficiencyLevel.includes(proficiencyLevel) ? 'elevated' : 'tonal'"
            >
              <v-checkbox
                v-model="filters.proficiencyLevel"
                :color="filters.proficiencyLevel.includes(proficiencyLevel) ? 'purple' : 'gray'"
                density="compact"
                hide-details
                :label="proficiencyLevel"
                :value="proficiencyLevel"
              ></v-checkbox>
            </v-chip>
          </v-row>
          <p class="filter-label mb-3">Typ lekcji</p>
          <v-row class="w-full row">
            <v-chip
              :key="type"
              v-for="type in contentTypes"
              :color="filters.contentType.includes(type) ? 'purple' : 'white'"
              :variant="!filters.contentType.includes(type) ? 'elevated' : 'tonal'"
            >
              <v-checkbox
                v-model="filters.contentType"
                :color="filters.contentType.includes(type) ? 'purple' : 'gray'"
                density="compact"
                hide-details
                :label="type"
                :value="type"
              ></v-checkbox>
            </v-chip>
          </v-row>
          <p class="filter-label mb-3">Typ subskrypcji</p>
          <v-row class="w-full row">
            <v-chip
              :key="subscription"
              v-for="subscription in subscriptionModels"
              :color="filters.subscriptionModel.includes(subscription) ? 'purple' : 'white'"
              :variant="!filters.subscriptionModel.includes(subscription) ? 'elevated' : 'tonal'"
            >
              <v-checkbox
                v-model="filters.subscriptionModel"
                :color="filters.subscriptionModel.includes(subscription) ? 'purple' : 'gray'"
                density="compact"
                hide-details
                :label="subscriptionModelMatcher[subscription]"
                :value="subscription"
              ></v-checkbox>
            </v-chip>
          </v-row>
          <p class="filter-label mb-3">Status</p>
          <v-row class="w-full row">
            <v-chip
              :key="status"
              v-for="status in statusTypes"
              :color="filters.status.includes(status) ? 'purple' : 'white'"
              :variant="!filters.status.includes(status) ? 'elevated' : 'tonal'"
            >
              <v-checkbox
                v-model="filters.status"
                :color="filters.status.includes(status) ? 'purple' : 'gray'"
                density="compact"
                hide-details
                :label="statusTypeMatcher[status]"
                :value="status"
              ></v-checkbox>
            </v-chip>
          </v-row>
          <v-row class="w-full" justify="space-between" align="center">
            <v-col cols="auto">
              <p class="filter-label">Pokaż tylko najnowsze wersje</p>
            </v-col>
            <v-col cols="auto">
              <v-switch color="purple" v-model="filters.latestVersions" hide-details></v-switch>
            </v-col>
          </v-row>
          <v-btn type="submit" class="w-full confirm-btn mt-4" rounded @click="isActive.value = false">
            Zastosuj filtry
            <span v-if="filtersCount > 0">({{ filtersCount }})</span>
          </v-btn>
        </form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue';
import CourseModel from '../models/course';
import { getUniqueCategories } from '../dummyData/categories';
import { getUniqueContentTypes } from '../dummyData/contentTypes';
import { useStore } from 'vuex';
import { coursesListActions, DataFilters } from '../store';

const store = useStore();
const categories = getUniqueCategories();
const contentTypes = getUniqueContentTypes();

const applyFiltersAction = (filters: DataFilters) => store.dispatch(coursesListActions.applyFilters, { filters });
const clearFiltersAction = () => store.dispatch(coursesListActions.clearFilters);

const initialFilters = {
  category: [],
  proficiencyLevel: [],
  contentType: [],
  subscriptionModel: [],
  status: [],
  latestVersions: true
};

const filtersCount = ref(0);
const subscriptionModels = ['FREE', 'PREMIUM'];
const statusTypes = ['ACTIVE', 'INACTIVE'];
const proficiencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const subscriptionModelMatcher = {
  FREE: 'Darmowy',
  PREMIUM: 'Premium'
};

const statusTypeMatcher = {
  ACTIVE: 'Opublikowane',
  INACTIVE: 'Testowane'
};

const filters = reactive({
  ...initialFilters
});

watch(filters, (newFilters) => {
  filtersCount.value = Object.values(newFilters).reduce((acc, filter) => {
    if (typeof filter === 'boolean') return acc;
    if (Array.isArray(filter) && filter.length > 0) return acc + 1;
    if (filter !== null && !Array.isArray(filter)) return acc + 1;
    return acc;
  }, 0);
});

const clearFilters = (e: Event) => {
  e.stopPropagation();
  Object.assign(filters, initialFilters);
  clearFiltersAction();
};

const applyFilters = () => {
  if (filtersCount.value > 0) {
    applyFiltersAction(filters);
  } else {
    clearFiltersAction();
  }
};
</script>

<style lang="scss">
.dialog-card {
  background-color: #f9f9fb;
}
.dialog-title {
  color: #161d40;
  font-weight: 700;
  font-size: 20px;
}
.filter-label {
  color: #161d40;
  font-weight: 700;
  font-size: 14px;
}
.v-selection-control .v-label {
  font-size: 13px;
}
.row {
  gap: 12px;
  margin-bottom: 24px !important;
}
.confirm-btn {
  background-color: #fe5b14;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
</style>
