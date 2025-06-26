<template>
  <v-row class="w-full mb-8">
    <v-col cols="12" md="6" lg="3" v-for="stats in coursesStatistics" :key="stats.id">
      <StatsTile
        :heading="stats.heading"
        :text="stats.text"
        :iconUrl="stats.iconUrl"
        :percentageDifference="stats.percentageDifference"
      />
    </v-col>
  </v-row>
  <v-row class="mb-8">
    <v-col cols="12" lg="8">
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
              rounded
              bg-color="white"
            >
            </v-select>
          </v-col>
        </v-row>
        <AreaChart :series="chartStatistics" />
      </v-card>
    </v-col>
    <v-col cols="12" lg="4">
      <v-card class="pa-4 h-full d-flex flex-column" border rounded="lg">
        <p class="muted-text mb-4">NAJPOPULARNIEJSZE LEKCJE W KURSIE</p>
        <div class="d-flex align-start justify-content-between w-full mb-4">
          <v-row>
            <v-col cols="auto">
              <img src="/images/course-icon-block.png" alt="course-icon" />
            </v-col>
            <v-col cols="auto">
              <h6>Pytania o trasę i kierunek</h6>
              <div class="d-flex">
                <div class="d-flex align-center mr-4">
                  <v-icon class="views-icon mr-1" icon="mdi-eye-outline"></v-icon>
                  <p class="muted-text">1247</p>
                </div>
                <div class="d-flex align-center">
                  <v-icon class="trophy-icon mr-1" icon="mdi-trophy-outline"></v-icon>
                  <p class="muted-text">72% ukończeń</p>
                </div>
              </div>
            </v-col>
          </v-row>
          <img src="/images/ranking-gold.png" alt="ranking-gold" />
        </div>
        <div class="d-flex align-start justify-content-between w-full mb-4">
          <v-row>
            <v-col cols="auto">
              <img src="/images/course-icon-block.png" alt="course-icon" />
            </v-col>
            <v-col cols="auto">
              <h6>Pytania o trasę i kierunek</h6>
              <div class="d-flex">
                <div class="d-flex align-center mr-4">
                  <v-icon class="views-icon mr-1" icon="mdi-eye-outline"></v-icon>
                  <p class="muted-text">1247</p>
                </div>
                <div class="d-flex align-center">
                  <v-icon class="trophy-icon mr-1" icon="mdi-trophy-outline"></v-icon>
                  <p class="muted-text">72% ukończeń</p>
                </div>
              </div>
            </v-col>
          </v-row>
          <img src="/images/ranking-silver.png" alt="ranking-silver" />
        </div>
        <div class="d-flex align-start justify-content-between w-full mb-4">
          <v-row>
            <v-col cols="auto">
              <img src="/images/course-icon-block.png" alt="course-icon" />
            </v-col>
            <v-col cols="auto">
              <h6>Pytania o trasę i kierunek</h6>
              <div class="d-flex">
                <div class="d-flex align-center mr-4">
                  <v-icon class="views-icon mr-1" icon="mdi-eye-outline"></v-icon>
                  <p class="muted-text">1247</p>
                </div>
                <div class="d-flex align-center">
                  <v-icon class="trophy-icon mr-1" icon="mdi-trophy-outline"></v-icon>
                  <p class="muted-text">72% ukończeń</p>
                </div>
              </div>
            </v-col>
          </v-row>
          <img src="/images/ranking-bronze.png" alt="ranking-bronze" />
        </div>
        <div class="d-flex align-start justify-content-between w-full mb-4">
          <v-row>
            <v-col cols="auto">
              <img src="/images/course-icon-block.png" alt="course-icon" />
            </v-col>
            <v-col cols="auto">
              <h6>Pytania o trasę i kierunek</h6>
              <div class="d-flex">
                <div class="d-flex align-center mr-4">
                  <v-icon class="views-icon mr-1" icon="mdi-eye-outline"></v-icon>
                  <p class="muted-text">1247</p>
                </div>
                <div class="d-flex align-center">
                  <v-icon class="trophy-icon mr-1" icon="mdi-trophy-outline"></v-icon>
                  <p class="muted-text">72% ukończeń</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <h4 class="mb-8">Lista studentów</h4>
  <StudentsTable />
</template>

<script setup lang="ts">
import StatsTile from '~app/shared/stats/StatsTile.vue';
import { coursesStatistics, chartStatistics } from '../dummyData/stats';
import AreaChart from '~app/modules/stats/components/AreaChart.vue';
import StudentsTable from './StudentsTable.vue';
</script>

<style lang="scss" scoped>
.select {
  min-width: 220px;
}
.views-icon {
  color: #7b62fe;
}
.trophy-icon {
  color: #fe5b14;
}
</style>
