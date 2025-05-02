<template>
  <div class="page-wrap">
    <div class="session-form-hold">
      <v-form :submit="loginUser">
        <v-card class="card">
          <v-card-title class="card-title">Zaloguj się</v-card-title>
          <v-text-field
            v-model="email"
            placeholder="E-mail"
            class="text-input"
            :rules="[emailRules.required, emailRules.email]"
            required
            rounded
            variant="outlined"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            placeholder="Password"
            class="text-input"
            :rules="[passwordRules.required]"
            required
            rounded
            variant="outlined"
          ></v-text-field>
          <div class="password-reset-wrapper">
            <router-link to="/session/password" class="password-reset">Przypomnij hasło</router-link>
          </div>
          <v-btn type="submit" class="submit-button" :loading="loading" block>Zaloguj się</v-btn>
          <p class="login-text">Lub zaloguj się poprzez</p>
          <div class="d-flex justify-center mb-6">
            <button class="social-button ma-2">
              <img :src="GoogleIcon" alt="google" />
            </button>
            <button class="social-button ma-2">
              <img :src="FacebookIcon" alt="google" />
            </button>
          </div>
          <p class="register-link-wrapper">
            Nie masz konta?
            <router-link to="/session/sign-up" class="register-link">Zarejestruj się tutaj</router-link>
          </p>
        </v-card>
      </v-form>
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
import GoogleIcon from '../../../../assets/images/google.svg';
import FacebookIcon from '../../../../assets/images/facebook.svg';

const email = ref('');
const password = ref('');
const loading = ref(false);

const router = useRouter();
const route = useRoute();
const store = useStore();

const emailRules = {
  required: (v) => !!v || 'E-mail is required',
  email: (v) => /.+@.+/.test(v) || 'E-mail must be valid'
};

const passwordRules = {
  required: (v) => !!v || 'Password is required'
};

const { proxy } = getCurrentInstance();

const loginUser = () => {
  loading.value = true;
  proxy.$api
    .post('/auth/signinWithCredentials', {
      email: email.value,
      password: password.value
    })
    .then(async ({ data }) => {
      if (!data) return;

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
      console.log('sign-in error', error);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  background-color: #f9f9fb !important;
  display: flex;
  align-items: center;
  padding: 40px 1rem;
  height: 100%;
  min-height: 100vh;
}

.session-form-hold {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  padding: 10px;
}

.card {
  padding: 32px 16px;
  border: 1px solid #f2f0ff;
  border-radius: 16px;

  @media screen and (min-width: 800px) {
    padding: 48px 40px;
  }
}

.card-title {
  color: #161d40;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 32px;
}

.password-reset-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.password-reset {
  color: #fe5b14;
  font-size: 13px;
  font-weight: 600;
}

.submit-button {
  background-color: #7b62fe;
  padding: 14px 12px;
  border-radius: 50px;
  color: white;
  text-transform: initial;
  font-weight: 700;
  margin-bottom: 16px;
}

.login-text {
  font-size: 14px;
  color: #888eaa;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
}

.socials-wrapper {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.social-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f2f0ff;
}

.register-link-wrapper {
  text-align: center;
  font-weight: 600;
  color: #888eaa;
  font-size: 14px;
  & .register-link {
    color: #fe5b14;
  }
}
</style>
