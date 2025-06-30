<template>
  <Card>
    <v-row align="center" justify="space-between" class="w-full">
      <v-col cols="auto">
        <h4>Ustawienia</h4>
      </v-col>
      <v-col cols="auto">
        <v-btn v-if="activeTab === 'basic-informations'" class="confirm-btn" rounded @click="handleEditingClick">{{
          isEditing ? 'Zapisz zmiany' : 'Edytuj informacje'
        }}</v-btn>
      </v-col>
    </v-row>
    <v-tabs class="tabs mb-12 w-full" v-model="activeTab" @update:modelValue="onTabChange">
      <v-tab value="basic-informations">Podstawowe informacje</v-tab>
      <v-tab value="avatar">Awatar</v-tab>
      <v-tab value="testers">Lista testerów</v-tab>
    </v-tabs>
    <v-row justify="center">
      <v-col cols="12" xl="6">
        <div class="w-full" v-if="activeTab === 'basic-informations'">
          <v-card elevation="0" class="pa-4" color="grey-lighten-5" border rounded="lg">
            <p class="card-label mb-6">PODSTAWOWE INFORMACJE</p>
            <BasicInfoForm />
          </v-card>
        </div>
        <div class="w-full" v-if="activeTab === 'avatar'">
          <v-card elevation="0" class="pa-4" color="grey-lighten-5" border rounded="lg">
            <p class="card-label mb-6">AWATAR</p>
            <AvatarForm />
          </v-card>
        </div>
        <div class="w-full" v-if="activeTab === 'testers'">
          <TestersForm />
        </div>
      </v-col>
    </v-row>
  </Card>
</template>

<script setup lang="ts">
import Card from '~app/shared/base/Card.vue';
import { computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { userDataActions, userDataGetters } from '../store';
import BasicInfoForm from '../components/BasicInfoForm.vue';
import AvatarForm from '../components/AvatarForm.vue';
import TestersForm from '../components/TestersForm.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const activeTab = ref(route.query.tab || 'basic-informations');

const store = useStore();
const toggleEditing = () => store.dispatch(userDataActions.toggleEditing);
const isEditing = computed(() => store.getters[userDataGetters.getEditingState]);
const userData = computed(() => store.getters[userDataGetters.getUserData]);

const handleEditingClick = () => {
  if (isEditing.value) {
    console.log('userData changed', userData.value);
  }
  toggleEditing();
};

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
  if (route.query.tab) {
    activeTab.value = route.query.tab;
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
.card-label {
  color: #6b708a;
  font-weight: 600;
  font-size: 12px;
}
.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.label {
  font-weight: 600;
  font-size: 14px;
  color: #3b4471;
}
.muted-text {
  font-weight: 600;
  font-size: 13px;
  color: #6b708a;
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
