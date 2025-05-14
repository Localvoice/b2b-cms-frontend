<template>
  <Card>
    <div class="d-flex align-center mb-8">
      <router-link to="/app/courses">
        <v-btn class="outlined-btn mr-4" rounded="lg" variant="outlined" icon="mdi-arrow-left"></v-btn>
      </router-link>
      <h4 class="course-title mb-0">Wsiadanie, bilety, przesiadki - rozmówki w autobusie</h4>
    </div>
    <v-tabs class="tabs mb-8 w-full" v-model="activeTab" @update:modelValue="onTabChange">
      <v-tab value="content">Zawartość kursu</v-tab>
      <v-tab value="statistics">Statystyki</v-tab>
      <v-tab value="settings">Ustawienia</v-tab>
    </v-tabs>
    <v-row v-if="activeTab === 'content'">
      <v-col lg="5">
        <Card>
          <h5 class="mb-8">Informacje o kursie</h5>
          <v-row class="w-full mb-8">
            <v-col lg="3">
              <img :src="CourseImage" alt="course-image" />
            </v-col>
            <v-col lg="9">
              <h5 class="mb-3">Wsiadanie, bilety, przesiadki - rozmówki w autobusie</h5>
              <p class="muted-text mb-3">W tym kursie nauczysz się słownictwa przydatnego przy podróżowaniu</p>
              <v-chip color="pink">Przygotowania do egzaminu</v-chip>
            </v-col>
          </v-row>
          <v-row class="w-full">
            <v-col lg="6">
              <v-card class="pa-4" border rounded="lg">
                <div class="d-flex align-center">
                  <img class="mr-4" :src="LessonsIcon" alt="lessons-icon" />
                  <div>
                    <h5 class="mb-1">3</h5>
                    <p class="muted-text">Liczba lekcji</p>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col lg="6">
              <v-card class="pa-4" border rounded="lg">
                <div class="d-flex align-center">
                  <img class="mr-4" :src="StudentsIcon" alt="lessons-icon" />
                  <div>
                    <h5 class="mb-1">33</h5>
                    <p class="muted-text">Liczba studentów</p>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col lg="6">
              <v-card class="pa-4" border rounded="lg">
                <div class="d-flex align-center">
                  <img class="mr-4" :src="DateIcon" alt="lessons-icon" />
                  <div>
                    <h5 class="mb-1">2024-10-15</h5>
                    <p class="muted-text">Data utworzenia</p>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col lg="6">
              <v-card class="pa-4" border rounded="lg">
                <div class="d-flex align-center">
                  <img class="mr-4" :src="ChangesIcon" alt="lessons-icon" />
                  <div>
                    <h5 class="mb-1">2 dni temu</h5>
                    <p class="muted-text">Ostatnie zmiany</p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </Card>
      </v-col>
      <v-col lg="7">
        <v-card class="pa-4" color="grey-lighten-5" border rounded="lg">
          <v-row class="mb-8" justify="space-between" align="center">
            <v-col cols="auto">
              <h5 class="mb-2">Lekcje w kursie</h5>
              <p class="muted-text">3 lekcje</p>
            </v-col>
            <v-col cols="auto">
              <v-btn class="confirm-btn" rounded>Stwórz nową lekcję</v-btn>
            </v-col>
          </v-row>
          <draggable :list="lessonsList" handle="#drag-handle" item-key="id" @end="onDragEnd">
            <template #item="{ element, index }">
              <v-card class="pa-2 mb-4" rounded="lg" border>
                <v-row justify="space-between" align="center">
                  <v-col cols="auto">
                    <div class="d-flex align-center">
                      <v-icon id="drag-handle" icon="mdi-drag-vertical" class="cursor-grab mr-1"></v-icon>
                      <v-chip class="lesson-chip mr-2" color="purple" variant="tonal">{{ index + 1 }}</v-chip>
                      <p class="muted-text">{{ element.title }}</p>
                    </div>
                  </v-col>
                  <v-col cols="auto">
                    <div class="d-flex align-center">
                      <div :class="['status-indicatior mr-2', getStatusClass(element.status)]"></div>
                      <p :class="['status-text', getStatusClass(element.status)]">
                        {{ getStatusLabel(element.status) }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="auto">
                    <v-menu location="start">
                      <template v-slot:activator="{ props }">
                        <v-btn variant="plain" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
                      </template>
                      <v-list class="py-0">
                        <v-list-item class="pa-0">
                          <v-btn class="menu-btn" variant="plain">Edytuj</v-btn>
                        </v-list-item>
                        <v-list-item class="pa-0">
                          <v-btn class="menu-btn" variant="plain">Odepnij lekcję od tego kursu</v-btn>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item class="pa-0">
                          <v-btn class="menu-btn text-error" variant="plain" append-icon="mdi-trash-can-outline"
                            >Usuń</v-btn
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </draggable>
        </v-card>
      </v-col>
    </v-row>
  </Card>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import Card from '~app/shared/base/Card.vue';
import CourseImage from '../../../../assets/images/course-image.png';
import LessonsIcon from '../../../../assets/images/lessons-icon.png';
import StudentsIcon from '../../../../assets/images/students-icon.png';
import DateIcon from '../../../../assets/images/date-icon.png';
import ChangesIcon from '../../../../assets/images/changes-icon.png';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { lessons } from '../dummyData/lessons';

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.query.tab || 'content');
const lessonsList = ref(lessons);

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'testing':
      return 'Lekcja testowana';
    case 'draft':
      return 'Lekcja w wersji roboczej';
    case 'published':
      return 'Lekcja opublikowana';
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'testing':
      return 'testing-status';
    case 'draft':
      return 'draft-status';
    case 'published':
      return 'published-status';
  }
};

const onDragEnd = () => {
  console.log('Drag end', lessonsList.value);
};

const onTabChange = (newTab: string) => {
  router.replace({
    query: {
      ...route.query,
      tab: newTab
    }
  });
};

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab && newTab !== activeTab.value) {
      activeTab.value = newTab;
    }
  }
);

watch(lessonsList, (newLessonsList) => {
  console.log('lessonsList', newLessonsList);
});
</script>

<style lang="scss">
.outlined-btn {
  border-color: #f2f0ff;
  color: #fe5b14;
}
.course-title {
  color: #161d40;
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
.muted-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
.confirm-btn {
  background-color: #fe5b14;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
.lesson-chip {
  font-size: 13px;
  font-weight: 600;
}

.status-indicatior {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  &.testing-status {
    border: 4px solid #e9effb;
    background-color: #2a61d9;
  }
  &.draft-status {
    border: 4px solid #fef7ed;
    background-color: #d27306;
  }
  &.published-status {
    border: 4px solid #f0fbf3;
    background-color: #05c22d;
  }
}
.status-text {
  font-weight: 600;
  font-size: 12px;
  &.testing-status {
    color: #2a61d9;
  }
  &.draft-status {
    color: #d27306;
  }
  &.published-status {
    color: #05c22d;
  }
}
.menu-btn {
  text-transform: initial;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  display: flex;
  justify-content: space-between;
}
</style>
