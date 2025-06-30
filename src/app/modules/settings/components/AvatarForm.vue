<template>
  <p class="muted-text mb-8">Możesz wybrać jeden z domyślnych avatarów lub wgrać swój.</p>
  <v-row class="w-full" v-if="!uploadAvatar">
    <v-col cols="12" md="6" :key="set.id" v-for="set in avatarSets">
      <v-card
        elevation="0"
        :class="[
          'avatar-set-card d-flex justify-space-between pt-4 px-8',
          set.id === selectedAvatarSet && 'card-active'
        ]"
        rounded="xl"
        @click="handleAvatarSetClick(set.id)"
      >
        <div class="selected-dot" v-if="set.id === selectedAvatarSet">
          <v-icon class="icon" icon="mdi-check"></v-icon>
        </div>
        <img :key="avatar" v-for="avatar in set.avatars" :src="avatar" alt="avatar-image" />
      </v-card>
    </v-col>
  </v-row>
  <v-row class="w-full" v-if="uploadAvatar">
    <v-col cols="12" md="4">
      <v-card elevation="0" class="upload-card pa-8" rounded="lg" @click="triggerFileInput('dialogue')">
        <img v-if="uploadImages.dialogue" :src="uploadImages.dialogue" alt="dialogue-avatar" />
        <template v-if="!uploadImages.dialogue">
          <v-icon class="upload-icon" icon="mdi-tray-arrow-up"></v-icon>
          <p class="upload-text">Poza dialogu</p>
        </template>
        <input
          type="file"
          ref="dialogueAvatarInput"
          accept="image/*"
          @change="handleFileChange($event, 'dialogue')"
          class="d-none"
        />
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card elevation="0" class="upload-card pa-8" rounded="lg" @click="triggerFileInput('mistake')">
        <img v-if="uploadImages.mistake" :src="uploadImages.mistake" alt="mistake-avatar" />
        <template v-if="!uploadImages.mistake">
          <v-icon class="upload-icon" icon="mdi-tray-arrow-up"></v-icon>
          <p class="upload-text">Poza pomyłki</p>
        </template>
        <input
          type="file"
          ref="mistakeAvatarInput"
          accept="image/*"
          @change="handleFileChange($event, 'mistake')"
          class="d-none"
        />
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card elevation="0" class="upload-card pa-8" rounded="lg" @click="triggerFileInput('congratulations')">
        <img v-if="uploadImages.congratulations" :src="uploadImages.congratulations" alt="congratulations-avatar" />
        <template v-if="!uploadImages.congratulations">
          <v-icon class="upload-icon" icon="mdi-tray-arrow-up"></v-icon>
          <p class="upload-text">Poza gratulacji</p>
        </template>
        <input
          type="file"
          ref="congratulationsAvatarInput"
          accept="image/*"
          @change="handleFileChange($event, 'congratulations')"
          class="d-none"
        />
      </v-card>
    </v-col>
  </v-row>
  <v-row class="w-full" align="center">
    <v-col cols="auto">
      <v-switch color="green" v-model="uploadAvatar" hide-details></v-switch>
    </v-col>
    <v-col cols="auto">
      <p class="switch-label">Chcę wgrać swoją wersję avataru</p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { avatarSets } from '../dummyData/avatarSets';
import { ref, reactive } from 'vue';

const dialogueAvatarInput = ref<HTMLInputElement | null>(null);
const mistakeAvatarInput = ref<HTMLInputElement | null>(null);
const congratulationsAvatarInput = ref<HTMLInputElement | null>(null);
const selectedAvatarSet = ref(1);
const uploadAvatar = ref(false);
const uploadImages = reactive<{
  dialogue: string | null;
  mistake: string | null;
  congratulations: string | null;
}>({
  dialogue: null,
  mistake: null,
  congratulations: null
});

const triggerFileInput = (inputType: string) => {
  switch (inputType) {
    case 'dialogue': {
      dialogueAvatarInput.value?.click();
      break;
    }
    case 'mistake': {
      mistakeAvatarInput.value?.click();
      break;
    }
    case 'congratulations': {
      congratulationsAvatarInput.value?.click();
      break;
    }
  }
};

const handleFileChange = (event: Event, type: string) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file || (file && !file.type.startsWith('image/'))) return;
  const fileURL = URL.createObjectURL(file);

  switch (type) {
    case 'dialogue': {
      uploadImages.dialogue = fileURL;
      break;
    }
    case 'mistake': {
      uploadImages.mistake = fileURL;
      break;
    }
    case 'congratulations': {
      uploadImages.congratulations = fileURL;
      break;
    }
  }
};

const handleAvatarSetClick = (id: number) => {
  selectedAvatarSet.value = id;
};
</script>

<style lang="scss" scoped>
.avatar-set-card {
  position: relative;
  cursor: pointer;
  border: 4px solid transparent;

  &.card-active {
    border: 4px solid #7b62fe;
  }

  .selected-dot {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: white;
    background-color: #7b62fe;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      font-size: 14px;
    }
  }
}

.switch-label {
  font-weight: 600;
  font-size: 13px;
  color: #737999;
}

.upload-card {
  border: 1px dashed #d0d2dd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;

  .upload-icon {
    color: #7b62fe;
  }

  .upload-text {
    font-weight: 600;
    font-size: 13px;
    color: #3b4471;
  }
}
</style>
