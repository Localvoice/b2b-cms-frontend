<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { objectKeys } from '~app/shared/helpers/lang';
import { FormControlState } from '~app/shared/form';
import FixedButton from '~app/shared/fixedButton/fixedButton.vue';
import { emitValidation } from '~app/shared/validation';
import { voicebotGetters } from '~app/modules/voicebot/structure/store';
import { VoicebotButtonsText, ValidationTarget } from '~app/shared/types';
import { createBasicInfoForm, createLessonDescriptionForm } from '../validation/forms';
import { LessonBasicInformation, LessonDescription } from '../types';

// Props
const props = defineProps<{
  isLessonFetched: boolean;
  courseNameOnEdit: string[];
  categoryNameOnEdit: string[];
  lessonNameOnEdit: string[];
  lessonDescription: string;
  translatedLessonDescription: string;
  selectedFieldsValidationId: string;
  descriptionFieldsValidationId: string;
  numberOfSentences: number;
  saveFn: () => void;
  testFn: () => void;
  prodFn: () => void;
  buttonsText: VoicebotButtonsText;
}>();

const emit = defineEmits<{
  (e: 'createNewLesson'): void;
  (e: 'courseField', selectedCourseName: string): void;
  (e: 'categoryField', selectedCategoryName: string): void;
  (e: 'lessonField', selectedLessonName: string): void;
  (e: 'updateLessonDescription', value: string): void;
  (e: 'updateTranslatedLessonDescription', value: string): void;
}>();

// Store
const store = useStore();

// Data
const basicInfoForm = createBasicInfoForm();
const lessonDescriptionForm = createLessonDescriptionForm();

const courseNames = ref<string[]>([]);
const selectedCourseName = ref('');
const categoryNames = ref<string[]>([]);
const selectedCategoryName = ref('');
const lessonNames = ref<string[]>([]);
const selectedLessonName = ref('');

// Computed
const linkedCoursesCategoriesAndLessons = computed(() =>
  voicebotGetters.getLinkedCoursesCategoriesAndLessons(store.state)
);

// Helpers
function getCourseNames() {
  return objectKeys(linkedCoursesCategoriesAndLessons.value);
}

// Watchers

watch(
  () => [selectedCourseName.value, selectedCategoryName.value, selectedLessonName.value],
  () => {
    emitValidation<LessonBasicInformation>(
      {
        selectedCourseName: selectedCourseName.value,
        selectedCategoryName: selectedCategoryName.value,
        selectedLessonName: selectedLessonName.value
      },
      {
        form: basicInfoForm,
        instance: null,
        validationId: props.selectedFieldsValidationId,
        targets: [ValidationTarget.SAVE, ValidationTarget.TEST]
      }
    );
  },
  { immediate: true }
);

watch(
  () => [props.lessonDescription, props.translatedLessonDescription, props.numberOfSentences],
  () => {
    emitValidation<LessonDescription>(
      {
        lessonDescription: props.lessonDescription,
        translatedLessonDescription: props.translatedLessonDescription,
        numberOfSentences: props.numberOfSentences
      },
      {
        form: lessonDescriptionForm,
        instance: null,
        validationId: props.descriptionFieldsValidationId,
        targets: [ValidationTarget.TEST]
      }
    );
  },
  { immediate: true }
);

watch(
  () => props.isLessonFetched,
  (isLessonFetched) => {
    if (isLessonFetched) {
      courseNames.value = props.courseNameOnEdit;
      selectedCourseName.value = props.courseNameOnEdit[0] || '';
      categoryNames.value = props.categoryNameOnEdit;
      selectedCategoryName.value = props.categoryNameOnEdit[0] || '';
      lessonNames.value = props.lessonNameOnEdit;
      selectedLessonName.value = props.lessonNameOnEdit[0] || '';
    } else {
      courseNames.value = getCourseNames();
      selectedCourseName.value = '';
      selectedCategoryName.value = '';
      selectedLessonName.value = '';
      categoryNames.value = [];
      lessonNames.value = [];
    }
  },
  { immediate: true }
);

// Methods

function changeCourseSelectField(course: string) {
  selectedCourseName.value = course;
  emit('courseField', course);
  const structure = linkedCoursesCategoriesAndLessons.value;
  categoryNames.value = objectKeys(structure[course]) || [];
  selectedCategoryName.value = '';
  lessonNames.value = [];
}

function changeCategorySelectField(category: string) {
  selectedCategoryName.value = category;
  emit('categoryField', category);
  const structure = linkedCoursesCategoriesAndLessons.value;
  lessonNames.value = structure[selectedCourseName.value]?.[category] || [];
  selectedLessonName.value = '';
}

function changeLessonSelectField(lesson: string) {
  selectedLessonName.value = lesson;
  emit('lessonField', lesson);
}
</script>
