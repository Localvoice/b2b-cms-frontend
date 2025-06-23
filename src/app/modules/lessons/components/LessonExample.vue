<template>
  <div class="d-flex mb-4">
    <div class="d-flex flex-column align-center mr-4">
      <v-icon id="drag-handle" icon="mdi-drag-vertical" class="cursor-grab mb-4"></v-icon>
      <v-icon icon="mdi-trash-can-outline" class="cursor-pointer text-error" style="font-size: 18px"></v-icon>
    </div>
    <v-card class="pa-4 flex-1" rounded="lg" border>
      <div class="d-flex align-center mb-6">
        <v-chip class="lesson-chip mr-2" color="purple" variant="tonal">{{ index + 1 }}</v-chip>
        <p class="muted-text">{{ title }}</p>
      </div>
      <div class="d-flex align-center mb-2">
        <v-chip class="language-chip mr-4" color="blue" variant="tonal">ENG</v-chip>
        <v-text-field
          type="text"
          class="textfield"
          density="compact"
          placeholder="ENG"
          hide-details
          rounded
          variant="outlined"
        ></v-text-field>
      </div>
      <div class="d-flex align-center mb-4">
        <v-chip class="language-chip mr-4" color="red" variant="tonal">PL</v-chip>
        <v-text-field
          type="text"
          class="textfield"
          density="compact"
          placeholder="PL"
          hide-details
          rounded
          variant="outlined"
        ></v-text-field>
      </div>
      <v-row align="center">
        <v-col cols="auto">
          <v-switch color="purple" hide-details v-model="hintEnabled"></v-switch>
        </v-col>
        <v-col cols="auto">
          <p class="muted-text">Chcę uwzględnić ‘Zwróć uwagę na..’</p>
        </v-col>
      </v-row>
      <v-textarea
        v-if="hintEnabled"
        v-model="hintContent"
        variant="outlined"
        placeholder="Zwróć uwagę na..."
        rounded
        hide-details
        no-resize
        rows="3"
      ></v-textarea>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string;
  index: number;
}>();

const hintEnabled = ref(false);
const hintContent = ref('');
</script>

<style lang="scss" scoped>
.muted-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
.language-chip {
  width: 50px;
  display: flex;
  justify-content: center;
  font-size: 12px;
}
</style>
