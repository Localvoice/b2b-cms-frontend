<script setup lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { v4 as uuid } from 'uuid';
import { router } from '~app/core/router';
import { areExampleCorrect, fillUpValidationForm, deleteValidationFields } from '~app/shared/validation';
import { FormGroup } from '~app/shared/form';
import { getQueryParameters } from '~app/shared/helpers/query';
import FixedButton from '~app/shared/fixedButton/fixedButton.vue';
import { translate } from '~app/core/i18n/i18n';
import { coerceArray } from '~app/shared/helpers/coerce';
import BasicInformation from '../components/BasicInformation.vue';
import TheSentence from '../components/TheSentence.vue';
import { LessonExercisesModel } from '../models/lessonExercises';
import { useLessonStore } from '../store/lesson'; // <-- assume you migrate to Pinia or composition-friendly Vuex store
import { LessonQuery } from '../types';

// store
const lessonStore = useLessonStore();

// router
const route = useRoute();

const instance = getCurrentInstance();
const proxy = instance?.proxy;

// reactive data
const transition = ref(false);
const hover = ref(false);
const fab = ref(false);
const isLessonFetched = ref(false);

const validationForm = ref<FormGroup<LessonExercisesModel>>({} as FormGroup<LessonExercisesModel>);
const selectedFieldsValidationId = ref(uuid());
const descriptionFieldsValidationId = ref(uuid());

const buttonsText = {
  save: translate('save'),
  test: translate('buttons.addLessonToTest'),
  production: translate('buttons.addLessonToProd')
};

// computed
const lesson = computed(() => lessonStore.lessonOnEdit);
const getNumberOfSentences = computed(() => lessonStore.getNumberOfSentences);

// watchers
watch(
  () => route.query,
  async () => {
    const queryParameters = getQueryParameters<LessonQuery>(
      route.query as any,
      'courseName',
      'categoryName',
      'lessonName'
    );

    if (queryParameters) {
      selectedFieldsValidationId.value = uuid();
      descriptionFieldsValidationId.value = uuid();
      validationForm.value = {} as ValidationForm<LessonExercisesModel>;

      await lessonStore.fetchLesson(queryParameters);
      isLessonFetched.value = true;
    }
  },
  { immediate: true }
);

// methods
function validation(validation: { id: string; data: FormGroup<LessonExercisesModel>; targets: string[] }) {
  fillUpValidationForm({
    id: validation.id,
    targets: validation.targets,
    validationForm: validationForm.value,
    data: validation.data
  });
  console.log('validationForm', validationForm.value);
}

function comprehensivelyRemoveSentence(data: { sentenceIndex: number; validationIds: string[] }) {
  deleteValidationFields({ validationIds: coerceArray(data.validationIds), validationForm: validationForm.value });
  lessonStore.removeSentence(data.sentenceIndex);
}

function comprehensivelyRemoveSentenceExample(data: {
  sentenceIndex: number;
  sentenceExampleIndex: number;
  validationId: string;
}) {
  deleteValidationFields({ validationIds: coerceArray(data.validationId), validationForm: validationForm.value });
  lessonStore.removeSentenceExample({
    sentenceIndex: data.sentenceIndex,
    sentenceExampleIndex: data.sentenceExampleIndex
  });
}

function saveLesson() {
  const result = areExampleCorrect({ validationForm: validationForm.value, target: 'SAVE' });
}

function addLessonToTestingEnvironment() {
  const result = areExampleCorrect({ validationForm: validationForm.value, target: 'TEST' });
  if (!result.isCorrect) {
    proxy?.$api.success(`Masz następujące błędy: ${result.errorMessages}`);
  } else {
    console.log('jest ok!!');
  }
}

function createNewLesson() {
  isLessonFetched.value = false;
  validationForm.value = {} as ValidationForm<LessonExercisesModel>;
  lessonStore.cleanLesson();
}

// lifecycle
onMounted(() => {
  createNewLesson();
});
</script>
