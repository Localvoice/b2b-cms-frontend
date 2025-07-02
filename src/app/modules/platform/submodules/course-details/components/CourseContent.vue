<template>
  <v-row v-if="activeCourse">
    <v-col cols="12" lg="8">
      <v-card class="pa-4 mb-8" elevation="0" color="grey-lighten-5" border rounded="lg">
        <v-row class="mb-8" justify="space-between" align="center">
          <v-col cols="auto">
            <h5>Informacje o kursie</h5>
          </v-col>
          <v-col cols="auto" v-if="activeCourse.status">
            <StatusBox :status="activeCourse.status" />
          </v-col>
        </v-row>

        <v-card class="pa-4 mb-4" elevation="0" border rounded="lg">
          <v-row justify="space-between" align="end">
            <v-col cols="auto">
              <div class="d-flex align-center">
                <img
                  class="image-course h-full object-cover mr-4"
                  src="/images/course-icon-placeholder.png"
                  alt="course-icon"
                />
                <div>
                  <h5 class="course-title mb-1">{{ activeCourse.title }}</h5>
                  <p class="muted-text mb-2">W tym kursie nauczysz się słownictwa przydatnego przy podróżowaniu</p>
                  <div class="d-flex">
                    <v-chip class="chip mr-3 px-4" color="pink">{{ activeCourse.categories[0] }}</v-chip>
                    <v-chip
                      class="proficiency-level-chip px-4"
                      color="light"
                      variant="outlined"
                      v-if="activeCourse.proficiencyLevel"
                    >
                      <v-icon
                        :class="`proficiency-level-icon text-${proficiencyLevelMatcher[activeCourse.proficiencyLevel].color} mr-2`"
                        icon="mdi-poll"
                        size="x-small"
                      ></v-icon>
                      <span>
                        {{ proficiencyLevelMatcher[activeCourse.proficiencyLevel].label }}
                      </span>
                    </v-chip>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="auto">
              <v-btn class="options-btn" variant="outlined" icon="mdi-dots-horizontal"></v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-col cols="12" sm="6" xl="3">
            <v-card class="pa-4" elevation="0" border rounded="lg">
              <div class="d-flex align-center">
                <img class="mr-4" src="/images/lessons-icon-block2.png" alt="lesson-icon" />
                <div>
                  <h6 class="mb-1">3</h6>
                  <p class="muted-text">Liczba lekcji</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" xl="3">
            <v-card class="pa-4" elevation="0" border rounded="lg">
              <div class="d-flex align-center">
                <img class="mr-4" src="/images/students-icon-block.png" alt="students-icon" />
                <div>
                  <h6 class="mb-1">33</h6>
                  <p class="muted-text">Liczba studentów</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" xl="3">
            <v-card class="pa-4" elevation="0" border rounded="lg">
              <div class="d-flex align-center">
                <img class="mr-4" src="/images/date-icon-block.png" alt="date-icon" />
                <div>
                  <h6 class="mb-1">2024-10-15</h6>
                  <p class="muted-text">Data utworzenia</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" xl="3">
            <v-card class="pa-4" elevation="0" border rounded="lg">
              <div class="d-flex align-center">
                <img class="mr-4" src="/images/changes-icon-block.png" alt="changes-icon" />
                <div>
                  <h6 class="mb-1">2 dni temu</h6>
                  <p class="muted-text">Ostatnie zmiany</p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="pa-4" elevation="0" color="grey-lighten-5" border rounded="lg">
        <div v-if="draggableLessons.length > 0">
          <v-row align="end" justify="space-between" class="mb-8">
            <v-col cols="auto">
              <h5>Lekcje w kursie</h5>
              <p class="muted-text">{{ courseLessons.length }} lekcje</p>
            </v-col>
            <v-col cols="auto">
              <AddLessonDialog />
            </v-col>
          </v-row>
          <draggable :list="draggableLessons" handle="#drag-handle-lessons" item-key="lessonId" @end="onDragEnd">
            <template #item="{ element }">
              <CourseLessonCard :index="getIndex(element.lessonId)" :lesson="element" />
            </template>
          </draggable>
        </div>
        <div v-else>
          <EmptyView />
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4">
      <v-card class="pa-4" elevation="0" color="grey-lighten-5" border rounded="lg">
        <TestersList />
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref, computed, watch } from 'vue';
import EmptyView from './EmptyView.vue';
import CourseLessonCard from './CourseLessonCard.vue';
import TestersList from '../../../components/TestersList.vue';
import CourseModel from '../models/Course';
import { useStore } from 'vuex';
import { courseDetailsGetters } from '../store';
import LessonModel from '../models/Lesson';
import StatusBox from '~app/shared/stats/StatusBox.vue';
import AddLessonDialog from '../../../components/lessons/AddLessonDialog.vue';
import { proficiencyLevelMatcher } from '../../../utilities/constants';

const store = useStore();

const activeCourse = computed<CourseModel | null>(() => store.getters[courseDetailsGetters.getCourseDetails]);
const courseLessons = computed<LessonModel[]>(() => store.getters[courseDetailsGetters.getCourseLessons]);

const draggableLessons = ref([...courseLessons.value]);

const getIndex = (id: string) => {
  return courseLessons.value.findIndex((lesson) => lesson.lessonId === id);
};

const onDragEnd = () => {
  console.log('Drag end', draggableLessons.value);
};

watch(courseLessons, (newCourseLessons) => {
  draggableLessons.value = newCourseLessons;
});
</script>

<style lang="scss" scoped>
.course-title {
  color: #161d40;
  font-weight: 700;
  font-size: 16px;
}

.image-course {
  width: 100px;
  height: 100px;
}

.muted-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
.chip {
  font-size: 12px;
  font-weight: 600;
}

.proficiency-level-chip {
  font-size: 12px;
  font-weight: 600;
  color: #6b708a;
  border: 1px solid #f2f0ff;

  .proficiency-level-icon {
    font-size: 15px;
  }
}

.options-btn {
  border-color: #f2f0ff;
  width: 28px !important;
  height: 28px !important;
  font-size: 12px;
  color: #6b708a;
}
</style>
