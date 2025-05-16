<template>
  <Card>
    <v-row align="center" justify="space-between" class="mb-8">
      <v-col cols="auto">
        <div class="d-flex align-center">
          <router-link to="/app/courses">
            <v-btn class="outlined-btn mr-4" rounded="lg" variant="outlined" icon="mdi-arrow-left"></v-btn>
          </router-link>
          <h4 class="course-title mb-0">Wsiadanie, bilety, przesiadki - rozmówki w autobusie</h4>
        </div>
      </v-col>
      <v-col cols="auto">
        <v-btn v-if="isEditing" class="confirm-btn" rounded>Zapisz zmiany</v-btn>
      </v-col>
    </v-row>

    <v-tabs class="tabs mb-8 w-full" v-model="activeTab" @update:modelValue="onTabChange">
      <v-tab value="content">Zawartość lekcji</v-tab>
      <v-tab value="statistics">Statystyki</v-tab>
      <v-tab value="settings">Ustawienia</v-tab>
    </v-tabs>
    <div class="w-full" v-if="activeTab === 'settings'">
      <LessonSettings />
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '~app/shared/base/Card.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { lessonDetailsActions, lessonDetailsGetters } from '~app/modules/lessons/store';
import LessonSettings from '../components/LessonSettings.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const fetchLessonDetails = () => store.dispatch(lessonDetailsActions.fetchLessonDetails);
const setLessonEditing = () => store.dispatch(lessonDetailsActions.setLessonEditing);
const leaveLessonEditing = () => store.dispatch(lessonDetailsActions.leaveLessonEditing);

const activeTab = ref(route.query.tab || 'content');
const isEditing = computed(() => store.getters[lessonDetailsGetters.getEditingState]);

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

watch(activeTab, (newActiveTab) => {
  if (newActiveTab === 'settings') {
    setLessonEditing();
  } else {
    leaveLessonEditing();
  }
});

onMounted(() => {
  fetchLessonDetails();
  if (activeTab.value === 'settings') {
    setLessonEditing();
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
</style>
