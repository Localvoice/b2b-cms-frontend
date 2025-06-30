<template>
  <v-card class="pa-4 h-full d-flex flex-column align-center justify-center" color="grey-lighten-5" border rounded="lg">
    <h4 class="header">Jeszcze tu nic nie ma!</h4>
    <p class="description">Dodaj swoją pierwszą lekcję, aby rozpocząć budowanie kursu. To proste i szybkie!</p>
    <AddLessonDialog />
  </v-card>
</template>

<script setup>
import AddLessonDialog from '~app/modules/platform/components/lessons/AddLessonDialog.vue';
</script>

<style lang="scss" scoped>
.header {
  color: #161d40;
  margin-bottom: 12px;
}

.description {
  color: #6b708a;
  text-align: center;
  max-width: 400px;
  margin-bottom: 24px;
}
</style>
