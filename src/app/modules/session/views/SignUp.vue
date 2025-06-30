<template>
  <div class="page-wrap">
    <div class="session-form-hold">
      <v-form ref="formRef" :submit="submitForm">
        <v-card elevation="0" class="card">
          <v-card-title class="card-title">Zarejestruj się</v-card-title>
          <div v-if="step === 1">
            <v-text-field
              type="email"
              v-model="email"
              placeholder="E-mail"
              class="text-input"
              :rules="[emailRules.required, emailRules.email]"
              required
              rounded
              variant="outlined"
            ></v-text-field>
          </div>
          <div v-if="step === 2">
            <v-text-field
              v-model="firstName"
              placeholder="Imię"
              class="text-input"
              :rules="[nameRules.required]"
              required
              rounded
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              placeholder="Nazwisko"
              class="text-input"
              :rules="[nameRules.required]"
              required
              rounded
              variant="outlined"
            ></v-text-field>
          </div>
          <div v-if="step === 3">
            <v-text-field
              type="password"
              v-model="password"
              placeholder="Hasło"
              class="text-input"
              :rules="[passwordRules.required]"
              required
              rounded
              variant="outlined"
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="confirmPassword"
              placeholder="Powtórz hasło"
              class="text-input"
              :rules="[passwordRules.required]"
              required
              rounded
              variant="outlined"
            ></v-text-field>
          </div>
          <v-row>
            <v-col cols="12" :sm="buttonColumnSize">
              <v-btn type="button" class="prev-button" v-if="step > 1" block @click="moveStepBackward">Cofnij</v-btn>
            </v-col>
            <v-col cols="12" :sm="buttonColumnSize">
              <v-btn type="button" class="next-button" block :loading="loading" @click="moveStepForward">{{
                buttonLabel
              }}</v-btn>
            </v-col>
          </v-row>
          <p class="login-text">Lub zarejestruj się poprzez</p>
          <div class="d-flex justify-center mb-6">
            <button class="social-button ma-2">
              <img :src="GoogleIcon" alt="google" />
            </button>
            <button class="social-button ma-2">
              <img :src="FacebookIcon" alt="google" />
            </button>
          </div>
          <p class="login-link-wrapper">
            Masz już konto?
            <router-link to="/session/sign-in" class="login-link">Zaloguj się tutaj</router-link>
          </p>
        </v-card>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';
import { useStore } from 'vuex';
import { AuthUser } from '~app/modules/auth';
import { TokenStorage } from '~app/modules/auth/model/token/storage';
import { importAuthToken } from '~app/modules/auth/model/token/token';
import { configGetters } from '~app/core/config/store';
import { useRouter, useRoute } from 'vue-router';
import GoogleIcon from '../../../../assets/images/google.svg';
import FacebookIcon from '../../../../assets/images/facebook.svg';

const step = ref(1);
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const formRef = ref(null);

const buttonLabel = computed(() => {
  if (step.value === 3) {
    return 'Zakończ';
  }
  return 'Dalej';
});

const buttonColumnSize = computed(() => {
  if (step.value > 1) {
    return 6;
  }
  return 12;
});

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

const nameRules = {
  required: (v) => !!v || 'Name is required'
};

const moveStepForward = async () => {
  if (step.value === 3) {
    return submitForm();
  }
  const { valid } = await formRef.value?.validate();
  if (valid) {
    step.value += 1;
  }
};

const moveStepBackward = () => {
  if (loading.value) {
    return;
  }
  step.value -= 1;
};

const submitForm = () => {
  if (step.value < 3) {
    return moveStepForward();
  }
  registerUser();
};

const { proxy } = getCurrentInstance();

const registerUser = () => {
  loading.value = true;
  proxy.$api
    .post('/auth/signupWithCredentials', {
      email: email.value,
      password: password.value,
      passwordConfirmation: confirmPassword.value,
      firstName: firstName.value,
      lastName: lastName.value
    })
    .then(async ({ data }) => {
      if (!data) return;

      console.log('userInfo', data);

      const tokenStorage = new TokenStorage();
      await tokenStorage.store(data);

      router.push('/session/onboarding');
    })
    .catch((error) => {
      console.log('sign-up error', error);
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

.next-button {
  background-color: #7b62fe;
  padding: 20px 12px;
  border-radius: 50px;
  color: white;
  text-transform: initial;
  font-weight: 700;
  grid-column: span 2;
}

.login-text {
  font-size: 14px;
  color: #888eaa;
  font-weight: 600;
  text-align: center;
  margin: 24px 0;
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

.login-link-wrapper {
  text-align: center;
  font-weight: 600;
  color: #888eaa;
  font-size: 14px;
  & .login-link {
    color: #fe5b14;
  }
}
.btn-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 16px;
  gap: 8px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}
.prev-button {
  background-color: #f2f0ff;
  padding: 20px 12px;
  border-radius: 50px;
  color: white;
  text-transform: initial;
  font-weight: 700;

  &.v-btn {
    color: #7b62fe;
  }
}
</style>
