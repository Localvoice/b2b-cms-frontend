<template>
  <v-table class="w-full" rounded="lg">
    <thead v-if="activeView === 'courses'">
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
    <thead v-if="activeView === 'lessons'">
      <tr>
        <th class="text-left">KURS</th>
        <th class="text-left">
          <div class="d-flex align-center">
            <span class="mr-1">TYP</span>
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
    <tbody v-if="activeView === 'courses'">
      <tr v-for="course in courses" :key="course.id">
        <td>
          <div>
            <router-link to="/app/courses/course-id" class="d-inline-block">
              <h6 class="table-text">{{ course.title }}</h6>
            </router-link>
          </div>
        </td>
        <td>
          <p class="table-text">0</p>
        </td>
        <td>
          <div class="d-flex align-center">
            <v-icon
              :class="`text-${proficiencyLevelMatcher[course.proficiencyLevel].color} mr-2`"
              icon="mdi-poll"
              size="x-small"
            ></v-icon>
            <span class="table-text">
              {{ proficiencyLevelMatcher[course.proficiencyLevel].label }}
            </span>
          </div>
        </td>
        <td>
          <v-tooltip :text="course.categories[0]" location="bottom">
            <template v-slot:activator="{ props }">
              <v-chip size="small" color="pink" v-bind="props">{{ truncate(course.categories[0]) }}</v-chip>
            </template>
          </v-tooltip>
        </td>
        <td>
          <v-chip size="small" :color="subscriptionModelMatcher[course.subscriptionModel].color">
            <v-icon
              v-if="course.subscriptionModel === 'PREMIUM'"
              class="text-warning mr-1"
              icon="mdi-seal"
              size="medium"
            ></v-icon>
            {{ subscriptionModelMatcher[course.subscriptionModel].label }}
          </v-chip>
        </td>
        <td>
          <div class="d-flex align-center">
            <p class="table-text">1.1</p>
            <v-btn class="ml-auto" variant="plain" icon="mdi-dots-horizontal" size="x-small"></v-btn>
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-if="activeView === 'lessons'">
      <tr v-for="lesson in lessons" :key="lesson.id">
        <td>
          <div>
            <router-link to="/app/lessons/lesson-id" class="d-inline-block">
              <h6 class="table-text">{{ lesson.title }}</h6>
            </router-link>
          </div>
        </td>
        <td>
          <p class="table-text">{{ lesson.type }}</p>
        </td>
        <td>
          <div class="d-flex align-center">
            <v-icon :class="`text-${difficulty[lesson.level].color} mr-2`" icon="mdi-poll" size="x-small"></v-icon>
            <span class="table-text">
              {{ difficulty[lesson.level].label }}
            </span>
          </div>
        </td>
        <td>
          <v-tooltip :text="lesson.category" location="bottom">
            <template v-slot:activator="{ props }">
              <v-chip size="small" color="pink" v-bind="props">{{ truncate(lesson.category) }}</v-chip>
            </template>
          </v-tooltip>
        </td>
        <td>
          <v-chip size="small" :color="lesson.isPremium ? 'purple' : 'grey'">
            <v-icon v-if="lesson.isPremium" class="text-warning mr-1" icon="mdi-seal" size="medium"></v-icon>
            {{ lesson.isPremium ? 'Premium' : 'Darmowy' }}
          </v-chip>
        </td>
        <td>
          <div class="d-flex align-center">
            <p class="table-text">{{ lesson.version }}</p>
            <v-btn class="ml-auto" variant="plain" icon="mdi-dots-horizontal" size="x-small"></v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { coursesListGetters, coursesListActions } from '../store';
import { computed } from 'vue';

const store = useStore();
const proficiencyLevelMatcher = {
  A1: { label: 'Łatwy', color: 'success' },
  A2: { label: 'Łatwy', color: 'success' },
  B1: { label: 'Średni', color: 'warning' },
  B2: { label: 'Średni', color: 'warning' },
  C1: { label: 'Trudny', color: 'error' },
  C2: { label: 'Trudny', color: 'error' }
};
const subscriptionModelMatcher = {
  FREE: { label: 'Darmowy', color: 'grey' },
  PARTIALLY_FREE: { label: 'Darmowy', color: 'grey' },
  PREMIUM: { label: 'Premium', color: 'purple' }
};
const courses = computed(() => store.getters[coursesListGetters.getCoursesList]);
const lessons = computed(() => store.getters[coursesListGetters.getLessonsList]);
const activeView = computed(() => store.getters[coursesListGetters.getActiveView]);

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
