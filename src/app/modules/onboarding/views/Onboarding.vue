<template>
  <v-row class="h-full">
    <v-col cols="12" lg="3" class="steps-column px-12 d-flex flex-column justify-center">
      <div class="d-flex flex-column justify-center">
        <div class="content-container">
          <div v-for="step in steps" :key="step.id" class="w-full mb-4">
            <StepCard
              :icon="step.icon"
              :title="step.title"
              :description="step.description"
              :onClick="() => handleStepClick(step.id)"
              :active="step.id <= activeStep"
            />
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" lg="9" class="content-column pa-12">
      <div class="d-flex flex-column justify-center">
        <div class="content-container">
          <v-row class="mb-4" align="center" justify="space-between">
            <v-col cols="auto">
              <h3 class="heading mb-2">Cześć, Adam!</h3>
              <p class="muted-text">Uzupełnij informacje o sobie. Masz możliwość późniejszej edycji.</p>
            </v-col>
            <v-col cols="auto">
              <div class="d-flex align-center">
                <div class="mr-2">
                  <CircularProgress :progress="progress" :size="36" :stroke="6" />
                </div>
                <p class="muted-text">Uzupełniono {{ progress }}%</p>
              </div>
            </v-col>
          </v-row>
          <v-form ref="formRef" :submit="submitForm">
            <div v-if="activeStep === 1">
              <v-text-field
                type="text"
                v-model="aboutData.username"
                placeholder="Pseudonim"
                density="compact"
                rounded
                variant="outlined"
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="aboutData.description"
                placeholder="Opisz siebie"
                density="compact"
                rounded
                variant="outlined"
              ></v-text-field>
            </div>
            <div v-if="activeStep === 2">
              <AvatarForm
                :avatarForm="avatarForm"
                @update:avatars="(val: AvatarFormObj) => Object.assign(avatarForm, val)"
              />
            </div>
            <div v-if="activeStep === 3">
              <v-text-field
                v-model="socialData.instagram"
                variant="plain"
                density="comfortable"
                class="custom-input mb-4"
                placeholder="AdamKnowsLanguages"
                hide-details
              >
                <template #prepend-inner>
                  <div class="input-prefix mr-2">instagram.com/</div>
                </template>
              </v-text-field>
              <v-text-field
                v-model="socialData.youtube"
                variant="plain"
                density="comfortable"
                class="custom-input mb-4"
                placeholder="AdamKnowsLanguages"
                hide-details
              >
                <template #prepend-inner>
                  <div class="input-prefix mr-2">youtube.com/</div>
                </template>
              </v-text-field>
              <v-text-field
                v-model="socialData.facebook"
                variant="plain"
                density="comfortable"
                class="custom-input mb-8"
                placeholder="AdamKnowsLanguages"
                hide-details
              >
                <template #prepend-inner>
                  <div class="input-prefix mr-2">facebook.com/</div>
                </template>
              </v-text-field>
            </div>
            <v-row>
              <v-col cols="12" :sm="buttonColumnSize">
                <v-btn type="button" class="prev-button" v-if="activeStep > 1" block @click="moveStepBackward"
                  >Cofnij</v-btn
                >
              </v-col>
              <v-col cols="12" :sm="buttonColumnSize">
                <v-btn type="button" class="next-button" block :loading="loading" @click="moveStepForward">{{
                  buttonLabel
                }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import StepCard from '../components/StepCard.vue';
import AvatarForm from '../components/AvatarForm.vue';
import CircularProgress from '../components/CircularProgress.vue';
import { steps } from '../dummyData/steps';
import { AboutForm, AvatarForm as AvatarFormObj, SocialMediaForm } from '../store/types';
import { useStore } from 'vuex';
import { onboardingActions, onboardingGetters } from '../store';

const aboutData = reactive<AboutForm>({
  username: '',
  description: ''
});

const avatarForm = reactive<AvatarFormObj>({
  selectedAvatarSet: 1,
  dialogue: null,
  mistake: null,
  congratulations: null
});

const socialData = reactive<SocialMediaForm>({
  instagram: '',
  youtube: '',
  facebook: ''
});

const store = useStore();
const activeStep = computed(() => store.getters[onboardingGetters.getActiveStepId]);
const progress = computed(() => store.getters[onboardingGetters.getProgress]);
const formRef = ref<HTMLFormElement | null>(null);
const loading = ref(false);

const setStepForward = () => store.dispatch(onboardingActions.setStepForward);
const setStepBackward = () => store.dispatch(onboardingActions.setStepBackward);
const updateAboutForm = (data: AboutForm) => store.dispatch(onboardingActions.setAboutForm, { data });
const updateAvatarForm = (data: AvatarFormObj) => store.dispatch(onboardingActions.setAvatarForm, { data });
const updateSocialMediaForm = (data: SocialMediaForm) => store.dispatch(onboardingActions.setAboutForm, { data });
const setActiveStepId = (stepId: number) => store.dispatch(onboardingActions.setActiveStepId, { stepId });

const buttonLabel = computed(() => {
  if (activeStep.value === 3) {
    return 'Zakończ';
  }
  return 'Dalej';
});

const buttonColumnSize = computed(() => {
  if (activeStep.value > 1) {
    return 6;
  }
  return 12;
});

const moveStepForward: () => void = async () => {
  if (loading.value) {
    return;
  }
  if (activeStep.value === 3) {
    return submitForm();
  }
  const { valid } = await formRef.value?.validate();
  if (valid) {
    setStepForward();
  }
};

const moveStepBackward = () => {
  setStepBackward();
};

const submitForm = () => {
  if (activeStep.value < 3) {
    return moveStepForward();
  }

  switch (activeStep.value) {
    case 1: {
      updateAboutForm(aboutData);
      break;
    }
    case 2: {
      updateAvatarForm(avatarForm);
      break;
    }
    case 3: {
      updateSocialMediaForm(socialData);
      break;
    }
  }
};

const handleStepClick = (id: number) => {
  setActiveStepId(id);
};
</script>

<style lang="scss">
.steps-column {
  background-color: #f9f9fb;

  & > div {
    @media (min-width: 1280px) {
      height: 100%;
    }
  }
}

.content-column {
  background-color: #fff;

  & > div {
    @media (min-width: 1280px) {
      height: 100%;
    }
  }
}

.content-container {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

.heading {
  font-weight: 700;
  font-size: 24px;
  color: #161d40;
  text-transform: initial;
}

.muted-text {
  font-weight: 600;
  font-size: 14px;
  color: #6b708a;
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

.btn-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.input-prefix {
  background-color: #f9f9fb;
  padding: 16px;
  color: #3b4471;
  font-weight: 600;
  font-size: 14px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  height: 100%;
  min-width: 140px;
}

.custom-input {
  border: 1px solid #f2f0ff;
  border-radius: 12px;
}

.v-field__prepend-inner {
  padding: 0 !important;
}
</style>
