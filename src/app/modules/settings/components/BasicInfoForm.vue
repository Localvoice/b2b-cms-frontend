<template>
  <v-row>
    <v-col cols="auto" lg="3">
      <div class="d-flex flex-column align-center">
        <div class="image-wrapper">
          <img class="avatar-image" :src="imageUrl" alt="avatar" />
          <v-btn @click="triggerFileInput" density="default" class="avatar-input-btn" icon="mdi-pencil-outline"></v-btn>
          <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" class="d-none" />
        </div>
      </div>
    </v-col>
    <v-col cols="12" lg="9">
      <v-row>
        <v-col cols="12" sm="6">
          <p class="label mb-1">Imię</p>
          <v-text-field
            v-if="isEditing"
            id="firstName"
            density="compact"
            rounded
            variant="outlined"
            required
            bg-color="white"
            :rules="[firstNameRules.required]"
            placeholder="Wpisz imię"
            v-model="userData.firstName"
          ></v-text-field>
          <h6 v-if="!isEditing" class="muted-text">{{ userData.firstName }}</h6>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="label mb-1">Nazwisko</p>
          <v-text-field
            v-if="isEditing"
            id="lastName"
            density="compact"
            rounded
            variant="outlined"
            required
            bg-color="white"
            :rules="[lastNameRules.required]"
            placeholder="Wpisz nazwisko"
            v-model="userData.lastName"
          ></v-text-field>
          <h6 v-if="!isEditing" class="muted-text">{{ userData.lastName }}</h6>
        </v-col>
        <v-col cols="12">
          <p class="label mb-1">E-mail</p>
          <v-text-field
            v-if="isEditing"
            type="email"
            id="email"
            density="compact"
            rounded
            variant="outlined"
            required
            bg-color="white"
            :rules="[emailRules.required, emailRules.email]"
            placeholder="Wpisz e-mail"
            v-model="userData.email"
          ></v-text-field>
          <h6 v-if="!isEditing" class="muted-text">{{ userData.email }}</h6>
        </v-col>
        <v-col cols="12">
          <p class="label mb-1">Hasło</p>
          <v-text-field
            v-if="isEditing"
            type="password"
            id="password"
            density="compact"
            rounded
            variant="outlined"
            required
            bg-color="white"
            :rules="[passwordRules.required]"
            placeholder="Wpisz e-mail"
            v-model="userData.password"
          ></v-text-field>
          <h6 v-if="!isEditing" class="muted-text">{{ toPasswordDots(userData.password) }}</h6>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { userDataGetters } from '../store';

const store = useStore();
const userData = computed(() => store.getters[userDataGetters.getUserData]);
const isEditing = computed(() => store.getters[userDataGetters.getEditingState]);
const fileInput = ref<HTMLInputElement | null>(null);
const imageUrl = ref<string>('/images/avatar-placeholder.png');

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && file.type.startsWith('image/')) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

const firstNameRules = {
  required: (v: string) => !!v || 'Imię jest wymagane'
};

const lastNameRules = {
  required: (v: string) => !!v || 'Nazwisko jest wymagane'
};

const emailRules = {
  required: (v: string) => !!v || 'E-mail jest wymagany',
  email: (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
};

const passwordRules = {
  required: (v: string) => !!v || 'Hasło jest wymagane'
};

const toPasswordDots = (input: string) => {
  return '•'.repeat(input.length);
};
</script>

<style lang="scss" scoped>
.delete-btn {
  color: #dd1a43;
  text-transform: initial;
  font-weight: 600;
  font-size: 13px;
}
.image-wrapper {
  width: 100px;
  height: 100px;
  position: relative;
  background-color: #f2f0ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-input-btn {
  position: absolute;
  right: 5px;
  bottom: -5px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #7b62fe;
  color: #fff;
}
</style>
