<template>
  <v-table class="w-full" rounded="lg">
    <thead v-if="activeView === 'courses'">
      <tr>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('title')">
            <span class="mr-1">KURS</span>
            <v-icon
              v-if="sortingField === 'title'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('proficiencyLevel')">
            <span class="mr-1">POZIOM</span>
            <v-icon
              v-if="sortingField === 'proficiencyLevel'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('category')">
            <span class="mr-1">KATEGORIA</span>
            <v-icon
              v-if="sortingField === 'category'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('subscriptionModel')">
            <span class="mr-1">PLAN</span>
            <v-icon
              v-if="sortingField === 'subscriptionModel'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('version')">
            <span class="mr-1">WERSJA</span>
            <v-icon
              v-if="sortingField === 'version'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleDateSorting">
            <span class="mr-1">DATA EDYCJI</span>
            <v-icon
              :icon="dateSortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
      </tr>
    </thead>
    <thead v-if="activeView === 'lessons'">
      <tr>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('title')">
            <span class="mr-1">KURS</span>
            <v-icon
              v-if="sortingField === 'title'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('contentType')">
            <span class="mr-1">TYP</span>
            <v-icon
              v-if="sortingField === 'contentType'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('proficiencyLevel')">
            <span class="mr-1">POZIOM</span>
            <v-icon
              v-if="sortingField === 'proficiencyLevel'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('category')">
            <span class="mr-1">KATEGORIA</span>
            <v-icon
              v-if="sortingField === 'category'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('subscriptionModel')">
            <span class="mr-1">PLAN</span>
            <v-icon
              v-if="sortingField === 'subscriptionModel'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('version')">
            <span class="mr-1">WERSJA</span>
            <v-icon
              v-if="sortingField === 'version'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
        <th class="text-left">
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleDateSorting">
            <span class="mr-1">DATA EDYCJI</span>
            <v-icon
              :icon="dateSortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="activeView === 'courses'">
      <tr v-for="course in courses" :key="course.courseId">
        <td>
          <div>
            <router-link to="/app/courses/course-id" class="d-inline-block">
              <h6 class="table-text">{{ course.title }}</h6>
            </router-link>
          </div>
          <div class="resize-trigger"></div>
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
          <v-tooltip :text="course.category" location="bottom">
            <template v-slot:activator="{ props }">
              <v-chip size="small" color="pink" v-bind="props">{{ truncate(course.category) }}</v-chip>
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
          <p class="table-text">{{ course.version }}</p>
        </td>
        <td>
          <div class="d-flex align-center">
            <p class="table-text">{{ formatDateString(course.updatedAt) }}</p>
            <v-btn class="ml-auto" variant="plain" icon="mdi-dots-horizontal" size="x-small"></v-btn>
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-if="activeView === 'lessons'">
      <tr v-for="lesson in lessons" :key="lesson.lessonId">
        <td>
          <div>
            <router-link to="/app/lessons/lesson-id" class="d-inline-block">
              <h6 class="table-text">{{ lesson.title }}</h6>
            </router-link>
          </div>
        </td>
        <td>
          <p class="table-text">{{ formatEnumString(lesson.contentType) }}</p>
        </td>
        <td>
          <div class="d-flex align-center">
            <v-icon
              :class="`text-${proficiencyLevelMatcher[lesson.proficiencyLevel].color} mr-2`"
              icon="mdi-poll"
              size="x-small"
            ></v-icon>
            <span class="table-text">
              {{ proficiencyLevelMatcher[lesson.proficiencyLevel].label }}
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
          <v-chip size="small" :color="subscriptionModelMatcher[lesson.subscriptionModel].color">
            <v-icon
              v-if="lesson.subscriptionModel === 'PREMIUM'"
              class="text-warning mr-1"
              icon="mdi-seal"
              size="medium"
            ></v-icon>
            {{ subscriptionModelMatcher[lesson.subscriptionModel].label }}
          </v-chip>
        </td>
        <td>
          <p class="table-text">{{ lesson.version }}</p>
        </td>
        <td>
          <div class="d-flex align-center">
            <p class="table-text">{{ formatDateString(lesson.updatedAt) }}</p>
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
const dateSortingDirection = computed(() => store.getters[coursesListGetters.getDateSortingDirection]);
const sortingField = computed(() => store.getters[coursesListGetters.getSortingField]);
const sortingDirection = computed(() => store.getters[coursesListGetters.getSortingDirection]);

const toggleDateSorting = () => store.dispatch(coursesListActions.toggleDateSorting);
const toggleSortField = (field: string) => store.dispatch(coursesListActions.toggleSortField, { field });

const truncate = (text: string, maxLength = 10) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const formatEnumString = (input: string): string => {
  return input
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatDateString = (date: string) => {
  return date.split('T')[0];
};
</script>

<style lang="scss">
thead {
  background-color: #f9f9fb;
}
th,
td {
  position: relative;
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
.resize-trigger {
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: #f2f0ff;
  right: 0;
  top: 0;
  cursor: w-resize;
}
.table-text {
  color: #3b4471;
  font-weight: 600;
  font-size: 13px;
}
</style>
