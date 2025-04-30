<template>
  <b-input-group>
    <b-input-group-prepend is-text>
      <i class="fas fa-search"></i>
    </b-input-group-prepend>

    <b-form-input
      v-bind="$attrs"
      :placeholder="$attrs.placeholder"
      :autofocus="autofocus"
      :model-value="modelValue"
      trim
      debounce="250"
      @update:modelValue="onInput"
      @keyup.esc="clearInput"
    />

    <b-input-group-append>
      <b-button v-if="modelValue" variant="outline-secondary" class="btn-icon" @click.prevent="clearInput">
        <i class="fas fa-times"></i>
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onInput = (value: string) => {
      emit('update:modelValue', value);
    };

    const clearInput = () => {
      emit('update:modelValue', '');
    };

    return {
      onInput,
      clearInput
    };
  }
});
</script>

<style scoped lang="scss"></style>
