<template>
  <v-menu location="start">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="ml-auto" variant="plain" icon="mdi-dots-horizontal" size="x-small"></v-btn>
    </template>
    <v-list class="py-0">
      <v-list-item class="pa-0">
        <v-btn class="menu-btn" variant="plain">Edytuj</v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="pa-0">
        <v-dialog max-width="550" :activator="btn">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              class="menu-btn text-error"
              variant="plain"
              append-icon="mdi-trash-can-outline"
              >Usuń</v-btn
            >
          </template>
          <template v-slot:default="{ isActive }">
            <v-card class="dialog-card pa-8">
              <v-row class="w-full mb-4" justify="space-between" align="center">
                <v-col cols="auto" class="pa-0">
                  <v-card-title class="dialog-title">Czy na pewno?</v-card-title>
                </v-col>
                <v-col cols="auto" class="pa-0">
                  <v-btn icon="mdi-close" size="small" rounded="lg" @click="isActive.value = false"></v-btn>
                </v-col>
              </v-row>
              <p class="dialog-text mb-4">Czy na pewno chcesz usunąć ten kurs?</p>
              <v-btn class="w-full confirm-btn mt-4" rounded @click="isActive.value = false">Tak, usuń</v-btn>
            </v-card>
          </template>
        </v-dialog>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  courseId: string;
}>();

const btn = ref<HTMLElement | null>(null);
</script>

<style lang="scss" scoped>
.dialog-card {
  background-color: #f9f9fb;
}
.dialog-title {
  color: #161d40;
  font-weight: 700;
  font-size: 20px;
}
.dialog-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 14px;
}
.confirm-btn {
  background-color: #dd1a43;
  border-radius: 50px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-transform: initial;
}
.menu-btn {
  text-transform: initial;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  display: flex;
  justify-content: space-between;
}
</style>
