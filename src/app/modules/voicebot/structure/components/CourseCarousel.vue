<script setup lang="ts">
import { ref, computed } from 'vue';
import { useVoicebotStore } from '../store'; // Assuming you migrate to Pinia or use Vuex Composition Helpers
import TheCourse from './TheCourse.vue';
import { CourseStructureModel } from '../models/courseStructure';

const props = defineProps<{
  courses: CourseStructureModel[];
}>();

const emit = defineEmits([
  'addCourse',
  'removeCourse',
  'updateStructure',
  'savePicture',
  'removePicture',
  'validation',
  'courseIndex'
]);

// Local reactive data
const courseIndex = ref(0);

// Store
const voicebotStore = useVoicebotStore(); // If using Pinia
// If you still use Vuex, adapt it via useStore()

// Computed properties (if needed from store)
const course = computed(() => voicebotStore.getCourse);
const getNumberOfCategories = (index: number) => voicebotStore.getNumberOfCategories(index);

// Methods
const addCourseIndex = () => {
  courseIndex.value = courseIndex.value === props.courses.length - 1 ? 0 : courseIndex.value + 1;
  emit('courseIndex', courseIndex.value);
};

const removeCourseIndex = () => {
  courseIndex.value = courseIndex.value === 0 ? props.courses.length - 1 : courseIndex.value - 1;
  emit('courseIndex', courseIndex.value);
};
</script>

<template>
  <base-card class="px-5 pl-10">
    <v-card-title class="d-flex justify-space-between">
      {{ $t('buttons.course') }}
      <div class="mt-4">
        <v-tooltip top>
          <template #activator="{ on }">
            <v-btn class="mb-4 mr-4" color="primary" fab small v-on="on" @click.stop="emit('addCourse')">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('buttons.addCourse') }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template #activator="{ on }">
            <v-btn
              class="mb-4"
              color="warning"
              fab
              small
              v-on="on"
              @click.stop="emit('removeCourse', { courseIndex: courseIndex.value })"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('buttons.removeCourse') }}</span>
        </v-tooltip>
      </div>
      <div>
        <v-icon color="primary" @click.stop="removeCourseIndex()">mdi-chevron-left</v-icon>
        <v-icon color="primary" @click.stop="addCourseIndex()">mdi-chevron-right</v-icon>
      </div>
    </v-card-title>

    <v-card-text>
      <v-carousel v-model="courseIndex" hide-delimiters :show-arrows="false" height="150px" light>
        <v-carousel-item v-for="(course, index) in props.courses" :key="index">
          <the-course
            :course="course"
            :course-index="index"
            :number-of-categories="getNumberOfCategories(courseIndex.value)"
            @updateStructure="(event) => emit('updateStructure', event)"
            @savePicture="(event) => emit('savePicture', event)"
            @removePicture="(event) => emit('removePicture', event)"
            @validation="(event) => emit('validation', event)"
          />
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </base-card>
</template>
