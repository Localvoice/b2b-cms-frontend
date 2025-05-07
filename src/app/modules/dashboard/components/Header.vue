<template>
  <v-row justify="space-between" align="center">
    <v-col>
      <h4>Statystki</h4>
    </v-col>
    <v-col class="d-flex justify-end">
      <router-link to="/" class="header-link">Pokaż wszystkie</router-link>
    </v-col>
  </v-row>
</template>

<script setup></script>

<style>
.header-link {
  color: #fe5b14;
  font-weight: 600;
  font-size: 14px;
}
</style>
