<template>
  <Card>
    <h4 class="mb-8">Statystyki Twoich kursów</h4>
    <v-row class="w-full mb-8">
      <v-col cols="12" md="6" lg="3" v-for="stats in overviewStats" :key="stats.id">
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
            <img class="mr-2" :src="PopularCourseIcon" alt="course-icon" />
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
import FiltersDialog from '../../dashboard/components/FiltersDialog.vue';
import Table from '../../dashboard/components/Table.vue';
import { coursesListActions } from '../../dashboard/store';
import { useStore } from 'vuex';
import { overviewStats } from '../dummyData/overviewStats';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PopularCourseIcon from '../../../../assets/images/popular-course-icon-block.png';
import AddLessonDialog from '../components/AddLessonDialog.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const fetchLessonsList = () => store.dispatch(coursesListActions.fetchLessonsList, { pagination: 1 });
const setActiveView = (activeView) => store.dispatch(coursesListActions.setActiveView, { activeView });

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
