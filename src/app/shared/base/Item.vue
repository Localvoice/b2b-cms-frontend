<template>
  <v-list-item
    v-ripple="{ class: 'primary--text' }"
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="item.to"
    :active-class="` ${isDark ? ' grey--text text--lighten-5' : 'primary--text'}`"
    :height="48"
    class="text-18 pl-6"
    dark
  >
    <v-list-item-icon v-if="text" dark class="v-list-item__icon--text" v-text="computedText" />

    <v-list-item-icon v-else-if="item.icon" dark>
      <v-icon v-text="item.icon" />
    </v-list-item-icon>

    <v-list-item-content v-if="item.title || item.subtitle" class="pa-0 text-14" dark>
      <v-list-item-title dark class="ma-0 text-14" v-text="item.title" />

      <v-list-item-subtitle dark v-text="item.subtitle" />
    </v-list-item-content>
  </v-list-item>
</template>

<script setup>
import { computed, ref } from 'vue';

// Define props
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      href: undefined,
      icon: undefined,
      subtitle: undefined,
      title: undefined,
      to: undefined,
      dark: true
    })
  },
  text: {
    type: Boolean,
    default: false
  }
});

// Reactive state
const isDark = ref(true);

// Computed property to generate text from the title
const computedText = computed(() => {
  if (!props.item || !props.item.title) return '';

  let text = '';
  props.item.title.split(' ').forEach((val) => {
    text += val.substring(0, 1);
  });

  return text;
});

// Computed property for the href
const href = computed(() => props.item.href || (!props.item.to ? '#' : undefined));
</script>

<style scoped>
.mySidebar .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #fff !important;
}

.mySidebar .theme--light.v-icon {
  color: #fff !important;
}
</style>
