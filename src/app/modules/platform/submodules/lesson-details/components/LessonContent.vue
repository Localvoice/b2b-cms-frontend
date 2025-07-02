<template>
  <v-row v-if="activeLesson">
    <v-col cols="12" lg="8">
      <v-card class="pa-4 mb-8" elevation="0" color="grey-lighten-5" border rounded="lg">
        <v-row class="mb-8" justify="space-between" align="center">
          <v-col cols="auto">
            <h5>Informacje o lekcji</h5>
          </v-col>
          <v-col cols="auto">
            <StatusBox :status="activeLesson.status" v-if="activeLesson.status" />
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
                  <h5 class="course-title mb-1">{{ activeLesson.title }}</h5>
                  <p class="muted-text mb-2">W tym kursie nauczysz się słownictwa przydatnego przy podróżowaniu</p>
                  <div class="d-flex">
                    <v-chip class="chip mr-3 px-4" color="pink">{{ activeLesson.category }}</v-chip>
                    <v-chip
                      class="proficiency-level-chip px-4"
                      color="light"
                      variant="outlined"
                      v-if="activeLesson.proficiencyLevel"
                    >
                      <v-icon
                        :class="`proficiency-level-icon text-${proficiencyLevelMatcher[activeLesson.proficiencyLevel].color} mr-2`"
                        icon="mdi-poll"
                        size="x-small"
                      ></v-icon>
                      <span>
                        {{ proficiencyLevelMatcher[activeLesson.proficiencyLevel].label }}
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
        <div v-if="draggableLessonExamples.length > 0">
          <v-row align="end" justify="space-between" class="mb-8">
            <v-col cols="auto">
              <h5>Lekcje w kursie</h5>
              <p class="muted-text">{{ activeLesson.lessonExamples.length }} lekcje</p>
            </v-col>
            <v-col cols="auto">
              <AddLessonDialog />
            </v-col>
          </v-row>
          <draggable :list="draggableLessonExamples" handle="#drag-handle-examples" item-key="phrase" @end="onDragEnd">
            <template #item="{ element }">
              <LessonExample
                :index="getLessonExampleIndex(element.phrase)"
                :phrase="element.phrase"
                :translatedPhrase="element.translatedPhrase"
                :tip="element.tip"
              />
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
import StatusBox from '~app/shared/stats/StatusBox.vue';
import LessonExample from '../../../components/lessons/LessonExample.vue';
import LessonModel from '../models/Lesson';
import { useStore } from 'vuex';
import { lessonDetailsGetters } from '../store';
import TestersList from '../../../components/TestersList.vue';
import { proficiencyLevelMatcher } from '../../../utilities/constants';

const store = useStore();
const activeLesson = computed<LessonModel | null>(() => store.getters[lessonDetailsGetters.getLessonDetails]);

const draggableLessonExamples = ref(activeLesson.value ? [...activeLesson.value.lessonExamples] : []);

const getLessonExampleIndex = (phrase: string) => {
  if (!activeLesson.value) return 0;
  return activeLesson.value.lessonExamples.findIndex((lesson) => lesson.phrase === phrase);
};

const onDragEnd = () => {
  console.log('Drag end', draggableLessonExamples.value);
};

watch(activeLesson, (newActiveLesson) => {
  if (!newActiveLesson) return;
  draggableLessonExamples.value = [...newActiveLesson.lessonExamples];
});
</script>

<style lang="scss" scoped>
.muted-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;

  a {
    color: #fe5b14;
  }
}
.lesson-chip {
  font-size: 13px;
  font-weight: 600;
}

.add-btn {
  font-size: 18px;
  box-shadow: none;
  background-color: #fff;
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
