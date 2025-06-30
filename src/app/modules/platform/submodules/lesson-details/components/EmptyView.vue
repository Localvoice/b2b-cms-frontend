<template>
  <v-card class="pa-4 h-full d-flex flex-column align-center justify-center" color="grey-lighten-5" border rounded="lg">
    <h4 class="header">Jeszcze tu nic nie ma!</h4>
    <p class="description">Dodaj pierwszy przykład do swojej lekcji.</p>
    <v-btn class="confirm-btn" rounded="xl">Dodaj pierwszy przykład</v-btn>
  </v-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.confirm-btn {
  background-color: #fe5b14;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}

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
