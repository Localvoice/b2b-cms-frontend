<template>
  <v-row>
    <v-col cols="12" lg="3">
      <v-card class="pa-8 h-full" color="grey-lighten-5" border rounded="lg">
        <h5 class="mb-8">Lekcje w kursie</h5>
        <draggable :list="lessonsList" handle="#drag-handle" item-key="id" @end="onDragEnd">
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
    </v-col>
    <v-col cols="12" lg="9">
      <v-card class="pa-8 h-full" color="grey-lighten-5" border rounded="lg">
        <h5>Przykłady w kursie</h5>
        <p class="muted-text mb-8">12 przykładów</p>
        <draggable :list="lessonsList" handle="#drag-handle" item-key="id" @end="onDragEnd">
          <template #item="{ element, index }">
            <LessonExample :title="element.title" :index="index" />
          </template>
        </draggable>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref } from 'vue';
import { lessons } from '../../lessons/dummyData/lessons';
import CourseLessonCard from './CourseLessonCard.vue';
import LessonExample from '../../lessons/components/LessonExample.vue';

const lessonsList = ref([...lessons].slice(0, 5));

const getIndex = (id: string) => {
  return lessons.findIndex((lesson) => lesson.lessonId === id);
};

const onDragEnd = () => {
  console.log('Drag end', lessonsList.value);
};
</script>

<style lang="scss" scoped></style>
