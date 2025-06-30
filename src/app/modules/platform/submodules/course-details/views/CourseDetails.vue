<template>
  <Card v-if="activeCourse">
    <v-row align="center" justify="space-between" class="mb-8">
      <v-col cols="auto">
        <div class="d-flex align-center">
          <router-link to="/app/courses">
            <v-btn class="go-back-btn mr-4" rounded="lg" variant="outlined" icon="mdi-arrow-left"></v-btn>
          </router-link>
          <h4 class="course-title mb-0">{{ activeCourse.title }}</h4>
        </div>
      </v-col>
      <v-col cols="auto">
        <v-row>
          <v-col cols="auto">
            <v-btn class="light-btn" rounded>Zapisz jako wersję roboczą</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn class="secondary-btn" rounded>Opublikuj kurs</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-tabs class="tabs mb-8 w-full" v-model="activeTab" @update:modelValue="onTabChange">
      <v-tab value="lessons">Lekcje</v-tab>
      <v-tab value="examples">Przykłady</v-tab>
      <v-tab value="statistics">Statystyki</v-tab>
      <v-tab value="settings">Ustawienia</v-tab>
    </v-tabs>
    <div class="w-full" v-if="activeTab === 'lessons'">
      <CourseContent />
    </div>
    <div class="w-full" v-if="activeTab === 'examples'">
      <CourseExamples />
    </div>
    <div class="w-full" v-if="activeTab === 'statistics'">
      <CourseStatistics />
    </div>
    <div class="w-full" v-if="activeTab === 'settings'">
      <CourseSettings />
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '~app/shared/base/Card.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { courseDetailsActions, courseDetailsGetters } from '../store';
import CourseContent from '../components/CourseContent.vue';
import CourseSettings from '../components/CourseSettings.vue';
import CourseExamples from '../components/CourseExamples.vue';
import CourseStatistics from '../components/CourseStatistics.vue';
import CourseModel from '../models/Course';

const route = useRoute();
const router = useRouter();
const store = useStore();

const fetchCourseDetails = (courseId: string) => store.dispatch(courseDetailsActions.fetchCourseDetails, { courseId });
const activeCourse = computed<CourseModel | null>(() => store.getters[courseDetailsGetters.getCourseDetails]);

const activeTab = ref(route.query.tab || 'lessons');

const onTabChange = (newTab: unknown) => {
  if (typeof newTab === 'string') {
    router.replace({
      query: {
        ...route.query,
        tab: newTab
      }
    });
  }
};

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab && newTab !== activeTab.value) {
      activeTab.value = newTab;
    }
  }
);

onMounted(() => {
  const courseId = route.params.courseId;
  if (!Array.isArray(courseId)) {
    fetchCourseDetails(courseId);
  }
});
</script>

<style lang="scss">
.confirm-btn {
  background-color: #fe5b14;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
.go-back-btn {
  border-color: #f2f0ff;
  color: #fe5b14;
}
.course-title {
  color: #161d40;
  font-size: 20px;
}
.tabs {
  border-bottom: 1px solid #f2f0ff;
}
.v-tab__slider {
  background-color: #7b62fe;
  height: 3px;
}
.v-slide-group__container .v-btn__content {
  font-weight: 600;
  font-size: 14px;
  color: #6b708a;
  text-transform: initial;
}
.secondary-btn {
  background-color: #7b62fe;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
.light-btn {
  background-color: #f2f0ff;
  font-weight: 700;
  font-size: 14px;
  color: #7b62fe;
  text-transform: initial;
  box-shadow: none;
}
</style>
