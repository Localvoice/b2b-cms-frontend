<template>
  <v-table class="w-full" rounded="lg">
    <thead>
      <tr>
        <th class="text-left">KURS</th>
        <th class="text-left">
          <div class="d-flex align-center">
            <span class="mr-1">LEKCJE</span>
            <v-btn icon="mdi-swap-vertical" variant="plain" size="x-small"></v-btn>
          </div>
        </th>
        <th class="text-left">
          <div class="d-flex align-center">
            <span class="mr-1">POZIOM</span>
            <v-btn icon="mdi-swap-vertical" variant="plain" size="x-small"></v-btn>
          </div>
        </th>
        <th class="text-left">KATEGORIA</th>
        <th class="text-left">
          <div class="d-flex align-center">
            <span class="mr-1">PLAN</span>
            <v-btn icon="mdi-swap-vertical" variant="plain" size="x-small"></v-btn>
          </div>
        </th>
        <th class="text-left">
          <div class="d-flex align-center">
            <span class="mr-1">WERSJA</span>
            <v-btn icon="mdi-swap-vertical" variant="plain" size="x-small"></v-btn>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="course in courses" :key="course.id">
        <td>
          <div>
            <router-link to="/app/courses/course-id" class="d-inline-block">
              <h6 class="table-text">{{ course.title }}</h6>
            </router-link>
          </div>
        </td>
        <td>
          <p class="table-text">{{ course.lessonsCount }}</p>
        </td>
        <td>
          <div class="d-flex align-center">
            <v-icon :class="`text-${difficulty[course.level].color} mr-2`" icon="mdi-poll" size="x-small"></v-icon>
            <span class="table-text">
              {{ difficulty[course.level].label }}
            </span>
          </div>
        </td>
        <td>
          <v-tooltip :text="course.category" location="bottom">
            <template v-slot:activator="{ props }">
              <v-chip size="small" color="pink" v-bind="props">{{ truncate(course.category) }}</v-chip>
            </template>
          </v-tooltip>
        </td>
        <td>
          <v-chip size="small" :color="course.isPremium ? 'purple' : 'grey'">
            <v-icon v-if="course.isPremium" class="text-warning mr-1" icon="mdi-seal" size="medium"></v-icon>
            {{ course.isPremium ? 'Premium' : 'Darmowy' }}
          </v-chip>
        </td>
        <td>
          <div class="d-flex align-center">
            <p class="table-text">{{ course.version }}</p>
            <v-btn class="ml-auto" variant="plain" icon="mdi-dots-horizontal" size="x-small"></v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { coursesListGetters } from '../store';
import { computed } from 'vue';

const store = useStore();
const difficulty = {
  easy: { label: 'Łatwy', color: 'success' },
  medium: { label: 'Średni', color: 'warning' },
  hard: { label: 'Trudny', color: 'error' }
};
const courses = computed(() => store.getters[coursesListGetters.getCoursesList]);

const truncate = (text: string, maxLength = 10) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
</script>

<style lang="scss">
thead {
  background-color: #f9f9fb;
}
th {
  text-transform: uppercase;
  color: #161d40;
  font-weight: 600 !important;
  font-size: 12px;
}
td {
  padding: 16px !important;
}
.table-text {
  color: #3b4471;
  font-weight: 600;
  font-size: 13px;
}
</style>
