<template>
  <v-card rounded="lg" border elevation="0" class="mb-8 pa-4 w-full position-relative">
    <v-row align="center" justify="space-between">
      <div class="gradient-container"></div>
      <v-col cols="auto" class="column">
        <div class="d-flex align-center">
          <div class="icon-container mr-4">
            <v-icon icon="mdi-alert-octagon-outline"></v-icon>
          </div>
          <div>
            <h6 class="alert-title">Uzupełnij informacje o sobie</h6>
            <p class="alert-description">
              Nie masz jeszcze dodanych informacji O mnie. Przejdz do ustawień i wypełnij je aby być bardziej
              atrakcyjnym dla użytkowników.
            </p>
          </div>
        </div>
      </v-col>
      <v-col cols="auto">
        <v-btn class="confirm-btn" rounded="xl">Przejdź do ustawień</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.gradient-container {
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, #fe5b141c, #ffffff);
  position: absolute;
  left: 0;
  top: 0;
}

.column {
  z-index: 10;
  position: relative;
}

.icon-container {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(254, 91, 20, 0.11);
  border: 4px solid rgba(254, 91, 20, 0.05);
  color: #fe5b14;
  font-size: 16px;
}

.alert-title {
  font-weight: 700;
  font-size: 14px;
  color: #161d40;
}

.alert-description {
  font-weight: 600;
  font-size: 13px;
  color: #6b708a;
}

.confirm-btn {
  background-color: #fe5b14;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
</style>
