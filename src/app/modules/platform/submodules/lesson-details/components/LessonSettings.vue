<template>
  <v-row class="w-full">
    <v-col cols="12" md="4" lg="3">
      <v-card class="pa-8" color="grey-lighten-5" border rounded="lg">
        <p class="card-label mb-4">IKONA LEKCJI</p>
        <img class="w-full mb-4" :src="imageUrl" alt="course-image" />
        <v-btn @click="triggerFileInput" class="secondary-btn w-full" rounded>Zmień zdjęcie</v-btn>
        <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" class="d-none" />
      </v-card>
    </v-col>
    <v-col cols="12" md="8" lg="9">
      <v-card class="pa-8" color="grey-lighten-5" border rounded="lg">
        <v-row class="mb-4" align="center" justify="space-between">
          <v-col cols="auto">
            <p class="card-label">USTAWIENIA LEKCJI</p>
          </v-col>
          <v-col cols="auto">
            <v-btn class="secondary-btn" rounded>Zapisz zmiany</v-btn>
          </v-col>
        </v-row>
        <form>
          <h6 class="mb-2">Tytuł</h6>
          <v-text-field
            id="title"
            density="compact"
            rounded
            variant="outlined"
            bg-color="white"
            required
            :rules="[titleRules.required]"
            placeholder="Wpisz tytuł"
            v-model="form.title"
          ></v-text-field>
          <h6 class="mb-2">Kategoria</h6>
          <form @submit.prevent="addCategory">
            <v-sheet :class="['d-flex border px-1 pb-2 mb-8', { 'pt-2': enteredCategory }]" rounded="xl">
              <v-text-field
                v-model="form.category"
                variant="plain"
                density="compact"
                placeholder="Wpisz kategorie"
                class="px-3"
                hide-details
                v-if="!enteredCategory"
              ></v-text-field>
              <v-chip color="pink" v-if="enteredCategory">
                {{ enteredCategory }}
                <v-btn
                  size="small"
                  density="compact"
                  variant="plain"
                  icon="mdi-close"
                  class="ml-1"
                  @click="resetCategory"
                ></v-btn>
              </v-chip>
            </v-sheet>
          </form>
          <h6 class="mb-2">Typ subskrypcji</h6>
          <v-select
            :items="['Darmowa', 'Premium']"
            density="compact"
            v-model="form.subscriptionType"
            bg-color="white"
            rounded
            class="select mb-4"
          >
          </v-select>
          <h6 class="mb-2">Wersja</h6>
          <v-text-field
            id="version"
            density="compact"
            rounded
            variant="outlined"
            bg-color="white"
            required
            :rules="[versionRules.required]"
            placeholder="Wpisz wersje"
            v-model="form.version"
          ></v-text-field>
        </form>
        <p class="card-label mb-4">INNE OPCJE</p>
        <v-row align="center">
          <v-col cols="auto">
            <v-btn class="delete-btn" rounded>Usuń kurs</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn class="remove-btn" color="purple" variant="tonal" rounded>Odepnij lekcję od kursu</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { lessonDetailsGetters } from '../store';

const form = reactive({
  title: '',
  category: '',
  subscriptionType: 'Darmowa',
  version: ''
});

const titleRules = {
  required: (v: string) => !!v || 'Tytuł jest wymagany'
};

const versionRules = {
  required: (v: string) => !!v || 'Wersja jest wymagany'
};

const store = useStore();

const fileInput = ref<HTMLInputElement | null>(null);
const imageUrl = ref<string>('/images/course-icon-block.png');
const category = ref('');
const enteredCategory = ref<string | null>(null);

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

const addCategory = (e: Event) => {
  e.stopPropagation();
  if (form.category === '') return;

  enteredCategory.value = form.category;
  form.category = '';
};

const resetCategory = () => {
  enteredCategory.value = null;
};
</script>

<style lang="scss">
.card-label {
  color: #6b708a;
  font-weight: 600;
  font-size: 12px;
}
.secondary-btn {
  background-color: #7b62fe;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
.select .v-field__outline {
  display: none;
}
.delete-btn {
  background-color: #dd1a43;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
.remove-btn {
  text-transform: initial;
  font-weight: 700;
  font-size: 14px;
}
</style>
