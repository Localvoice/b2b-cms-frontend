<template>
  <v-card elevation="0" rounded="xl" :class="['step-card pa-4', active && 'active']" @click="onClick">
    <v-row class="mb-2" align="center" justify="space-between">
      <v-col cols="auto">
        <div class="icon-container">
          <v-icon class="icon" :icon="icon"></v-icon>
        </div>
      </v-col>
      <v-col cols="auto" v-if="active">
        <div class="active-indicator">
          <v-icon class="icon" icon="mdi-check"></v-icon>
        </div>
      </v-col>
    </v-row>
    <h6 class="title mb-2">{{ title }}</h6>
    <p class="description">{{ description }}</p>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}>();
</script>

<style lang="scss">
.step-card {
  width: 100%;
  border: 3px solid transparent;
  opacity: 0.5;
  cursor: pointer;

  &.active {
    opacity: 1;
    border: 3px solid #7b62fe;
  }
}

.icon-container {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7b62fe;
  color: #fff;
  border-radius: 50%;

  .icon {
    font-size: 16px;
  }
}

.active-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fe5b14;
  box-shadow: 0 0 0 4px rgba(255, 184, 153, 0.55);
  color: #fff;
  border-radius: 50%;

  .icon {
    font-size: 16px;
  }
}

.title {
  font-weight: 700;
  font-size: 14px;
  color: #161d40;
}

.description {
  font-weight: 600;
  font-size: 13px;
  color: #6b708a;
}
</style>
