<template>
  <Card>
    <h4 class="mb-8">Statystyki Twoich kursów</h4>
    <v-row class="w-full mb-8">
      <v-col cols="12" md="6" lg="3" v-for="stats in lessonsStatistics" :key="stats.id">
        <StatsTile
          :heading="stats.heading"
          :text="stats.text"
          :iconUrl="stats.iconUrl"
          :percentageDifference="stats.percentageDifference"
        />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card class="no-shadow pa-4" border rounded="lg">
          <p class="stat-header mb-4">Najpopularniejsza lekcja</p>
          <div class="d-flex align-center w-full">
            <img class="mr-2" src="/images/course-icon-block.png" alt="course-icon" />
            <h6>Wsiadanie, bilety, przesiadki - rozmówki w autobusie</h6>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="w-full mb-3" justify="space-between" align="center">
      <v-col>
        <h4>Twoje lekcje</h4>
      </v-col>
      <v-col class="d-flex align-center justify-end">
        <FiltersDialog />
        <div class="mr-2">
          <Search />
        </div>
        <AddLessonDialog />
      </v-col>
    </v-row>
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
import Table from '../components/Table.vue';
import { platformActions } from '../store';
import { useStore } from 'vuex';
import { lessonsStatistics } from '../dummyData/stats';
import { onMounted } from 'vue';
import AddLessonDialog from '../components/AddLessonDialog.vue';
import Pagination from '../components/Pagination.vue';
import { ActiveView } from '../store/types';

const store = useStore();

const fetchLessonsList = () => store.dispatch(platformActions.fetchLessonsList);
const setActiveView = (activeView: ActiveView) => store.dispatch(platformActions.setActiveView, { activeView });

onMounted(() => {
  fetchLessonsList();
  setActiveView('lessons');
});
</script>

<style lang="scss">
.stat-header {
  color: #6b708a;
  font-size: 14px;
  font-weight: 600;
}
</style>
