<template>
  <Card>
    <v-row align="center" justify="space-between" class="w-full">
      <v-col cols="auto">
        <h4>Ustawienia</h4>
      </v-col>
      <v-col cols="auto">
        <v-btn class="confirm-btn" rounded @click="handleEditingClick">{{
          isEditing ? 'Zapisz zmiany' : 'Edytuj informacje'
        }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card class="pa-4 h-full" color="grey-lighten-5" border rounded="lg">
          <p class="card-label mb-6">PODSTAWOWE INFORMACJE</p>
          <BasicInfoForm />
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card class="pa-4 h-full" color="grey-lighten-5" border rounded="lg">
          <p class="card-label mb-6">DANE DO FAKTURY</p>
          <InvoiceDataForm />
        </v-card>
      </v-col>
    </v-row>
  </Card>
</template>

<script setup lang="ts">
import Card from '~app/shared/base/Card.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { userDataActions, userDataGetters } from '../store';
import BasicInfoForm from '../components/BasicInfoForm.vue';
import InvoiceDataForm from '../components/InvoiceDataForm.vue';

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
</style>
