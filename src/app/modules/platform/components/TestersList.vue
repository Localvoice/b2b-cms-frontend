<template>
  <v-card class="pa-4" border rounded="lg">
    <v-row align="center" justify="space-between" class="w-full">
      <v-col cols="auto">
        <p class="muted-text">LISTA TESTERÓW</p>
      </v-col>
      <v-col cols="auto" class="pr-0">
        <router-link class="link" to="/app/settings">Edytuj listę</router-link>
      </v-col>
    </v-row>
    <v-row align="center" justify="space-between" class="w-full mb-4">
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
    <v-row align="center" justify="space-between" class="w-full mb-4">
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
    <v-btn class="confirm-btn w-full" rounded>Aktywuj kurs dla testerów</v-btn>
  </v-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.link {
  color: #fe5b14;
  font-weight: 600;
  font-size: 13px;
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
</style>
