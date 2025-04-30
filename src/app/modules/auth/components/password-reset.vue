<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <div class="logo mx-auto mb-5">
          <a href="/login.aspx">
            <img src="@/assets/logo.png" alt="ConcreteGo" class="img-fluid" />
          </a>
        </div>

        <div v-sys-loading="loading" class="card b-a-0 shadow-sm mb-3">
          <!-- PASSWORD CHANGE -->
          <template v-if="route.query.token">
            <sys-card-header :title="$t('Change your password')" icon="fas fa-key"></sys-card-header>

            <form autocomplete="off" @submit.prevent="changePassword">
              <div class="card-body">
                <b-alert variant="warning" :show="!!error">
                  {{ $t(messages[error]) }}
                  <router-link
                    v-if="error === 'TOKEN_EXPIRED'"
                    v-t="'Request password reset'"
                    :to="{ name: 'password-reset' }"
                  ></router-link>
                </b-alert>
                <b-alert variant="success" :show="success">
                  {{ $t('Password successfully changed.') }}
                  <a v-t="'Login to your account'" :href="auth.loginUrl"></a>
                </b-alert>

                <form-control-state v-slot:default="{ state, message }" :errors="changeForm.errors.password">
                  <b-form-group
                    label-cols-sm="4"
                    :label="$t('New Password')"
                    label-align-sm="right"
                    label-for="password"
                    label-class="required"
                    :invalid-feedback="message"
                  >
                    <b-form-input
                      id="password"
                      v-model="changeForm.data.password"
                      type="password"
                      :state="state"
                    ></b-form-input>
                  </b-form-group>
                </form-control-state>

                <form-control-state
                  v-slot:default="{ state, message }"
                  :errors="changeForm.errors.confirm"
                  :custom="{ matchWith: $t('Password must match') }"
                >
                  <b-form-group
                    class="mb-0"
                    label-cols-sm="4"
                    :label="$t('Confirm')"
                    label-align-sm="right"
                    label-for="confirm"
                    label-class="required"
                    :invalid-feedback="message"
                  >
                    <b-form-input
                      id="confirm"
                      v-model="changeForm.data.confirm"
                      type="password"
                      :state="state"
                    ></b-form-input>
                  </b-form-group>
                </form-control-state>
              </div>

              <div class="card-footer d-flex">
                <button type="submit" class="btn btn-sm btn-primary ml-auto">
                  {{ $t('Change password') }}
                </button>
              </div>
            </form>
          </template>

          <!-- PASSWORD RESET REQUEST -->
          <template v-else>
            <sys-card-header :title="$t('Reset your password')" icon="fas fa-unlock-alt"></sys-card-header>

            <form autocomplete="off" @submit.prevent="requestLink">
              <div class="card-body">
                <b-alert variant="warning" :show="!!error">
                  {{ $t(messages[error]) }}
                  <router-link
                    v-if="error === 'TOKEN_EXPIRED'"
                    v-t="'Request password reset'"
                    :to="{ name: 'password-reset', query: { token: null } }"
                  ></router-link>
                </b-alert>
                <b-alert variant="success" :show="success">
                  {{ $t('Password reset link was sent to email address registered with your account.') }}
                </b-alert>

                <form-control-state v-slot:default="{ state, message }" :errors="requestForm.errors.login">
                  <b-form-group
                    class="mb-0"
                    label-cols-sm="4"
                    :label="$t('Login')"
                    label-align-sm="right"
                    label-for="login"
                    label-class="required"
                    :invalid-feedback="message"
                  >
                    <b-form-input id="login" v-model="requestForm.data.login" type="text" :state="state"></b-form-input>
                  </b-form-group>
                </form-control-state>
              </div>

              <div class="card-footer d-flex">
                <button type="submit" class="btn btn-sm btn-primary ml-auto">
                  {{ $t('Send password reset link') }}
                </button>
              </div>
            </form>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import { i18n } from '~app/core/i18n/marker';
import { AuthInjectKey } from '~app/modules/auth';
import { FormControlState, FormGroup, matchWith, required } from '~app/shared/form';

const route = useRoute();
const router = useRouter();

const auth = inject(AuthInjectKey)!;

const requestForm = reactive(
  new FormGroup<{ login: string }>({
    login: {
      validators: [required]
    }
  })
);

const changeForm = reactive(
  new FormGroup<{ password: string; confirm: string }>({
    password: {
      validators: [required]
    },
    confirm: {
      validators: [required, matchWith('password', 'matchWith')]
    }
  })
);

const error = ref('');
const success = ref(false);
const loading = ref(false);

const messages = {
  EMAIL_UNDEFINED: i18n.t('Sorry, your account has no email address defined. Please contact administrator.'),
  ACCOUNT_NOT_EXIST: i18n.t('Sorry, there is no account with given username.'),
  TOKEN_EXPIRED: i18n.t('Sorry, your password reset link has expired.')
};

watch(
  () => route.query.token,
  () => {
    error.value = '';
    success.value = false;
  }
);

watch(
  () => requestForm.data,
  () => {
    if (requestForm.validated) {
      requestForm.validate();
    }
  },
  { deep: true }
);

watch(
  () => changeForm.data,
  () => {
    if (changeForm.validated) {
      changeForm.validate();
    }
  },
  { deep: true }
);

function requestLink() {
  error.value = '';
  success.value = false;

  if (!requestForm.validate()) {
    return null;
  }

  loading.value = true;
  return (
    // Adjust URL when restoring
    (router.app.config.globalProperties.$api as any)
      .post('/dupa', requestForm.data)
      .then(() => {
        requestForm.reset();
        success.value = true;
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 409) {
          error.value = 'EMAIL_UNDEFINED';
          return;
        }
        if (err.response!.status === 400) {
          error.value = 'ACCOUNT_NOT_EXIST';
          return;
        }
        throw err;
      })
      .finally(() => {
        loading.value = false;
      })
  );
}

function changePassword() {
  error.value = '';
  success.value = false;

  if (!changeForm.validate()) {
    return null;
  }

  loading.value = true;
  return (
    // Finish this once endpoint is ready
    router.app.config.globalProperties.$api as any
    // .put('/api/account/password', changeForm.data)
    // .then(() => {
    //   changeForm.reset();
    //   success.value = true;
    // })
    // .catch((err: AxiosError) => {
    //   if (err.response!.status === 401) {
    //     error.value = 'TOKEN_EXPIRED';
    //     return;
    //   }
    //   throw err;
    // })
    // .finally(() => {
    //   loading.value = false;
    // })
  );
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10vh;
}

.logo {
  max-width: 400px;
}
</style>
