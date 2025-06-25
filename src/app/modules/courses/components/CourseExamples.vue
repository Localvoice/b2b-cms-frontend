<template>
  <v-row>
    <v-col cols="12" lg="3">
      <v-card class="pa-8 h-full" color="grey-lighten-5" border rounded="lg">
        <h5 class="mb-8">Lekcje w kursie</h5>
        <draggable :list="draggableLessons" handle="#drag-handle-lessons" item-key="lessonId">
          <template #item="{ element }">
            <CourseLessonCard
              :index="getLessonIndex(element.lessonId)"
              :lessonId="element.lessonId"
              :title="element.title"
              :status="element.status"
            />
          </template>
        </draggable>
      </v-card>
    </v-col>
    <v-col cols="12" lg="9">
      <v-card class="pa-8 h-full" color="grey-lighten-5" border rounded="lg">
        <h5>Przykłady w kursie</h5>
        <p class="muted-text mb-8">{{ draggableLessonsExamples.length }} przykładów</p>
        <draggable :list="draggableLessonsExamples" handle="#drag-handle-examples" item-key="phrase">
          <template #item="{ element }">
            <LessonExample
              :phrase="element.phrase"
              :translatedPhrase="element.translatedPhrase"
              :tip="element.tip"
              :index="getLessonExampleIndex(element.phrase)"
            />
          </template>
        </draggable>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref, computed, onMounted, watch } from 'vue';
import CourseLessonCard from './CourseLessonCard.vue';
import LessonExample from '../../lessons/components/LessonExample.vue';
import { useStore } from 'vuex';
import { courseDetailsActions, courseDetailsGetters } from '../store';
import LessonModel from '../models/Lesson';
import LessonExampleModel from '../models/LessonExample';

const store = useStore();
const selectLessonId = (lessonId: string) => store.dispatch(courseDetailsActions.selectLessonId, { lessonId });

const courseLessons = computed<LessonModel[]>(() => store.getters[courseDetailsGetters.getCourseLessons]);
const lessonExamples = computed<LessonExampleModel[]>(() => store.getters[courseDetailsGetters.getLessonExamples]);

const draggableLessons = ref<LessonModel[]>([...courseLessons.value]);
const draggableLessonsExamples = ref<LessonExampleModel[]>([...lessonExamples.value]);

const getLessonIndex = (id: string) => {
  return courseLessons.value.findIndex((lesson) => lesson.lessonId === id);
};

const getLessonExampleIndex = (phrase: string) => {
  return lessonExamples.value.findIndex((lesson) => lesson.phrase === phrase);
};

watch(lessonExamples, (newLessonExamples) => {
  draggableLessonsExamples.value = [...newLessonExamples];
});

onMounted(() => {
  const firstLessonId = courseLessons.value[0].lessonId;
  if (firstLessonId) {
    selectLessonId(firstLessonId);
  }
});
</script>

<style lang="scss" scoped></style>
