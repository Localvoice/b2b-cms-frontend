<template>
  <v-row>
    <v-col cols="12">
      <base-card v-sys-loading="loading">
        <v-card-title>
          <div class="d-flex justify-space-between flex-wrap">
            <v-btn class="ma-2" dark color="primary" @click="createLesson">
              <router-link :to="{ name: 'create-lesson' }" style="text-decoration: none; color: inherit">
                <v-icon>mdi-plus</v-icon>
                {{ $t('buttons.createLesson') }}
              </router-link>
            </v-btn>
            <button @click="fbInit">login</button>
          </div>
        </v-card-title>

        <v-card-title>
          Customers
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-spacer />
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
        </v-card-title>

        <v-data-table
          v-model="selected"
          :search="search"
          :headers="headers"
          :items="lessonList"
          item-key="id"
          class="elevation-1 table-one"
          multi-sort
        >
          <template #item.lesson="{ item }">
            <div class="d-flex align-center">
              <p class="ma-0 font-weight-medium">{{ item.lesson }}</p>
            </div>
          </template>

          <template #item.action="{ item }">
            <div class="d-flex">
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn color="success" dark icon v-bind="attrs" v-on="on">
                    <router-link
                      :to="{
                        name: 'create-lesson',
                        query: {
                          lessonName: item.lesson,
                          categoryName: item.category,
                          courseName: item.course
                        }
                      }"
                    >
                      <v-icon>mdi-pencil-box-outline</v-icon>
                    </router-link>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>

              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn color="danger" dark icon v-bind="attrs" v-on="on" @click="showDeleteDialogConfirmation(item)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </div>
          </template>

          <template #item.badge="{ item }">
            <v-chip :color="item.badge === 'Active' ? 'success' : 'danger'" label small text-color="white">
              <v-icon small left>
                {{ item.badge === 'Active' ? 'mdi-check' : 'mdi-close' }}
              </v-icon>
              {{ item.badge }}
            </v-chip>

            <v-dialog
              v-model="dialogDelete"
              max-width="800px"
              :retain-focus="false"
              hide-overlay
              content-class="v-dialog-localvoice"
            >
              <v-card>
                <v-card-title class="text-h5"> Jesteś pewny że chcesz usunąć tą lekcję? </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirmation">OK</v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </base-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { lessonActions } from '~app/modules/voicebot/lesson';
import LessonSummaryModel from '../models/lessonSummary';

const store = useStore();
const router = useRouter();
const { t } = useI18n();

const search = ref('');
const selected = ref([]);
const loading = ref(false);
const dialogDelete = ref(false);
const lessonToDelete = ref<LessonSummaryModel | Record<string, never>>({});

const headers = [
  { text: 'Lesson', align: 'start', value: 'lessonName' },
  { text: 'Category', value: 'categoryName' },
  { text: 'Course', value: 'courseName' },
  { text: 'Status', value: 'badge' },
  { text: 'Action', value: 'action' }
];

const lessonList = computed(() => store.getters['lessonList/getLessonList']);

const fetchlessonsList = () => store.dispatch('lessonList/fetchLessonsList');
const removeLesson = (payload: LessonSummaryModel) => store.dispatch('lessonList/removeLesson', payload);
const cleanLesson = () => store.dispatch('lesson/cleanLesson');

const createLesson = () => {
  cleanLesson();
  router.push({ name: 'create-lesson' });
};

const showDeleteDialogConfirmation = (lesson: LessonSummaryModel) => {
  lessonToDelete.value = lesson;
  dialogDelete.value = true;
};

const closeDeleteDialog = () => {
  lessonToDelete.value = {};
  dialogDelete.value = false;
};

const deleteItemConfirmation = () => {
  dialogDelete.value = false;
  if (Object.keys(lessonToDelete.value).length > 0) {
    removeLesson(lessonToDelete.value as LessonSummaryModel);
  }
  lessonToDelete.value = {};
};

const fbInit = () => {
  console.log('hello from fbInit');
  window.FB?.login(
    (response: any) => {
      console.log('response', response);
    },
    {
      scope: 'pages_messaging, email, pages_manage_engagement, pages_manage_metadata, pages_messaging_subscriptions',
      return_scopes: true
    }
  );
};

onMounted(() => {
  fetchlessonsList();
  console.log('on mounted');
});
</script>

<style lang="scss" scoped>
::v-deep .theme--light .table-one {
  thead.v-data-table-header {
    tr:hover {
      background-color: #f2f3f8;
    }
    th span {
      font-size: 16px;
      color: #304156;
    }
    td {
      padding: 20px 0;
    }
  }
  tbody tr:hover {
    background-color: #f2f3f8 !important;
  }
}

::v-deep .theme--dark .table-one {
  thead.v-data-table-header {
    tr:hover {
      background-color: #f2f3f8;
    }
    th span {
      font-size: 16px;
      color: #304156;
    }
    td {
      padding: 20px 0;
    }
  }
  tbody tr td {
    color: #fff;
  }
  tbody tr td:hover {
    color: #f2f3f8 !important;
  }
}
</style>
