<template>
  <v-card
    v-if="!isEditing && lesson.lessonId"
    elevation="0"
    :class="[selectedLessonId === lesson.lessonId ? 'card-selected' : '', 'cursor-pointer pa-4 mb-4']"
    rounded="lg"
    border
    @click="selectLessonId(lesson.lessonId)"
  >
    <v-row justify="space-between" align="stretch">
      <v-col cols="auto" lg="8">
        <div class="d-flex">
          <div class="d-flex flex-column align-center mr-4">
            <v-chip class="chip mb-2" color="purple" variant="tonal">{{ index + 1 }}</v-chip>
            <v-icon id="drag-handle-lessons" icon="mdi-drag-vertical" class="cursor-grab d-block"></v-icon>
          </div>
          <div class="d-flex align-start">
            <img
              class="image-course h-full object-cover mr-4"
              src="/images/course-icon-placeholder.png"
              alt="course-icon"
            />
            <div>
              <h5 class="lesson-title mb-3">{{ lesson.title }}</h5>
              <p class="muted-text mb-3">W tym kursie nauczysz się słownictwa przydatnego przy podróżowaniu</p>
              <div class="d-flex">
                <v-chip class="chip mr-3 px-4" color="pink">{{ lesson.category }}</v-chip>
                <v-chip
                  class="proficiency-level-chip px-4 mr-3"
                  color="light"
                  variant="outlined"
                  v-if="lesson.proficiencyLevel"
                >
                  <v-icon
                    :class="`proficiency-level-icon text-${proficiencyLevelMatcher[lesson.proficiencyLevel].color} mr-2`"
                    icon="mdi-poll"
                    size="x-small"
                  ></v-icon>
                  <span>
                    {{ proficiencyLevelMatcher[lesson.proficiencyLevel].label }}
                  </span>
                </v-chip>
                <div
                  v-if="lesson.contentType !== undefined"
                  class="content-type-bullet"
                  :style="{ backgroundColor: contentTypeMatcher[lesson.contentType].backgroundColor }"
                >
                  <v-icon :icon="contentTypeMatcher[lesson.contentType].icon"></v-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="auto" lg="4">
        <div class="d-flex flex-column justify-space-between align-end h-full">
          <StatusBox v-if="lesson.status" :status="lesson.status" />
          <v-menu location="start">
            <template v-slot:activator="{ props }">
              <v-btn class="options-btn" variant="outlined" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
            </template>
            <v-list class="py-0">
              <v-list-item class="pa-0">
                <v-btn class="menu-btn" variant="plain" @click="isEditing = true">Edytuj</v-btn>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="pa-0">
                <v-btn class="menu-btn text-error" variant="plain" append-icon="mdi-trash-can-outline">Usuń</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
  </v-card>
  <v-card v-else elevation="0" class="pa-4 mb-4" rounded="lg" border>
    <v-row justify="end">
      <v-col cols="auto">
        <v-btn class="light-btn" rounded @click="isEditing = false">Anuluj</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="secondary-btn" rounded>Zapisz zmiany</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xl="2">
        <div class="image-wrapper">
          <img class="course-lesson-image" :src="imageUrl" alt="course-lesson-icon" />
          <v-btn
            @click="triggerFileInput"
            density="default"
            class="course-lesson-input-btn"
            icon="mdi-pencil-outline"
          ></v-btn>
          <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" class="d-none" />
        </div>
      </v-col>
      <v-col cols="12" xl="10">
        <LessonForm />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import StatusBox from '~app/shared/stats/StatusBox.vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LessonModel from '../../../models/Lesson';
import LessonForm from './LessonForm.vue';
import { proficiencyLevelMatcher } from '../../../utilities/constants';

defineProps<{
  lesson: LessonModel;
  index: number;
}>();

const isEditing = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const imageUrl = ref<string>('/images/course-icon-placeholder.png');

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && file.type.startsWith('image/')) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

const route = useRoute();
const router = useRouter();

const selectedLessonId = computed<string | null>(() => {
  const id = route.query.lessonId;
  return typeof id === 'string' ? id : null;
});

const selectLessonId = (lessonId: string) => {
  router.replace({
    query: {
      ...route.query,
      tab: 'examples',
      lessonId
    }
  });
};

const contentTypeMatcher = {
  GRAMMAR_LESSON: { icon: 'mdi-format-text', backgroundColor: '#2A61D9' },
  COURSE: { icon: 'mdi-format-text', backgroundColor: '#2A61D9' },
  PRONUNCIATION_LESSON: { icon: 'mdi-microphone', backgroundColor: '#05C22D' },
  DIALOGUE_LESSON: { icon: 'mdi-microphone', backgroundColor: '#05C22D' }
};
</script>

<style lang="scss" scoped>
.menu-btn {
  text-transform: initial;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  display: flex;
  justify-content: space-between;
}
.lesson-title {
  font-weight: 700;
  font-size: 14px;
  color: #161d40;
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
  width: 32px;
  height: 32px;
  font-size: 12px;
  color: #6b708a;
}
.card-selected {
  border: 3px solid #7b62fe;
}
.image-course {
  width: 100px;
  height: 100px;
}
.content-type-bullet {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
}
.image-wrapper {
  width: 140px;
  height: 140px;
  position: relative;
  background-color: #f2f0ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-lesson-image {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.course-lesson-input-btn {
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #7b62fe;
  color: #fff;
}
.muted-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
</style>
