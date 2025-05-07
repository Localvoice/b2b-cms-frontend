<template>
  <Card>
    <Header />
    <v-row class="w-full mb-8">
      <v-col cols="12" md="6" lg="3" v-for="stats in overviewStats" :key="stats.id">
        <StatsTile
          :heading="stats.heading"
          :text="stats.text"
          :iconUrl="stats.iconUrl"
          :percentageDifference="stats.percentageDifference"
        />
      </v-col>
    </v-row>
    <v-row class="w-full mb-3" justify="space-between" align="center">
      <v-col>
        <h4>Twoje treści</h4>
      </v-col>
      <v-col class="d-flex align-center justify-end">
        <v-btn variant="outlined" prepend-icon="mdi-filter-outline" class="outlined-btn mr-3">Filtry</v-btn>
        <v-btn icon="mdi-magnify" variant="outlined" rounded="md" class="search-btn" size="small"></v-btn>
      </v-col>
    </v-row>
    <v-tabs class="tabs mb-3 w-full" v-model="activeTab" @update:modelValue="onTabChange">
      <v-tab value="courses">Kursy</v-tab>
      <v-tab value="lessons">Lekcje</v-tab>
    </v-tabs>
    <div class="w-full mb-12">
      <Table :courses="courses" />
    </div>
    <v-row class="w-full" justify="space-between" align="center">
      <v-col cols="auto">
        <v-btn variant="outlined" class="outlined-btn">Poprzednia strona</v-btn>
      </v-col>
      <v-col cols="auto">
        <p class="pagination-text">Strona 1 z 10</p>
      </v-col>
      <v-col cols="auto">
        <v-btn variant="outlined" class="outlined-btn">Następna strona</v-btn>
      </v-col>
    </v-row>
  </Card>
</template>

<script setup>
import Card from '~app/shared/base/Card.vue';
import Header from './Header.vue';
import StatsTile from './StatsTile.vue';
import Table from './Table.vue';
import { overviewStats } from '../dummyData/overviewStats';
import { courses } from '../dummyData/courses';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const activeTab = ref(route.query.tab || 'courses');

const onTabChange = (newTab) => {
  router.replace({
    query: {
      ...route.query,
      tab: newTab
    }
  });
};

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab && newTab !== activeTab.value) {
      activeTab.value = newTab;
    }
  }
);
</script>

<style lang="scss">
.outlined-btn {
  border-color: #f2f0ff;
  color: #6b708a;
  text-transform: initial;
  font-size: 13px;
  font-weight: 600;
}
.search-btn {
  border-color: #f2f0ff;
  color: #fe5b14;
  font-size: 16px;
}
.pagination-text {
  font-weight: 600;
  font-size: 14px;
  color: #6b708a;
}
.tabs {
  border-bottom: 1px solid #f2f0ff;
}
.v-tab__slider {
  background-color: #7b62fe;
  height: 3px;
}
.v-slide-group__container .v-btn__content {
  font-weight: 600;
  font-size: 14px;
  color: #6b708a;
  text-transform: initial;
}
</style>
