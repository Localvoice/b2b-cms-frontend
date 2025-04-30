<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutStore } from '~app/layout/store'; // assuming Pinia or Composition API style
import { LayoutMode } from '~app/layout/types';
import TheCategory from './TheCategory.vue';
import { CourseStructureModel } from '../models/courseStructure';

const props = defineProps<{
  course: CourseStructureModel;
  courseIndex?: number;
}>();

const emit = defineEmits([
  'removeCategory',
  'insertCategory',
  'updateStructure',
  'savePicture',
  'removePicture',
  'insertLesson',
  'addLesson',
  'removeLesson',
  'validation',
  'addCategory'
]);

const maxAmountOfCategories = 12;

// Layout state (store)
const layoutStore = useLayoutStore();

// Computed properties
const isMaxCategories = computed(() => {
  return props.course.categories?.length >= maxAmountOfCategories;
});

const backgroundForSlides = computed(() => {
  return layoutStore.layoutMode === LayoutMode.WHITE ? '#fff' : '#242939';
});
</script>

<template>
  <v-slide-group
    v-if="props.course.categories.length > 0"
    class="pa-4 mb-7"
    multiple
    show-arrows
    :style="{ background: backgroundForSlides }"
  >
    <template>
      <v-slide-item v-for="(category, categoryIndex) in props.course.categories" :key="categoryIndex" class="ml-0 mr-0">
        <the-category
          :category="category"
          :category-index="categoryIndex"
          :course-index="props.courseIndex || 0"
          :is-max-categories="isMaxCategories"
          @removeCategory="(event) => emit('removeCategory', event)"
          @insertCategory="(event) => emit('insertCategory', event)"
          @updateStructure="(event) => emit('updateStructure', event)"
          @savePicture="(event) => emit('savePicture', event)"
          @removePicture="(event) => emit('removePicture', event)"
          @insertLesson="(event) => emit('insertLesson', event)"
          @addLesson="(event) => emit('addLesson', event)"
          @removeLesson="(event) => emit('removeLesson', event)"
          @validation="(event) => emit('validation', event)"
        />
      </v-slide-item>
    </template>
  </v-slide-group>

  <v-row v-else align="center" class="noContent">
    <v-col cols="12" align="center">
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            class="mb-4 mr-4"
            color="primary"
            fab
            small
            v-on="on"
            @click.stop="emit('addCategory', { courseIndex: props.courseIndex || 0 })"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('buttons.addCategory') }}</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<style scoped>
.course-counter {
  z-index: 1;
}

.localvoice-file-input {
  max-width: 50% !important;
}

.noContent {
  height: 200px;
}
</style>
