<template>
  <v-row>
    <v-col cols="12" lg="5">
      <Card>
        <v-card class="pa-4" color="grey-lighten-5" border rounded="lg">
          <h5 class="muted-text mb-8">INFORMACJE O LEKCJI</h5>
          <v-card class="mb-8 pa-4" border rounded="lg">
            <v-row class="w-full" align="center">
              <v-col cols="12" lg="3">
                <img src="/images/placeholder-course-image.png" alt="course-image" />
              </v-col>
              <v-col cols="12" lg="9">
                <h5 class="mb-3">Jak się witać w restauracji?</h5>
                <div class="mb-3">
                  <StatusBox :status="'INACTIVE'" />
                </div>
                <v-chip color="pink">Przygotowania do egzaminu</v-chip>
              </v-col>
            </v-row>
          </v-card>
          <v-row class="w-full mb-4">
            <v-col cols="12" lg="6">
              <v-card class="pa-4" border rounded="lg">
                <div class="d-flex align-center">
                  <img class="mr-4" src="/images/money-icon-block.png" alt="money-icon" />
                  <div>
                    <h6 class="mb-1">Darmowa</h6>
                    <p class="muted-text">Typ subskrypcji</p>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card class="pa-4" border rounded="lg">
                <div class="d-flex align-center">
                  <img class="mr-4" src="/images/students-icon-block.png" alt="lessons-icon" />
                  <div>
                    <h6 class="mb-1">33</h6>
                    <p class="muted-text">Liczba studentów</p>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card class="pa-4" border rounded="lg">
                <div class="d-flex align-center">
                  <img class="mr-4" src="/images/date-icon-block.png" alt="date-icon" />
                  <div>
                    <h6 class="mb-1">2024-10-15</h6>
                    <p class="muted-text">Data utworzenia</p>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card class="pa-4" border rounded="lg">
                <div class="d-flex align-center">
                  <img class="mr-4" src="/images/changes-icon-block.png" alt="last-change-icon" />
                  <div>
                    <h6 class="mb-1">2 dni temu</h6>
                    <p class="muted-text">Ostatnie zmiany</p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-divider class="mb-4"></v-divider>
          <p class="muted-text mb-2">TESTERZY (5)</p>
          <p className="muted-text">
            Do wersji testowej mają dostęp tylko wybrani użytkownicy. Możesz ich edytować
            <router-link to="/app">tutaj.</router-link>
          </p>
        </v-card>
      </Card>
    </v-col>
    <v-col cols="12" lg="7">
      <div v-if="lessonsList.length > 0">
        <v-card class="pa-4" color="grey-lighten-5" border rounded="lg">
          <v-row class="mb-8" justify="space-between" align="center">
            <v-col cols="auto">
              <h5 class="mb-2">Przykłady w lekcji</h5>
              <p class="muted-text">5 przykładów</p>
            </v-col>
            <v-col cols="auto">
              <AddLessonDialog />
            </v-col>
          </v-row>
          <draggable :list="lessonsList" handle="#drag-handle" item-key="id" @end="onDragEnd">
            <template #item="{ element, index }">
              <LessonExample :title="element.title" :index="index" />
            </template>
          </draggable>
          <v-btn class="add-btn w-full d-flex justify-center py-6">
            <v-icon color="#FE5B14" icon="mdi-plus"></v-icon>
          </v-btn>
        </v-card>
      </div>
      <div v-else>
        <EmptyView />
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref, onMounted } from 'vue';
import { lessons } from '../dummyData/lessons';
import AddLessonDialog from '~app/modules/lessons/components/AddLessonDialog.vue';
import EmptyView from './EmptyView.vue';
import StatusBox from '~app/shared/stats/StatusBox.vue';
import LessonExample from './LessonExample.vue';

const lessonsList = ref(lessons.slice(0, 5));

const onDragEnd = () => {
  console.log('Drag end', lessonsList.value);
};
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
</style>
