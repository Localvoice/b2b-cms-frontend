<template>
  <Card>
    <v-row justify="space-between" align="center" class="mb-4">
      <v-col>
        <h4>Statystki</h4>
      </v-col>
      <v-col class="d-flex justify-end">
        <router-link to="/" class="header-link">Pokaż wszystkie</router-link>
      </v-col>
    </v-row>
    <AlertNotification />
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
    <Pagination />
  </Card>
</template>

<script setup lang="ts">
import Card from '~app/shared/base/Card.vue';
import Search from '~app/shared/base/Search.vue';
import StatsTile from '~app/shared/stats/StatsTile.vue';
import FiltersDialog from '../components/FiltersDialog.vue';
import Pagination from '../components/Pagination.vue';
import Table from '../components/Table.vue';
import AlertNotification from '~app/shared/alerts/AlertNotification';
import { coursesListActions, coursesListGetters } from '../store';
import { useStore } from 'vuex';
import { overviewStats } from '../dummyData/overviewStats';
import { ref, watch, nextTick, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const fetchDashboardData = () => store.dispatch(coursesListActions.fetchDashboardData);
const setActiveView = (activeView: string) => store.dispatch(coursesListActions.setActiveView, { activeView });

const activeTab = ref(route.query.tab || 'courses');

const onTabChange = (newTab: string) => {
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
    if (typeof newTab === 'string') {
      setActiveView(newTab);
    }
  }
);

onMounted(() => {
  fetchDashboardData();
  if (route.query.tab) {
    setActiveView(route.query.tab.toString());
  } else {
    setActiveView('courses');
  }
});
</script>

<style lang="scss">
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
