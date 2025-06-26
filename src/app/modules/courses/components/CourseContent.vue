<template>
  <v-row v-if="activeCourse">
    <v-col cols="12" lg="5">
      <v-card class="pa-8" color="grey-lighten-5" border rounded="lg">
        <h5 class="mb-8">Informacje o kursie</h5>
        <v-card class="pa-4 mb-8" border rounded="lg">
          <v-row class="w-full">
            <v-col cols="12" lg="4">
              <img class="h-full object-cover" src="/images/placeholder-course-image.png" alt="course-image" />
            </v-col>
            <v-col cols="12" lg="8">
              <h5 class="course-title mb-3">{{ activeCourse.title }}</h5>
              <p class="muted-text mb-3">W tym kursie nauczysz się słownictwa przydatnego przy podróżowaniu</p>
              <v-chip class="chip" color="pink">{{ activeCourse.categories[0] }}</v-chip>
            </v-col>
          </v-row>
        </v-card>
        <v-row class="w-full">
          <v-col cols="12" lg="6">
            <v-card class="pa-4" border rounded="lg">
              <div class="d-flex align-center">
                <img class="mr-4" src="/images/lessons-icon-block2.png" alt="lesson-icon" />
                <div>
                  <h5 class="mb-1">3</h5>
                  <p class="muted-text">Liczba lekcji</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card class="pa-4" border rounded="lg">
              <div class="d-flex align-center">
                <img class="mr-4" src="/images/students-icon-block.png" alt="students-icon" />
                <div>
                  <h5 class="mb-1">33</h5>
                  <p class="muted-text">Liczba studentów</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card class="pa-4" border rounded="lg">
              <div class="d-flex align-center">
                <img class="mr-4" src="/images/date-icon-block.png" alt="date-icon" />
                <div>
                  <h5 class="mb-1">2024-10-15</h5>
                  <p class="muted-text">Data utworzenia</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card class="pa-4" border rounded="lg">
              <div class="d-flex align-center">
                <img class="mr-4" src="/images/changes-icon-block.png" alt="changes-icon" />
                <div>
                  <h5 class="mb-1">2 dni temu</h5>
                  <p class="muted-text">Ostatnie zmiany</p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12" lg="7">
      <div v-if="draggableLessons.length > 0">
        <v-card class="pa-8 h-full" color="grey-lighten-5" border rounded="lg">
          <h5 class="mb-8">Lekcje w kursie</h5>
          <draggable :list="draggableLessons" handle="#drag-handle-examples" item-key="id" @end="onDragEnd">
            <template #item="{ element }">
              <CourseLessonCard
                :index="getIndex(element.lessonId)"
                :lessonId="element.lessonId"
                :title="element.title"
                :status="element.status"
              />
            </template>
          </draggable>
        </v-card>
      </div>
      <div v-else>
        <EmptyView />
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref, computed, watch } from 'vue';
import EmptyView from './EmptyView.vue';
import CourseLessonCard from './CourseLessonCard.vue';
import CourseModel from '../models/Course';
import { useStore } from 'vuex';
import { courseDetailsGetters } from '../store';
import LessonModel from '../models/Lesson';

const store = useStore();

const activeCourse = computed<CourseModel | null>(() => store.getters[courseDetailsGetters.getCourseDetails]);
const courseLessons = computed<LessonModel[]>(() => store.getters[courseDetailsGetters.getCourseLessons]);

const draggableLessons = ref([...courseLessons.value]);

const getIndex = (id: string) => {
  return courseLessons.value.findIndex((lesson) => lesson.lessonId === id);
};

const onDragEnd = () => {
  console.log('Drag end', draggableLessons.value);
};

watch(courseLessons, (newCourseLessons) => {
  draggableLessons.value = newCourseLessons;
});
</script>

<style lang="scss">
.course-title {
  color: #161d40;
  font-weight: 700;
  font-size: 16px;
}

.muted-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
.chip {
  font-size: 12px;
  font-weight: 600;
}
</style>
