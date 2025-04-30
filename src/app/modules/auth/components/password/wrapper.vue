<template>
  <form @submit.prevent="onSubmit" @reset.prevent="reset">
    <slot :form="form" />
  </form>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { FormGroup, required, matchWith } from '~app/shared/form';
import { passwordService } from './service';
import { authGetters } from '../../store';

export interface PasswordFormData {
  login: string;
  current: string;
  password: string;
  confirm: string;
}

// Emits
const emit = defineEmits<{
  (e: 'success'): void;
}>();

// Store and Toast
const store = useStore();

// Form initialization
const form = ref(new FormGroup<PasswordFormData>({
  login: {
    default: '',
    validators: [required]
  },
  current: {
    default: '',
    validators: [required]
  },
  password: {
    default: '',
    validators: [required]
  },
  confirm: {
    default: '',
    validators: [required, matchWith('password', 'matchWith')]
  }
}));

// Computed User
const user = computed(() => authGetters.getUser(store.state));

// Watch form.data deep
watch(() => form.value.data, () => {
  if (form.value.validated) {
    form.value.validate();
  }
}, { deep: true });

// Set initial login value
onMounted(() => {
  form.value.data.login = user.value.login;
});

// Methods
function onSubmit(e?: Event) {
  if (!form.value.validate()) {
    return;
  }

  passwordService
    .change(form.value.data.current, form.value.data.password)
    .then(() => {
      emit('success');
      reset();
    })
    .catch((err) => {
      if (err.response?.status !== 400) {
        throw err;
      }

      // TODO: handle API error better if needed
      // e.g., if (err.response.data.message.includes('Old password')) { ... }
    });
}

function reset(e?: Event) {
  form.value.reset({
    current: undefined,
    password: undefined,
    confirm: undefined
  });
}
</script>
