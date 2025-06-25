<template>
  <v-card
    :class="[selectedLessonId === lessonId ? 'card-selected' : '', 'cursor-pointer pa-4 mb-4']"
    rounded="lg"
    border
    @click="selectLessonId(lessonId)"
  >
    <v-row justify="space-between" align="center">
      <v-col cols="auto">
        <div class="d-flex align-center">
          <v-icon id="drag-handle-lessons" icon="mdi-drag-vertical" class="cursor-grab mr-1"></v-icon>
          <v-chip class="chip mr-2" color="purple" variant="tonal">{{ index + 1 }}</v-chip>
        </div>
      </v-col>
      <v-col cols="auto">
        <StatusBox :status="status" />
      </v-col>
    </v-row>
    <v-row class="mt-0" justify="space-between" align="center">
      <v-col cols="auto">
        <h5 class="lesson-title">{{ title }}</h5>
      </v-col>
      <v-col cols="auto">
        <v-menu location="start">
          <template v-slot:activator="{ props }">
            <v-btn class="options-btn" variant="outlined" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
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
              <v-btn class="menu-btn text-error" variant="plain" append-icon="mdi-trash-can-outline">Usuń</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import StatusBox from '~app/shared/stats/StatusBox.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { courseDetailsActions, courseDetailsGetters } from '../store';

const store = useStore();

const selectedLessonId = computed<string | null>(() => store.getters[courseDetailsGetters.getSelectedLessonId]);
const selectLessonId = (lessonId: string) => store.dispatch(courseDetailsActions.selectLessonId, { lessonId });

defineProps<{
  lessonId: string;
  index: number;
  title: string;
  status: string;
}>();
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
</style>
