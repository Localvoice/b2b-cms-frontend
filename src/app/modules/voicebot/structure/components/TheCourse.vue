<template>
  <div class="d-flex justify-start pl-5">
    <div style="min-width: 23%">
      <FormControlState v-slot="{ message }" :errors="form.errors.subject">
        <v-text-field
          :model-value="course.subject"
          :error-messages="message"
          :label="$t('labels.orginalCourseName')"
          :hint="$t('labels.orginalCourseNameHint')"
          :placeholder="$t('labels.orginalCourseNamePlaceholder')"
          @update:model-value="onSubjectUpdate"
        />
      </FormControlState>

      <FormControlState v-slot="{ message }" :errors="form.errors.translatedSubject">
        <v-text-field
          :model-value="course.translatedSubject"
          :error-messages="message"
          :hint="$t('labels.translatedCourseHint')"
          :label="$t('labels.translatedCourseName')"
          :placeholder="$t('labels.translatedCourseNamePlaceholder')"
          @update:model-value="onTranslatedSubjectUpdate"
        />
      </FormControlState>
    </div>

    <div class="ml-15">
      <v-img :src="course.imageSrc" width="120px" />
    </div>

    <div class="ml-15" style="min-width: 15%">
      <FormControlState v-slot="{ message, blobFile }" :image="course.imageSrc" :errors="form.errors.imageSrc">
        <v-file-input
          :label="$t('labels.courseFileInput')"
          :model-value="blobFile"
          :error-messages="message"
          @update:model-value="onPictureChange"
        />
      </FormControlState>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { FormControlState } from '~app/shared/form';
import { ValidationTarget } from '~app/shared/types';
import { createCourseForm, createNumberOfCategoriesForm } from '../validation/forms';
import { CourseStructureModel } from '../models/courseStructure';

const props = defineProps<{
  course: CourseStructureModel;
  courseIndex: number;
  numberOfCategories: number;
}>();

const emit = defineEmits<{
  (e: 'updateStructure', payload: any): void;
  (e: 'validation', payload: any): void;
  (e: 'savePicture', payload: any): void;
  (e: 'removePicture', payload: any): void;
}>();

const form = ref(createCourseForm());
const numberOfCategoriesForm = ref(createNumberOfCategoriesForm());
const validationId = ref('');
const numberOfCategoriesValidationId = 'numberOfCategories';

watch(
  () => props.course,
  (course) => {
    form.value.data = course;
    validationId.value = `course-${props.courseIndex}`;
    emit('validation', {
      data: form.value,
      courseIndex: props.courseIndex,
      id: validationId.value,
      targets: [ValidationTarget.TEST]
    });
  },
  { immediate: true }
);

watch(
  () => props.numberOfCategories,
  (numberOfCategories) => {
    numberOfCategoriesForm.value.data = { numberOfCategories };
    emit('validation', {
      data: numberOfCategoriesForm.value,
      courseIndex: props.courseIndex,
      id: numberOfCategoriesValidationId,
      targets: [ValidationTarget.TEST]
    });
  },
  { immediate: true }
);

function onSubjectUpdate(value: string) {
  emit('updateStructure', {
    subject: value,
    courseIndex: props.courseIndex,
    operation: 'course'
  });
}

function onTranslatedSubjectUpdate(value: string) {
  emit('updateStructure', {
    translatedSubject: value,
    courseIndex: props.courseIndex,
    operation: 'course'
  });
}

function onPictureChange(file: File | null) {
  if (file && file.name.startsWith('https')) return;

  const emitterName = file ? 'savePicture' : 'removePicture';
  emit(emitterName, {
    file,
    courseIndex: props.courseIndex,
    operation: 'course',
    imageSrc: props.course.imageSrc
  });
}
</script>
