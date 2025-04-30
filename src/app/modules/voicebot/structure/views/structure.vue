<template>
  <div>
    <v-sheet v-sys-loading="loadingStatus" elevation="8" class="mb-10">
      <fixed-button
        :save-fn="saveCourseStructure"
        :test-fn="addCourseStructureToTestingEnvironment"
        :prod-fn="addCourseStructureToTestingEnvironment"
        :buttons-text="buttonsText"
        :is-fixed-button="false"
      ></fixed-button>
      <course-carousel
        :courses="courses"
        @validation="validation"
        @courseIndex="changeCourseIndex"
        @addCourse="addCourse"
        @removeCourse="removeCourse"
        @updateStructure="updateStructure"
        @savePicture="savePicture"
        @removePicture="removePicture"
      ></course-carousel>
    </v-sheet>
    <v-sheet v-if="courses.length > 0" elevation="8">
      <category-group
        :course="courses[courseIndex]"
        :course-index="courseIndex"
        @savePicture="savePicture"
        @removePicture="removePicture"
        @updateStructure="updateStructure"
        @removeCategory="comprehensivelyRemoveCategory"
        @addLesson="addLesson"
        @addCategory="addCategory"
        @insertLesson="insertLesson"
        @insertCategory="insertCategory"
        @removeLesson="comprehensivelyRemoveLesson"
        @validation="validation"
      ></category-group>
    </v-sheet>
    <fixed-button
      :save-fn="saveCourseStructure"
      :test-fn="addCourseStructureToTestingEnvironment"
      :prod-fn="addCourseStructureToTestingEnvironment"
      :buttons-text="buttonsText"
    ></fixed-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { translate } from '~app/core/i18n/i18n';
import { coerceArray } from '~app/shared/helpers/coerce';
import { objectKeys } from '~app/shared/helpers/lang';
import { StructureValidationForm, VoicebotButtonsText, ValidationTarget, ValidationForm } from '~app/shared/types';
import { CourseStructureModel } from '../models/courseStructure';

export default defineComponent({
  setup() {
    const store = useStore();

    // Reactive data
    const courseIndex = ref(0);
    const validated = ref(false);
    const validationForm = ref<StructureValidationForm<CourseStructureModel>>({});
    const buttonsText = ref<VoicebotButtonsText>({
      save: translate('save'),
      test: translate('buttons.addStructureToTest'),
      production: translate('buttons.addStructureToProd')
    });

    // Computed properties
    const courses = computed(() => store.getters['voicebot/getStructure']);
    const loadingStatus = computed(() => store.getters['loading/getStructureLoadingStatus']);

    // Watchers
    watch(courseIndex, (newCourseIndex) => {
      let id: any;
      objectKeys(validationForm.value).forEach((course) => {
        objectKeys(validationForm.value[course]).forEach((target) => {
          objectKeys(validationForm.value[course][target]).forEach((form) => {
            id = validationForm.value[course][target][form] as any;
            id.clearErrors();
          });
        });
      });
      validationForm.value = {} as StructureValidationForm<CourseStructureModel>;
      validationForm.value[courseIndex.value] = {} as ValidationForm<CourseStructureModel>;
      [ValidationTarget.SAVE, ValidationTarget.TEST].forEach((target) => {
        validationForm.value[courseIndex.value][target] = {};
      });
    });

    // Methods
    // const linkCurrentCourseCategoriesAndLessons = store.dispatch.bind(
    //   store,
    //   'voicebot/linkCurrentCourseCategoriesAndLessons'
    // );
    // const updateStructure = store.dispatch.bind(store, 'voicebot/updateStructure');
    // const savePicture = store.dispatch.bind(store, 'voicebot/savePicture');
    // const addLesson = store.dispatch.bind(store, 'voicebot/addLesson');
    // const insertLesson = store.dispatch.bind(store, 'voicebot/insertLesson');
    // const removeLesson = store.dispatch.bind(store, 'voicebot/removeLesson');
    // const insertCategory = store.dispatch.bind(store, 'voicebot/insertCategory');
    // const removeCategory = store.dispatch.bind(store, 'voicebot/removeCategory');
    // const addCategory = store.dispatch.bind(store, 'voicebot/addCategory');
    // const addCourse = store.dispatch.bind(store, 'voicebot/addCourse');
    // const removeCourse = store.dispatch.bind(store, 'voicebot/removeCourse');
    // const removePicture = store.dispatch.bind(store, 'voicebot/removePicture');
    // const setLoadingStatus = store.dispatch.bind(store, 'loading/addVoicebotStructureLoadingStatus');

    // Methods (converted from methods)
    const comprehensivelyRemoveCategory = (data: {
      courseIndex: number;
      categoryIndex: number;
      validationIds: string[];
    }) => {
      // deleteValidationFields({
      //   validationIds: coerceArray(data.validationIds),
      //   validationForm: validationForm.value[courseIndex.value]
      // });
      // removeCategory({ courseIndex: data.courseIndex, categoryIndex: data.categoryIndex });
    };

    const comprehensivelyRemoveLesson = (data: {
      courseIndex: number;
      categoryIndex: number;
      lessonIndex: number;
      validationId: string;
    }) => {
      // deleteValidationFields({
      //   validationIds: coerceArray(data.validationId),
      //   validationForm: validationForm.value[courseIndex.value]
      // });
      // removeLesson({
      //   courseIndex: data.courseIndex,
      //   categoryIndex: data.categoryIndex,
      //   lessonIndex: data.lessonIndex
      // });
    };

    const changeCourseIndex = (index: number) => {
      courseIndex.value = index;
    };

    const saveCourseStructure = () => {
      console.log(
        'areExampleCorrect'
        // areExampleCorrect({ validationForm: validationForm.value[courseIndex.value], target: ValidationTarget.SAVE })
      );
    };

    const addCourseStructureToTestingEnvironment = () => {
      // const result = areExampleCorrect({
      //   validationForm: validationForm.value[courseIndex.value],
      //   target: ValidationTarget.TEST
      // });
      // console.log('result', result);
      // if (!result.isCorrect) {
      //   router.app.$toast.success(this.$t('message.hello'));
      // } else {
      //   console.log('jest ok!!');
      // }
      // linkCurrentCourseCategoriesAndLessons(courseIndex.value);
    };

    const validation = (validation: { courseIndex: number; id: string; data: any; targets: ValidationTarget[] }) => {
      if (!validationForm.value[validation.courseIndex]) {
        validationForm.value[validation.courseIndex] = {} as ValidationForm<CourseStructureModel>;
      }
      const validationFormData = validationForm.value[validation.courseIndex];

      // fillUpValidationForm({
      //   id: validation.id,
      //   targets: validation.targets,
      //   validationForm: validationFormData,
      //   data: validation.data
      // });
    };

    return {
      courseIndex,
      validated,
      validationForm,
      buttonsText,
      courses,
      loadingStatus,
      saveCourseStructure,
      addCourseStructureToTestingEnvironment,
      validation,
      comprehensivelyRemoveCategory,
      comprehensivelyRemoveLesson,
      changeCourseIndex
      // savePicture,
      // removePicture,
      // updateStructure,
      // addCourse,
      // removeCourse,
      // addLesson,
      // insertLesson,
      // removeLesson,
      // insertCategory,
      // removeCategory,
      // addCategory
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
