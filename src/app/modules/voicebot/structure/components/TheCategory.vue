<template>
  <base-card class="mr-5">
    <div class="mt-4">
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            class="mb-4 mr-4"
            color="primary"
            fab
            small
            :disabled="isMaxCategories"
            v-on="on"
            @click.stop="insertCategory"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('buttons.addCategoryRightAfterThat') }}</span>
      </v-tooltip>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn class="mb-4" color="warning" fab small v-on="on" @click.stop="removeCategory">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('buttons.removeThisCategory') }}</span>
      </v-tooltip>
    </div>
    <v-card-title class="pb-0">{{ $t('buttons.categoryName') }}</v-card-title>
    <v-card-text>
      <v-form>
        <form-control-state v-slot:default="{ message }" :errors="form.errors.subject">
          <v-text-field
            :value="category.subject"
            :error-messages="message"
            :hint="$t('labels.categoryStructureHint')"
            :label="$t('labels.orginalCategoryName')"
            :placeholder="$t('labels.categoryNamePlaceholder')"
            @input="updateCategory('subject', $event)"
          />
        </form-control-state>
        <form-control-state v-slot:default="{ message }" :errors="form.errors.translatedSubject">
          <v-text-field
            :value="category.translatedSubject"
            :error-messages="message"
            :hint="$t('labels.translatedCategoryStructureHint')"
            :label="$t('labels.translatedCategoryName')"
            :placeholder="$t('labels.translatedCategoryNamePlaceholder')"
            class="mb-5"
            @input="updateCategory('translatedSubject', $event)"
          />
        </form-control-state>
        <div class="d-flex">
          <v-img v-if="category.imageSrc" :src="category.imageSrc" width="10px" />
          <form-control-state
            v-slot:default="{ message, blobFile }"
            :image="category.imageSrc"
            :errors="form.errors.imageSrc"
          >
            <v-file-input
              :label="$t('labels.categoryFileInput')"
              flat
              :value="blobFile"
              :error-messages="message"
              truncate-length="4"
              class="d-inline-flex localvoice-file-input"
              @change="updatePicture($event, category.imageSrc)"
            ></v-file-input>
          </form-control-state>
        </div>
        <v-btn :disabled="maxLessons" color="success" class="mr-4 mb-5 mt-4 course-counter" @click.stop="addLesson">
          {{ $t('buttons.addLesson') }}
        </v-btn>

        <v-card-title class="pb-0">Lekcje</v-card-title>
        <div
          v-for="(lesson, lessonIndex) in category.list"
          :key="lessonIndex"
          style="margin-bottom: 55px; position: relative"
        >
          <the-lesson
            :course-index="courseIndex"
            :category-index="categoryIndex"
            :lesson-index="lessonIndex"
            :lesson="lesson"
            :max-lessons="maxLessons"
            @updateStructure="$emit('updateStructure', $event)"
            @savePicture="$emit('savePicture', $event)"
            @removePicture="$emit('removePicture', $event)"
            @insertLesson="$emit('insertLesson', $event)"
            @removeLesson="$emit('removeLesson', $event)"
            @validation="$emit('validation', $event)"
            @lessonValidationId="setLessonValidationIds"
          ></the-lesson>
        </div>
      </v-form>
    </v-card-text>
  </base-card>
</template>

<script lang="ts" setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';
import { FormControlState } from '~app/shared/form';
import { ValidationTarget } from '~app/shared/types';
import TheLesson from './TheLesson.vue';
import { CategoryStructureModel } from '../models/categoryStructure';
import { createCategoryForm, createNumberOfLesssonsForm } from '../validation/forms';

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  courseIndex: {
    type: Number,
    default: 0
  },
  categoryIndex: {
    type: Number,
    required: true,
    default: 0
  },
  isMaxCategories: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits();

const form = ref(createCategoryForm());
const numberOfLessonsForm = ref(createNumberOfLesssonsForm());
const lessonValidationIds = ref<string[]>([]);
const validationId = ref('');
const maxAmountOfLessons = 12;

const maxLessons = computed(() => {
  return props.category.list ? props.category.list.length >= maxAmountOfLessons : false;
});

const updateCategory = (field: string, value: any) => {
  emit('updateStructure', {
    [field]: value,
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex,
    operation: 'category'
  });
};

const removeCategory = () => {
  emit('removeCategory', {
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex,
    validationIds: [...lessonValidationIds.value, validationId.value]
  });
};

const addLesson = () => {
  emit('addLesson', {
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex
  });
};

const updatePicture = ($event: File | null = null, imageSrc: string | undefined) => {
  let emitterName: string;
  if ($event && $event.name.startsWith('https')) return;
  if (!$event) emitterName = 'removePicture';
  else emitterName = 'savePicture';

  emit(emitterName, {
    file: $event,
    courseIndex: props.courseIndex,
    categoryIndex: props.categoryIndex,
    operation: 'category',
    imageSrc
  });
};

const setLessonValidationIds = (id: string) => {
  lessonValidationIds.value.push(id);
};

watch(
  () => props.category,
  (category) => {
    validationId.value = `course-${props.courseIndex}-category-${props.categoryIndex}`;
    // form.value.data! = category;
    numberOfLessonsForm.value.data = { numberOfLessons: category.list ? category.list.length : 0 };

    emit('validation', {
      data: form.value,
      courseIndex: props.courseIndex,
      id: validationId.value,
      targets: [ValidationTarget.TEST]
    });

    emit('validation', {
      data: numberOfLessonsForm.value,
      courseIndex: props.courseIndex,
      id: `numberOfLessons-${props.categoryIndex}`,
      targets: [ValidationTarget.TEST]
    });
  },
  { immediate: true, deep: true }
);
</script>
