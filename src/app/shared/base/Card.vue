<template>
  <!-- box-shadow: 0 2px 4px 0 hsl(198deg 45% 10% / 12%) -->
  <v-card
    class="mx-auto"
    style="
      box-shadow:
        0 8px 32px rgb(47 60 74 / 1%),
        0 8px 16px rgb(47 60 74 / 2%);
    "
    :class="{ 'pa-4': padding, cardClass }"
    :color="layoutState.layoutMode"
    :dark="layoutState.isDarkMode"
    max-width="100%"
  >
    <v-skeleton-loader height="100%" width="100%" type="card" :loading="loading">
      <slot />
    </v-skeleton-loader>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'; // For Vuex 4 store access

// Props declaration
defineProps({
  color: {
    type: String,
    default: 'white'
  },
  cardClass: {
    type: String,
    default: ''
  },
  padding: {
    type: Boolean,
    default: false
  }
});

// Reactive state
const loading = ref(false);

// Accessing the Vuex store and its getters
const store = useStore();
const layoutState = computed(() => store.getters['layout/getState']);
</script>
