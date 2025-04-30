<template>
  <transition name="fade" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
    <div v-show="visible" class="sys-loading" :class="{ 'is-fullscreen': fullscreen }">
      <SysSpinner :diameter="spinnerDiameter" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import SysSpinner from '../spinner/spinner.vue'; // import directly, not through a plugin
import { SPINNER_BASE_SIZE } from '../spinner/types';

// Props
const props = defineProps({
  visible: { type: Boolean, default: false },
  spinnerDiameter: { type: Number, default: SPINNER_BASE_SIZE },
  fullscreen: { type: Boolean, default: true }
});

// Emits
const emit = defineEmits(['after-enter', 'after-leave']);

// Methods
function onAfterEnter() {
  emit('after-enter');
}

function onAfterLeave() {
  emit('after-leave');
}
</script>

<style lang="scss">
@import 'loading';
</style>
