<template>
  <v-card
    elevation="0"
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
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps<{
  lessonId: string;
  index: number;
  title: string;
  status: string;
}>();

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
