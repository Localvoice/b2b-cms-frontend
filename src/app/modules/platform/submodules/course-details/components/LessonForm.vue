<template>
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
    <h6 class="mb-2">Opis</h6>
    <v-text-field
      id="description"
      density="compact"
      rounded
      variant="outlined"
      bg-color="white"
      required
      :rules="[descriptionRules.required]"
      placeholder="Wpisz opis"
      v-model="form.description"
    ></v-text-field>
    <h6>Poziom trudności</h6>
    <v-radio-group v-model="form.difficultyLevel" hide-details>
      <v-row class="w-full mt-1 mb-4">
        <v-col cols="auto" class="pa-1">
          <v-chip
            :color="form.difficultyLevel === 'a1' ? 'purple' : 'white'"
            :variant="form.difficultyLevel === 'a1' ? 'tonal' : 'elevated'"
            elevation="0"
            border
          >
            <v-radio
              :color="form.difficultyLevel === 'a1' ? 'purple' : 'gray'"
              density="compact"
              hide-details
              label="A1"
              value="a1"
            ></v-radio>
          </v-chip>
        </v-col>
        <v-col cols="auto" class="pa-1">
          <v-chip
            :color="form.difficultyLevel === 'a2' ? 'purple' : 'white'"
            :variant="form.difficultyLevel === 'a2' ? 'tonal' : 'elevated'"
            elevation="0"
            border
          >
            <v-radio
              :color="form.difficultyLevel === 'a2' ? 'purple' : 'gray'"
              density="compact"
              hide-details
              label="A2"
              value="a2"
            ></v-radio>
          </v-chip>
        </v-col>
        <v-col cols="auto" class="pa-1">
          <v-chip
            :color="form.difficultyLevel === 'b1' ? 'purple' : 'white'"
            :variant="form.difficultyLevel === 'b1' ? 'tonal' : 'elevated'"
            elevation="0"
            border
          >
            <v-radio
              :color="form.difficultyLevel === 'b1' ? 'purple' : 'gray'"
              density="compact"
              hide-details
              label="B1"
              value="b1"
            ></v-radio>
          </v-chip>
        </v-col>
        <v-col cols="auto" class="pa-1">
          <v-chip
            :color="form.difficultyLevel === 'b2' ? 'purple' : 'white'"
            :variant="form.difficultyLevel === 'b2' ? 'tonal' : 'elevated'"
            elevation="0"
            border
          >
            <v-radio
              :color="form.difficultyLevel === 'b2' ? 'purple' : 'gray'"
              density="compact"
              hide-details
              label="B2"
              value="b2"
            ></v-radio>
          </v-chip>
        </v-col>
        <v-col cols="auto" class="pa-1">
          <v-chip
            :color="form.difficultyLevel === 'c1' ? 'purple' : 'white'"
            :variant="form.difficultyLevel === 'c1' ? 'tonal' : 'elevated'"
            elevation="0"
            border
          >
            <v-radio
              :color="form.difficultyLevel === 'c1' ? 'purple' : 'gray'"
              density="compact"
              hide-details
              label="C1"
              value="c1"
            ></v-radio>
          </v-chip>
        </v-col>
        <v-col cols="auto" class="pa-1">
          <v-chip
            :color="form.difficultyLevel === 'c2' ? 'purple' : 'white'"
            :variant="form.difficultyLevel === 'c2' ? 'tonal' : 'elevated'"
            elevation="0"
            border
          >
            <v-radio
              :color="form.difficultyLevel === 'c2' ? 'purple' : 'gray'"
              density="compact"
              hide-details
              label="C2"
              value="c2"
            ></v-radio>
          </v-chip>
        </v-col>
      </v-row>
    </v-radio-group>
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
      class="mb-4"
      variant="outlined"
      rounded
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
      class="mb-4"
    ></v-text-field>
    <p class="card-label mb-4">INNE OPCJE</p>
    <v-row align="center">
      <v-col cols="auto">
        <v-btn class="delete-btn" rounded>Usuń kurs</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="light-btn" color="purple" variant="tonal" rounded>Odepnij lekcję od kursu</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

const form = reactive({
  title: '',
  description: '',
  difficultyLevel: '',
  category: '',
  subscriptionType: 'Darmowa',
  version: ''
});

const titleRules = {
  required: (v: string) => !!v || 'Tytuł jest wymagany'
};

const descriptionRules = {
  required: (v: string) => !!v || 'Opis jest wymagany'
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

<style lang="scss" scoped></style>
