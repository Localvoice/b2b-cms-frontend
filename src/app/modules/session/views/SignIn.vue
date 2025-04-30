<template>
  <div class="page-wrap">
    <div class="session-form-hold">
      <v-card class="localvoice-shadow p-10">
        <v-card-text class="text-center">
          <v-row class="mb-16">
            <h5 class="mb-10 mx-auto localvoice-header">
              <span class="localvoice-weight-header">Logowanie</span> do aplikacji Localvoice
            </h5>
            <img src="@/assets/images/alexa.png" align="center" justify="center" class="mx-auto" />
          </v-row>

          <v-text-field label="Email" color="#1C7AC3" light v-model="email" />
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            v-model="password"
            color="#1C7AC3"
            light
            @click:append="show = !show"
          ></v-text-field>
          <v-btn class="mb-4 localvoice-sign-in-button" :loading="loading" block @click.prevent="loginUser"
            >Zaloguj się</v-btn
          >
          <v-row>
            <h6 class="localvoice-sign-in-options mx-auto">
              kliknij jeśli <router-link to="/session/reset">nie pamiętasz hasła</router-link> lub
              <router-link to="/session/sign-up">nie masz konta </router-link>
            </h6>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { AuthUser } from '~app/modules/auth';
import { TokenStorage } from '~app/modules/auth/model/token/storage';
import { importAuthToken } from '~app/modules/auth/model/token/token';
import { configGetters } from '~app/core/config/store';
import { useRouter, useRoute } from 'vue-router';

const show = ref(false);
const email = ref('');
const password = ref('');
const loading = ref(false);

const router = useRouter();
const route = useRoute();
const store = useStore();

const { proxy } = getCurrentInstance();

const loginUser = () => {
  loading.value = true;
  proxy.$api
    .post('/auth/signinWithCredentials', {
      email: email.value,
      password: password.value
    })
    .then(async ({ data }) => {
      console.log('userInfo', data);

      const tokenStorage = new TokenStorage();
      await tokenStorage.store(data);

      const urlParams = new URLSearchParams(route.fullPath.split('?')[1]);

      if (urlParams.has('ReturnUrl')) {
        router.push(urlParams.get('ReturnUrl'));
      } else {
        router.push('/');
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  background-color: #fff !important;
  display: flex;
  align-items: center;
  padding: 40px 1rem;
  height: 100%;
  min-height: 100vh;
}

.localvoice-sign-in-button {
  background-color: #086fbe !important;
  color: #fff;
  padding: 20px !important;
}

.session-form-hold {
  width: 100%;
  max-width: 490px;
  margin: 0 auto;
  padding: 10px;
}

.localvoice-shadow {
  box-shadow:
    rgba(47, 60, 74, 0.18) 0px 8px 32px,
    rgba(47, 60, 74, 0.02) 0px 8px 16px !important;
}

.session-form-hold img {
  width: 230px;
  margin-bottom: 25px;
}

.localvoice-sign-in-options {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  margin-top: 20px;
  margin-bottom: 30px;
}

.localvoice-weight-header {
  font-weight: 400;
}

.localvoice-header {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
