<template>
  <Card>
    <v-row justify="space-between" align="center">
      <v-col>
        <h4>Statystki</h4>
      </v-col>
      <v-col class="d-flex justify-end">
        <router-link to="/" class="header-link">Pokaż wszystkie</router-link>
      </v-col>
    </v-row>
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
        <div class="mr-2">
          <Search />
        </div>
        <FiltersDialog />
      </v-col>
    </v-row>
    <v-tabs class="tabs mb-3 w-full" v-model="activeTab" @update:modelValue="onTabChange">
      <v-tab value="courses">Kursy</v-tab>
      <v-tab value="lessons">Lekcje</v-tab>
    </v-tabs>
    <div class="w-full mb-12">
      <Table />
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
import Search from '~app/shared/base/Search.vue';
import StatsTile from '~app/shared/stats/StatsTile.vue';
import FiltersDialog from '../components/FiltersDialog.vue';
import Table from '../components/Table.vue';
import { coursesListActions } from '../store';
import { useStore } from 'vuex';
import { overviewStats } from '../dummyData/overviewStats';
import { ref, watch, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const fetchCoursesList = () => store.dispatch(coursesListActions.fetchCoursesList, { pagination: 1 });

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

onMounted(() => {
  fetchCoursesList();
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
.header-link {
  color: #fe5b14;
  font-weight: 600;
  font-size: 14px;
}
</style>
