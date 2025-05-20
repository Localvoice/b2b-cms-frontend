<template>
  <Card>
    <v-row align="center" justify="space-between" class="w-full mb-8">
      <v-col cols="auto">
        <h4>Statystki</h4>
      </v-col>
      <v-col cols="auto">
        <v-select
          :items="['Ten miesiąc', 'Ten rok']"
          density="compact"
          v-model="statsRange"
          bg-color="white"
          rounded
          border
          class="select"
        ></v-select>
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
    <v-row>
      <v-col cols="12" md="6" lg="7">
        <v-card class="pa-4 h-full d-flex flex-column" border rounded="lg">
          <div class="d-flex align-center justify-space-between">
            <div class="mr-4">
              <p class="muted-text mb-1">Łączny przychód w tym miesiącu</p>
              <h5>12 361 zł</h5>
            </div>
            <img :src="MoneyIcon" alt="lessons-icon" />
          </div>
          <div class="mt-auto">
            <AreaChart :series="income" />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="5">
        <v-card class="pa-4 w-full mb-4" border rounded="lg">
          <v-row align="center" class="w-full">
            <v-col cols="12" lg="7">
              <p class="muted-text mb-2">Typy lekcji</p>
              <h5 class="mb-2">Nauka wymowy pojawia się 2 razy częściej</h5>
              <p class="muted-text">Lekcji nauk wymowy było w sumie 20, a lekcji gramatyki 10.</p>
            </v-col>
            <v-col cols="12" lg="5">
              <div class="d-flex align-center">
                <div class="mr-2">
                  <DonutChart :series="[80, 20]" :labels="['Nauka Wymowy', 'Gramatyka']" :width="120" :height="120" />
                </div>
                <div>
                  <div class="d-flex align-center mb-4">
                    <div class="green-dot mr-2"></div>
                    <p class="muted-text">Gramatyka</p>
                  </div>
                  <div class="d-flex align-center">
                    <div class="blue-dot mr-2"></div>
                    <p class="muted-text">Nauka wymowy</p>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="no-shadow w-full pa-4 mb-4" border rounded="lg">
          <v-row align="center" class="w-full">
            <v-col cols="auto" lg="3">
              <img class="mr-4" :src="CourseImage" alt="course-icon" />
            </v-col>
            <v-col cols="auto" lg="9">
              <p class="muted-text mb-2">Najpopularniejsza lekcja</p>
              <h5 class="mb-2">Wsiadanie, bilety, przesiadki - rozmówki w autobusie</h5>
              <p class="muted-text mb-2">Tą lekcję obejrzało w sumie 112 studentów!</p>
              <div class="d-flex">
                <v-icon icon="mdi-arrow-up" class="arrow-up"></v-icon>
                <p class="percent-text me-2">40%</p>
                <p class="muted-text">vs zeszły miesiąc</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="no-shadow w-full pa-4" border rounded="lg">
          <v-row align="center" class="w-full">
            <v-col cols="auto" lg="3">
              <img class="mr-4" :src="CourseImage" alt="course-icon" />
            </v-col>
            <v-col cols="auto" lg="9">
              <p class="muted-text mb-2">Najpopularniejszy kurs</p>
              <h5 class="mb-2">Wsiadanie, bilety, przesiadki - rozmówki w autobusie</h5>
              <p class="muted-text mb-2">Na ten kurs zapisało się w sumie 220 studentów.</p>
              <div class="d-flex">
                <v-icon icon="mdi-arrow-up" class="arrow-up"></v-icon>
                <p class="percent-text me-2">40%</p>
                <p class="muted-text">vs zeszły miesiąc</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </Card>
</template>

<script setup lang="ts">
import Card from '~app/shared/base/Card.vue';
import StatsTile from '~app/shared/stats/StatsTile.vue';
import { overviewStats } from '../dummyData/overviewStats';
import MoneyIcon from '../../../../assets/images/money-icon-block.png';
import CourseImage from '../../../../assets/images/course-image.png';
import DonutChart from '../components/DonutChart.vue';
import AreaChart from '../components/AreaChart.vue';
import { ref } from 'vue';
import { income } from '../dummyData/incomeChart';

const statsRange = ref('Ten miesiąc');
</script>

<style lang="scss">
.select .v-field__outline {
  display: none;
}
.select .v-field {
  border: 1px solid #f2f0ff;
}
.muted-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
.green-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #05c22d;
}
.blue-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2a61d9;
}
.arrow-up {
  color: #05c22d;
  font-size: 18px;
}
.percent-text {
  color: #3b4471;
  font-weight: 600;
  font-size: 13px;
}
</style>
