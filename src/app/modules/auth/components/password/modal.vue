<template>
  <b-modal
    id="auth-password-modal"
    ref="modal"
    modal-class="vnext"
    :title="$t('Change Password')"
    :no-close-on-backdrop="force"
    :no-close-on-esc="force"
    :hide-header-close="force"
    @hide="reset"
    @ok="onSubmit"
  >
    <password-form-wrapper v-slot="{ form }" ref="form" autocomplete="off" novalidate @success="onSuccess">
      <b-alert v-t="'Your password has expired and must be changed.'" variant="info" :show="force" />

      <password-form :form="form" />

      <button type="submit" class="d-none"></button>
    </password-form-wrapper>

    <template #modal-footer="{ ok, close }">
      <button v-if="!force" v-t="'Close'" type="button" class="btn btn-sm btn-secondary" @click="close" />
      <button type="submit" class="btn btn-sm btn-primary" @click="ok">
        <i class="fa fa-check"></i>
        {{ $t('Update') }}
      </button>
    </template>
  </b-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { BModal, BAlert } from 'bootstrap-vue-3';
import PasswordFormWrapper, { VPasswordFormWrapper } from './wrapper.vue';
import PasswordForm from './form.vue';

const { t } = useI18n();

const props = defineProps<{
  force?: boolean;
}>();

const modal = ref<InstanceType<typeof BModal>>();
const form = ref<VPasswordFormWrapper>();

function onSubmit(e: Event) {
  e.preventDefault();
  form.value?.onSubmit();
}

function reset(e: Event) {
  if (!e.defaultPrevented) {
    form.value?.reset();
  }
}

function onSuccess() {
  modal.value?.hide();
}

onMounted(() => {
  modal.value?.show();
});
</script>
