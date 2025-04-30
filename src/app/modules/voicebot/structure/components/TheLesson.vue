<template>
  <v-row>
    <v-col cols="2" class="myFlex">
      <v-btn color="primary" dark small fab class="course-counter">
        <v-icon>{{ lessonIndex + 1 }}</v-icon>
      </v-btn>
    </v-col>

    <v-col>
      <FormControlState v-slot="{ message }" :errors="form.errors.subject">
        <v-text-field
          :model-value="lesson.subject"
          :error-messages="message"
          clearable
          :label="$t('labels.lessonName')"
          :placeholder="$t('labels.lessonNamePlaceholder')"
          @update:model-value="onSubjectUpdate"
        />
      </FormControlState>

      <FormControlState v-slot="{ message }" :errors="form.errors.translatedSubject">
        <v-text-field
          :model-value="lesson.translatedSubject"
          :error-messages="message"
          :label="$t('labels.translatedLessonName')"
          :placeholder="$t('labels.translatedLessonNamePlaceholder')"
          class="mb-5"
          @update:model-value="onTranslatedSubjectUpdate"
        />
      </FormControlState>

      <div class="d-flex">
        <v-img v-if="lesson.imageSrc" :src="lesson.imageSrc" width="10px" />

        <FormControlState v-slot="{ message, blobFile }" :image="lesson.imageSrc" :errors="form.errors.imageSrc">
          <v-file-input
            v-if="lesson"
            flat
            :label="$t('labels.lessonFileInput')"
            :model-value="blobFile"
            :error-messages="message"
            class="d-inline-flex localvoice-file-input"
            truncate-length="4"
            @update:model-value="onPictureChange"
          />
        </FormControlState>
      </div>

      <div class="mt-4">
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              class="mb-4 mr-4"
              color="primary"
              fab
              small
              :disabled="maxLessons"
              v-bind="props"
              @click.stop="insertLesson"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Dodaj lekcję poniżej</span>
        </v-tooltip>

        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn class="mb-4" color="warning" fab small v-bind="props" @click.stop="removeLesson">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
          <span>Usuń lekcję</span>
        </v-tooltip>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { FormControlState } from '~app/shared/form';
import { createLessonForm } from '../validation/forms';
import { LessonStructureModel } from '../models/lessonStructure';

const props = defineProps<{
  lesson: LessonStructureModel;
  courseIndex: number;
  categoryIndex: number;
  lessonIndex: number;
  maxLessons: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateStructure', payload: any): void;
  (e: 'insertLesson', payload: any): void;
  (e: 'removeLesson', payload: any): void;
  (e: 'savePicture', payload: any): void;
  (e: 'removePicture', payload: any): void;
}>();

const form = ref(createLessonForm());
const validationId = ref('');

watch(
  () => props.lesson,
  (lesson) => {
    form.value.data = lesson;
    validationId.value = `lesson-${props.courseIndex}-${props.categoryIndex}-${props.lessonIndex}`;
  },
  { immediate: true }
);

function onSubjectUpdate(value: string) {
  emit('updateStructure', {
    subject: value,
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex,
    lessonIndex: props.lessonIndex,
    operation: 'lesson'
  });
}

function onTranslatedSubjectUpdate(value: string) {
  emit('updateStructure', {
    translatedSubject: value,
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex,
    lessonIndex: props.lessonIndex,
    operation: 'lesson'
  });
}

function onPictureChange(file: File | null) {
  if (file && file.name.startsWith('https')) return;
  const emitterName = file ? 'savePicture' : 'removePicture';
  emit(emitterName, {
    file,
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex,
    lessonIndex: props.lessonIndex,
    imageSrc: props.lesson.imageSrc,
    operation: 'lesson'
  });
}

function insertLesson() {
  emit('insertLesson', {
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex,
    lessonIndex: props.lessonIndex
  });
}

function removeLesson() {
  emit('removeLesson', {
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex,
    lessonIndex: props.lessonIndex,
    validationId: validationId.value
  });
}
</script>

<style scoped>
.course-counter {
  z-index: 1;
}

.myFlex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.localvoice-file-input {
  max-width: 50% !important;
}
</style>
