<template>
  <v-table class="w-full" rounded="lg">
    <thead v-if="activeView === 'courses'">
      <tr>
        <th
          class="text-left"
          :style="columnWidths[0] ? { width: columnWidths[0] + 'px' } : {}"
          :ref="(el) => setColRef(el, 0)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('title')">
            <span class="mr-1">KURS</span>
            <v-icon
              v-if="sortingField === 'title'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 0)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[1] ? { width: columnWidths[1] + 'px' } : {}"
          :ref="(el) => setColRef(el, 1)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('lessonCount')">
            <span class="mr-1">LEKCJE</span>
            <v-icon
              v-if="sortingField === 'lessonCount'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 1)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[2] ? { width: columnWidths[2] + 'px' } : {}"
          :ref="(el) => setColRef(el, 2)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('proficiencyLevel')">
            <span class="mr-1">POZIOM</span>
            <v-icon
              v-if="sortingField === 'proficiencyLevel'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 2)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[3] ? { width: columnWidths[3] + 'px' } : {}"
          :ref="(el) => setColRef(el, 3)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('category')">
            <span class="mr-1">KATEGORIA</span>
            <v-icon
              v-if="sortingField === 'category'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 3)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[4] ? { width: columnWidths[4] + 'px' } : {}"
          :ref="(el) => setColRef(el, 4)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('subscriptionModel')">
            <span class="mr-1">PLAN</span>
            <v-icon
              v-if="sortingField === 'subscriptionModel'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 4)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[5] ? { width: columnWidths[5] + 'px' } : {}"
          :ref="(el) => setColRef(el, 5)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('status')">
            <span class="mr-1">STATUS</span>
            <v-icon
              v-if="sortingField === 'status'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 5)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[6] ? { width: columnWidths[6] + 'px' } : {}"
          :ref="(el) => setColRef(el, 6)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('version')">
            <span class="mr-1">WERSJA</span>
            <v-icon
              v-if="sortingField === 'version'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 6)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[7] ? { width: columnWidths[7] + 'px' } : {}"
          :ref="(el) => setColRef(el, 7)"
        >
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
        <th
          class="text-left"
          :style="columnWidths[0] ? { width: columnWidths[0] + 'px' } : {}"
          :ref="(el) => setColRef(el, 0)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('title')">
            <span class="mr-1">KURS</span>
            <v-icon
              v-if="sortingField === 'title'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 0)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[1] ? { width: columnWidths[1] + 'px' } : {}"
          :ref="(el) => setColRef(el, 1)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('contentType')">
            <span class="mr-1">TYP</span>
            <v-icon
              v-if="sortingField === 'contentType'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 1)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[2] ? { width: columnWidths[2] + 'px' } : {}"
          :ref="(el) => setColRef(el, 2)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('proficiencyLevel')">
            <span class="mr-1">POZIOM</span>
            <v-icon
              v-if="sortingField === 'proficiencyLevel'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 2)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[3] ? { width: columnWidths[3] + 'px' } : {}"
          :ref="(el) => setColRef(el, 3)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('category')">
            <span class="mr-1">KATEGORIA</span>
            <v-icon
              v-if="sortingField === 'category'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 3)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[4] ? { width: columnWidths[4] + 'px' } : {}"
          :ref="(el) => setColRef(el, 4)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('subscriptionModel')">
            <span class="mr-1">PLAN</span>
            <v-icon
              v-if="sortingField === 'subscriptionModel'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 4)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[5] ? { width: columnWidths[5] + 'px' } : {}"
          :ref="(el) => setColRef(el, 5)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('status')">
            <span class="mr-1">STATUS</span>
            <v-icon
              v-if="sortingField === 'status'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 5)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[6] ? { width: columnWidths[6] + 'px' } : {}"
          :ref="(el) => setColRef(el, 6)"
        >
          <div class="d-inline-flex align-center cursor-pointer" @click="toggleSortField('version')">
            <span class="mr-1">WERSJA</span>
            <v-icon
              v-if="sortingField === 'version'"
              :icon="sortingDirection === 'asc' ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
              class="text-body-1"
            ></v-icon>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 6)"></div>
        </th>
        <th
          class="text-left"
          :style="columnWidths[7] ? { width: columnWidths[7] + 'px' } : {}"
          :ref="(el) => setColRef(el, 7)"
        >
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
        <td :style="columnWidths[0] ? { width: columnWidths[0] + 'px' } : {}" :ref="(el) => setColRef(el, 0)">
          <div>
            <router-link :to="`/app/courses/${course.courseId}`" class="d-inline-block">
              <h6 class="table-text">{{ course.title }}</h6>
            </router-link>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 0)"></div>
        </td>
        <td :style="columnWidths[1] ? { width: columnWidths[1] + 'px' } : {}" :ref="(el) => setColRef(el, 1)">
          <p class="table-text">{{ course.lessonCount }}</p>
          <div class="resize-trigger" @mousedown="startResizing($event, 1)"></div>
        </td>
        <td :style="columnWidths[2] ? { width: columnWidths[2] + 'px' } : {}" :ref="(el) => setColRef(el, 2)">
          <div class="d-flex align-center" v-if="course.proficiencyLevel">
            <v-icon
              :class="`text-${proficiencyLevelMatcher[course.proficiencyLevel].color} mr-2`"
              icon="mdi-poll"
              size="x-small"
            ></v-icon>
            <span class="table-text">
              {{ proficiencyLevelMatcher[course.proficiencyLevel].label }}
            </span>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 2)"></div>
        </td>
        <td :style="columnWidths[3] ? { width: columnWidths[3] + 'px' } : {}" :ref="(el) => setColRef(el, 3)">
          <v-tooltip :text="course.category" location="bottom">
            <template v-slot:activator="{ props }">
              <v-chip size="small" color="pink" v-bind="props">{{ truncate(course.category) }}</v-chip>
            </template>
          </v-tooltip>
          <div class="resize-trigger" @mousedown="startResizing($event, 3)"></div>
        </td>
        <td :style="columnWidths[4] ? { width: columnWidths[4] + 'px' } : {}" :ref="(el) => setColRef(el, 4)">
          <v-chip
            v-if="course.subscriptionModel"
            size="small"
            :color="subscriptionModelMatcher[course.subscriptionModel].color"
          >
            <v-icon
              v-if="course.subscriptionModel === 'PREMIUM'"
              class="text-warning mr-1"
              icon="mdi-seal"
              size="medium"
            ></v-icon>
            {{ subscriptionModelMatcher[course.subscriptionModel].label }}
          </v-chip>
          <div class="resize-trigger" @mousedown="startResizing($event, 4)"></div>
        </td>
        <td
          v-if="course.status"
          :style="columnWidths[5] ? { width: columnWidths[5] + 'px' } : {}"
          :ref="(el) => setColRef(el, 5)"
        >
          <StatusBox :status="course.status" />
          <div class="resize-trigger" @mousedown="startResizing($event, 5)"></div>
        </td>
        <td :style="columnWidths[6] ? { width: columnWidths[6] + 'px' } : {}" :ref="(el) => setColRef(el, 6)">
          <p class="table-text">{{ course.version }}</p>
          <div class="resize-trigger" @mousedown="startResizing($event, 6)"></div>
        </td>
        <td
          v-if="course.updatedAt && course.courseId"
          :style="columnWidths[7] ? { width: columnWidths[7] + 'px' } : {}"
          :ref="(el) => setColRef(el, 7)"
        >
          <div class="d-flex align-center">
            <p class="table-text">{{ formatDateString(course.updatedAt) }}</p>
            <CourseOptionsDropdown :courseId="course.courseId" />
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-if="activeView === 'lessons'">
      <tr v-for="lesson in lessons" :key="lesson.lessonId">
        <td :style="columnWidths[0] ? { width: columnWidths[0] + 'px' } : {}" :ref="(el) => setColRef(el, 0)">
          <div>
            <router-link :to="`/app/lessons/${lesson.lessonId}`" class="d-inline-block">
              <h6 class="table-text">{{ lesson.title }}</h6>
            </router-link>
          </div>
          <div class="resize-trigger" @mousedown="startResizing($event, 0)"></div>
        </td>
        <td
          v-if="lesson.contentType"
          :style="columnWidths[1] ? { width: columnWidths[1] + 'px' } : {}"
          :ref="(el) => setColRef(el, 1)"
        >
          <p class="table-text">{{ formatEnumString(lesson.contentType) }}</p>
          <div class="resize-trigger" @mousedown="startResizing($event, 1)"></div>
        </td>
        <td
          v-if="lesson.proficiencyLevel"
          :style="columnWidths[2] ? { width: columnWidths[2] + 'px' } : {}"
          :ref="(el) => setColRef(el, 2)"
        >
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
          <div class="resize-trigger" @mousedown="startResizing($event, 2)"></div>
        </td>
        <td :style="columnWidths[3] ? { width: columnWidths[3] + 'px' } : {}" :ref="(el) => setColRef(el, 3)">
          <v-tooltip v-if="lesson.category" :text="lesson.category" location="bottom">
            <template v-slot:activator="{ props }">
              <v-chip size="small" color="pink" v-bind="props">{{ truncate(lesson.category) }}</v-chip>
            </template>
          </v-tooltip>
          <div class="resize-trigger" @mousedown="startResizing($event, 3)"></div>
        </td>
        <td :style="columnWidths[4] ? { width: columnWidths[4] + 'px' } : {}" :ref="(el) => setColRef(el, 4)">
          <v-chip
            v-if="lesson.subscriptionModel"
            size="small"
            :color="subscriptionModelMatcher[lesson.subscriptionModel].color"
          >
            <v-icon
              v-if="lesson.subscriptionModel === 'PREMIUM'"
              class="text-warning mr-1"
              icon="mdi-seal"
              size="medium"
            ></v-icon>
            {{ subscriptionModelMatcher[lesson.subscriptionModel].label }}
          </v-chip>
          <div class="resize-trigger" @mousedown="startResizing($event, 4)"></div>
        </td>
        <td
          v-if="lesson.status"
          :style="columnWidths[5] ? { width: columnWidths[5] + 'px' } : {}"
          :ref="(el) => setColRef(el, 5)"
        >
          <StatusBox :status="lesson.status" />
          <div class="resize-trigger" @mousedown="startResizing($event, 5)"></div>
        </td>
        <td :style="columnWidths[6] ? { width: columnWidths[6] + 'px' } : {}" :ref="(el) => setColRef(el, 6)">
          <p class="table-text">{{ lesson.version }}</p>
          <div class="resize-trigger" @mousedown="startResizing($event, 6)"></div>
        </td>
        <td :style="columnWidths[7] ? { width: columnWidths[7] + 'px' } : {}" :ref="(el) => setColRef(el, 7)">
          <div v-if="lesson.updatedAt && lesson.lessonId" class="d-flex align-center">
            <p class="table-text">{{ formatDateString(lesson.updatedAt) }}</p>
            <LessonOptionsDropdown :lessonId="lesson.lessonId" />
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { platformGetters, platformActions } from '../store';
import { computed, ref, onMounted, nextTick, ComponentPublicInstance } from 'vue';
import CourseOptionsDropdown from './CourseOptionsDropdown.vue';
import LessonOptionsDropdown from './LessonOptionsDropdown.vue';
import StatusBox from '~app/shared/stats/StatusBox.vue';
import LessonModel from '../models/Lesson';
import { ActiveView, CourseWithSingleCategory } from '../store/types';

const store = useStore();
const proficiencyLevelMatcher = {
  A1: { label: 'Łatwy (A1)', color: 'success' },
  A2: { label: 'Łatwy (A2)', color: 'success' },
  B1: { label: 'Średni (B1)', color: 'warning' },
  B2: { label: 'Średni (B2)', color: 'warning' },
  C1: { label: 'Trudny (C1)', color: 'error' },
  C2: { label: 'Trudny (C2)', color: 'error' }
};
const subscriptionModelMatcher = {
  FREE: { label: 'Darmowy', color: 'grey' },
  PARTIALLY_FREE: { label: 'Darmowy', color: 'grey' },
  PREMIUM: { label: 'Premium', color: 'purple' }
};

const columnWidths = ref<number[]>([]);
const colRefs = ref<(Element | null)[]>([]);
const setColRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el instanceof HTMLElement) colRefs.value[index] = el;
};

let isResizing = false;
let currentColIndex: number | null = null;
let startX = 0;
let startWidth = 0;

const startResizing = (event: MouseEvent, index: number) => {
  isResizing = true;
  currentColIndex = index;
  startX = event.clientX;
  startWidth = columnWidths.value[index];

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', stopResizing);
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isResizing || currentColIndex === null) return;

  const delta = event.clientX - startX;
  const newWidth = Math.max(30, startWidth + delta);
  columnWidths.value[currentColIndex] = newWidth;
};

const stopResizing = () => {
  isResizing = false;
  currentColIndex = null;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', stopResizing);
};

const courses = computed<CourseWithSingleCategory[]>(() => store.getters[platformGetters.getCoursesList]);
const lessons = computed<LessonModel[]>(() => store.getters[platformGetters.getLessonsList]);
const activeView = computed<ActiveView>(() => store.getters[platformGetters.getActiveView]);
const dateSortingDirection = computed<'asc' | 'desc'>(() => store.getters[platformGetters.getDateSortingDirection]);
const sortingField = computed<string>(() => store.getters[platformGetters.getSortingField]);
const sortingDirection = computed<'asc' | 'desc'>(() => store.getters[platformGetters.getSortingDirection]);

const toggleDateSorting = () => store.dispatch(platformActions.toggleDateSorting);
const toggleSortField = (field: string) => store.dispatch(platformActions.toggleSortField, { field });

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

onMounted(async () => {
  await nextTick();
  if (colRefs.value === null) return;
  columnWidths.value = colRefs.value.map((col) => (col instanceof HTMLElement ? col.offsetWidth : 100));
});
</script>

<style lang="scss">
thead {
  background-color: #f9f9fb;
}
th,
td {
  position: relative;
  user-select: none;
}
th {
  text-transform: uppercase;
  color: #161d40;
  font-weight: 600 !important;
  font-size: 12px;
}
td {
  padding: 16px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
