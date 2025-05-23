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
          <v-radio-group v-model="filters.proficiencyLevel" hide-details>
            <v-row class="w-full mt-1 mb-4">
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="filters.proficiencyLevel === 'A1' ? 'purple' : 'white'"
                  :variant="filters.proficiencyLevel === 'A1' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="filters.proficiencyLevel === 'A1' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="A1"
                    value="A1"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="filters.proficiencyLevel === 'A2' ? 'purple' : 'white'"
                  :variant="filters.proficiencyLevel === 'A2' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="filters.proficiencyLevel === 'A2' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="A2"
                    value="A2"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="filters.proficiencyLevel === 'B1' ? 'purple' : 'white'"
                  :variant="filters.proficiencyLevel === 'B1' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="filters.proficiencyLevel === 'B1' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="B1"
                    value="B1"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="filters.proficiencyLevel === 'B2' ? 'purple' : 'white'"
                  :variant="filters.proficiencyLevel === 'B2' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="filters.proficiencyLevel === 'B2' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="B2"
                    value="B2"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="filters.proficiencyLevel === 'C1' ? 'purple' : 'white'"
                  :variant="filters.proficiencyLevel === 'C1' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="filters.proficiencyLevel === 'C1' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="C1"
                    value="C1"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="filters.proficiencyLevel === 'C2' ? 'purple' : 'white'"
                  :variant="filters.proficiencyLevel === 'C2' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="filters.proficiencyLevel === 'C2' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="C2"
                    value="C2"
                  ></v-radio>
                </v-chip>
              </v-col>
            </v-row>
          </v-radio-group>
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
                :label="status"
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

const categories = getUniqueCategories();
const contentTypes = getUniqueContentTypes();

const initialFilters = {
  category: [],
  proficiencyLevel: null,
  contentType: [],
  subscriptionModel: [],
  status: [],
  latestVersions: true
};

const filtersCount = ref(0);
const subscriptionModels = ['FREE', 'PREMIUM'];
const statusTypes = ['Opublikowane', 'Testowane', 'Robocze'];

const subscriptionModelMatcher = {
  FREE: 'Darmowy',
  PREMIUM: 'Premium'
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
};

const applyFilters = () => {
  console.log(filters);
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
