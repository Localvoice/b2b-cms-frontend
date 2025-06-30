<template>
  <div>
    <v-card class="pa-4 mb-8" elevation="0" color="grey-lighten-5" border rounded="lg">
      <v-row class="mb-8" justify="space-between">
        <v-col cols="auto">
          <p class="card-label mb-6">DODAJ NOWYCH TESTERÓW</p>
        </v-col>
        <v-col cols="auto">
          <v-btn class="submit-btn" rounded :disabled="testersEmails.length === 0">{{ submitButtonLabel }}</v-btn>
        </v-col>
      </v-row>
      <form @submit.prevent="addTesterEmail">
        <label for="testerEmail" class="form-label">Zaproś testerów</label>
        <v-sheet
          :class="['d-flex flex-wrap border align-center px-3 pb-2', { 'pt-2': testersEmails.length > 0 }]"
          rounded="xl"
        >
          <v-chip class="tester-email-chip mr-1" color="light" v-for="email in testersEmails">
            {{ email }}
            <v-btn
              size="small"
              density="compact"
              variant="plain"
              icon="mdi-close"
              class="ml-1"
              @click="removeTesterEmail(email)"
            ></v-btn>
          </v-chip>
          <v-text-field
            id="testerEmail"
            type="email"
            v-model="testerEmail"
            variant="plain"
            density="compact"
            placeholder="Pisz tutaj..."
            :class="['px-3', { 'pb-2': testersEmails.length > 0 }]"
            hide-details
          ></v-text-field>
        </v-sheet>
      </form>
    </v-card>
    <v-card class="pa-4" color="grey-lighten-5" elevation="0" border rounded="lg">
      <p class="card-label mb-6">AKTYWNI TESTERZY</p>
      <v-card class="pa-4 mb-4" elevation="0" border rounded="lg">
        <v-row align="center" justify="space-between" class="w-full">
          <v-col cols="auto">
            <h6 class="tester-email">jan.kowalski@gmail.com</h6>
            <p class="muted-text">Dołączył: 15.01.2025</p>
          </v-col>
          <v-col cols="auto" class="pr-0">
            <div class="d-flex">
              <v-chip class="chip mr-2" color="green">Aktywny</v-chip>
              <v-btn class="options-btn" variant="outlined" icon="mdi-dots-horizontal"></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="pa-4 mb-4" elevation="0" border rounded="lg">
        <v-row align="center" justify="space-between" class="w-full">
          <v-col cols="auto">
            <h6 class="tester-email">jan.kowalski@gmail.com</h6>
            <p class="muted-text">Dołączył: 15.01.2025</p>
          </v-col>
          <v-col cols="auto" class="pr-0">
            <div class="d-flex">
              <v-chip class="chip mr-2" color="orange">Wysłane zaproszenie</v-chip>
              <v-btn class="options-btn" variant="outlined" icon="mdi-dots-horizontal"></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const testerEmail = ref('');
const testersEmails = ref<string[]>([]);
const submitButtonLabel = computed<string>(() => {
  if (testersEmails.value.length === 0) return 'Wyślij zaproszenie';
  if (testersEmails.value.length === 1) return `Wyślij zaproszenie do ${testersEmails.value.length} osoby`;
  return `Wyślij zaproszenie do ${testersEmails.value.length} osób`;
});

const addTesterEmail = () => {
  testersEmails.value.push(testerEmail.value);
  testerEmail.value = '';
};

const removeTesterEmail = (email: string) => {
  testersEmails.value = testersEmails.value.filter((testerEmail) => testerEmail !== email);
};
</script>

<style lang="scss" scoped>
.submit-btn {
  background-color: #7b62fe;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
.tester-email-chip {
  color: #3b4471;
}
.options-btn {
  border-color: #f2f0ff;
  width: 32px;
  height: 32px;
  font-size: 12px;
  color: #6b708a;
}
.tester-email {
  color: #3b4471;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 0;
}
.chip {
  font-size: 12px;
  font-weight: 600;
}
.form-label {
  color: #3b4471;
  font-weight: 600;
  font-size: 14px;
  display: block;
  margin-bottom: 8px;
}
</style>
