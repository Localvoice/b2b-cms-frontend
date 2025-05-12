<template>
  <v-dialog max-width="550" :activator="btn">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" class="confirm-btn" rounded>Dodaj nowy kurs</v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="dialog-card pa-8">
        <v-row class="w-full mb-8" justify="space-between" align="center">
          <v-col cols="auto" class="pa-0">
            <v-card-title class="dialog-title">Nowy kurs</v-card-title>
          </v-col>
          <v-col cols="auto" class="pa-0">
            <v-btn icon="mdi-close" size="small" rounded="lg" @click="isActive.value = false"></v-btn>
          </v-col>
        </v-row>
        <v-form @submit.prevent="submitCourse">
          <h6 class="mb-2">Tytuł</h6>
          <v-text-field
            id="title"
            density="compact"
            rounded
            variant="outlined"
            required
            :rules="[titleRules.required]"
            placeholder="Wpisz tytuł"
            v-model="title"
          ></v-text-field>
          <h6>Poziom trudności</h6>
          <v-radio-group v-model="difficultyLevel" hide-details>
            <v-row class="w-full mt-1 mb-4">
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="difficultyLevel === 'a1' ? 'purple' : 'white'"
                  :variant="difficultyLevel === 'a1' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="difficultyLevel === 'a1' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="A1"
                    value="a1"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="difficultyLevel === 'a2' ? 'purple' : 'white'"
                  :variant="difficultyLevel === 'a2' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="difficultyLevel === 'a2' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="A2"
                    value="a2"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="difficultyLevel === 'b1' ? 'purple' : 'white'"
                  :variant="difficultyLevel === 'b1' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="difficultyLevel === 'b1' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="B1"
                    value="b1"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="difficultyLevel === 'b2' ? 'purple' : 'white'"
                  :variant="difficultyLevel === 'b2' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="difficultyLevel === 'b2' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="B2"
                    value="b2"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="difficultyLevel === 'c1' ? 'purple' : 'white'"
                  :variant="difficultyLevel === 'c1' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="difficultyLevel === 'c1' ? 'purple' : 'gray'"
                    density="compact"
                    hide-details
                    label="C1"
                    value="c1"
                  ></v-radio>
                </v-chip>
              </v-col>
              <v-col cols="auto" class="pa-1">
                <v-chip
                  :color="difficultyLevel === 'c2' ? 'purple' : 'white'"
                  :variant="difficultyLevel === 'c2' ? 'tonal' : 'elevated'"
                >
                  <v-radio
                    :color="difficultyLevel === 'c2' ? 'purple' : 'gray'"
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
                v-model="category"
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
          <v-btn type="submit" class="w-full confirm-btn" rounded> Dodaj kurs </v-btn>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const title = ref('');
const difficultyLevel = ref('');
const category = ref('');
const enteredCategory = ref<string | null>(null);

const titleRules = {
  required: (v: string) => !!v || 'Tytuł jest wymagany'
};

const addCategory = (e: Event) => {
  e.stopPropagation();
  if (category.value === '') return;

  enteredCategory.value = category.value;
  category.value = '';
};

const resetCategory = () => {
  enteredCategory.value = null;
};

const submitCourse = () => {
  console.log('submit course');
};
</script>

<style lang="scss">
.dialog-card {
  background-color: #f9f9fb;
}
.dialog-title {
  color: #161d40;
  font-weight: 700;
  font-size: 20px;
}
.confirm-btn {
  background-color: #fe5b14;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
.v-field__field {
  background-color: white;
}
</style>
