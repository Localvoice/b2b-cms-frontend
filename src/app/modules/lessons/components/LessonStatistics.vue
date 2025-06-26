<template>
  <v-row class="w-full mb-8">
    <v-col cols="12" md="6" lg="3" v-for="stats in lessonStatistics" :key="stats.id">
      <StatsTile
        :heading="stats.heading"
        :text="stats.text"
        :iconUrl="stats.iconUrl"
        :percentageDifference="stats.percentageDifference"
      />
    </v-col>
  </v-row>
  <v-card class="pa-4 h-full d-flex flex-column" border rounded="lg">
    <v-row align="center" justify="space-between" class="mb-8">
      <v-col cols="auto">
        <h5>Ilość studentów</h5>
      </v-col>
      <v-col cols="auto">
        <v-select
          class="select"
          :items="['Ten miesiąc', 'Ten rok']"
          :value="'Ten miesiąc'"
          density="compact"
          bg-color="white"
          rounded
        >
        </v-select>
      </v-col>
    </v-row>
    <div class="mb-8">
      <AreaChart :series="chartStatistics" />
    </div>
    <h4 class="mb-8">Lista studentów</h4>
    <StudentsTable />
  </v-card>
</template>

<script setup lang="ts">
import StatsTile from '~app/shared/stats/StatsTile.vue';
import { lessonStatistics, chartStatistics } from '../dummyData/stats';
import AreaChart from '~app/modules/stats/components/AreaChart.vue';
import StudentsTable from './StudentsTable.vue';
</script>

<style lang="scss" scoped>
.select {
  min-width: 220px;
}
</style>
