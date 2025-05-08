<template>
  <v-dialog max-width="550">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" variant="outlined" prepend-icon="mdi-filter-outline" class="outlined-btn mr-3"
        >Filtry</v-btn
      >
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="dialog-card pa-8">
        <v-row class="w-full mb-8" justify="space-between" align="center">
          <v-col cols="auto" class="pa-0">
            <v-card-title class="dialog-title">Filtry</v-card-title>
          </v-col>
          <v-col cols="auto" class="pa-0">
            <v-btn icon="mdi-close" size="small" rounded="lg" @click="isActive.value = false"></v-btn>
          </v-col>
        </v-row>
        <p class="filter-label mb-3">Kategoria</p>
        <v-row class="w-full row">
          <v-chip color="purple">
            <v-checkbox color="purple" density="compact" hide-details label="Przygotowania do egzaminu"></v-checkbox>
          </v-chip>
          <v-chip color="white" variant="elevated">
            <v-checkbox color="gray" density="compact" hide-details label="Business English"></v-checkbox>
          </v-chip>
        </v-row>
        <p class="filter-label mb-3">Poziom trudności</p>
        <v-row class="w-full row">
          <v-chip color="purple">
            <v-radio color="purple" density="compact" hide-details label="Łatwy (A1-A2)"></v-radio>
          </v-chip>
          <v-chip color="white" variant="elevated">
            <v-radio color="gray" density="compact" hide-details label="Średni (B1-B2)"></v-radio>
          </v-chip>
          <v-chip color="white" variant="elevated" class="text-no-wrap">
            <v-radio color="gray" density="compact" hide-details label="Trudny (C1-C2)"></v-radio>
          </v-chip>
        </v-row>
        <p class="filter-label mb-3">Który poziom?</p>
        <v-row class="w-full row">
          <v-chip color="purple">
            <v-radio color="purple" density="compact" hide-details label="B1"></v-radio>
          </v-chip>
          <v-chip color="white" variant="elevated">
            <v-radio color="gray" density="compact" hide-details label="B2"></v-radio>
          </v-chip>
        </v-row>
        <p class="filter-label mb-3">Typ lekcji</p>
        <v-row class="w-full row">
          <v-chip color="purple">
            <v-checkbox color="purple" density="compact" hide-details label="Nauka wymowy"></v-checkbox>
          </v-chip>
          <v-chip color="white" variant="elevated">
            <v-checkbox color="gray" density="compact" hide-details label="Gramatyka"></v-checkbox>
          </v-chip>
        </v-row>
        <p class="filter-label mb-3">Typ subskrypcji</p>
        <v-row class="w-full row">
          <v-chip color="purple">
            <v-checkbox color="purple" density="compact" hide-details label="Premium"></v-checkbox>
          </v-chip>
          <v-chip color="white" variant="elevated">
            <v-checkbox color="gray" density="compact" hide-details label="Darmowy"></v-checkbox>
          </v-chip>
        </v-row>
        <p class="filter-label mb-3">Status</p>
        <v-row class="w-full row">
          <v-chip color="purple">
            <v-checkbox color="purple" density="compact" hide-details label="Opublikowane"></v-checkbox>
          </v-chip>
          <v-chip color="white" variant="elevated">
            <v-checkbox color="gray" density="compact" hide-details label="Testowane"></v-checkbox>
          </v-chip>
          <v-chip color="white" variant="elevated">
            <v-checkbox color="gray" density="compact" hide-details label="Robocze"></v-checkbox>
          </v-chip>
        </v-row>
        <v-row class="w-full" justify="space-between" align="center">
          <v-col cols="auto">
            <p class="filter-label">Pokaż tylko najnowsze wersje</p>
          </v-col>
          <v-col cols="auto">
            <v-switch color="purple" hide-details></v-switch>
          </v-col>
        </v-row>
        <v-btn class="w-full confirm-btn mt-4" rounded>Zastosuj filtry (5)</v-btn>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup></script>

<style lang="scss">
.dialog-card {
  background-color: #f9f9fb;
}
.dialog-title {
  color: #161d40;
  font-weight: 700;
  font-size: 20px;
}
.filter-label {
  color: #161d40;
  font-weight: 700;
  font-size: 14px;
}
.v-selection-control .v-label {
  font-size: 13px;
}
.row {
  gap: 12px;
  margin-bottom: 24px !important;
}
.confirm-btn {
  background-color: #fe5b14;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
</style>
