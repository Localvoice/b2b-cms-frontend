<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { VCol, VCardTitle, VBtn, VIcon, VCardText, VTextField, VImg, VFileInput } from 'vuetify/components';
import FormControlState from '~app/shared/form/FormControlState.vue';
import { ValidationTarget } from '~app/shared/types';
import SentenceExampleExercisesModel from '../models/sentenceExampleExerciseModel';
import { createSentenceExampleForm } from '../validation/forms';

const props = defineProps<{
  sentenceExample: SentenceExampleExercisesModel;
  sentenceExampleIndex: number;
  sentenceIndex: number;
  sentence: string;
}>();

const emit = defineEmits<{
  (e: 'updateSentenceExample', payload: any): void;
  (e: 'insertSentenceExample', payload: any): void;
  (e: 'removeSentenceExample', payload: any): void;
  (e: 'validation', payload: any): void;
  (e: 'sentenceExampleValidationId', validationId: string): void;
  (e: 'savePicture', payload: any): void;
  (e: 'removePicture', payload: any): void;
}>();

const { t } = useI18n();

const form = createSentenceExampleForm();
const validationId = ref('');
const index = computed(() => props.sentenceExampleIndex + 1);

// Watchers
watch(
  () => props.sentenceExample,
  (newExample) => {
    console.log('sentenceExample watcher');
    validationId.value = `sentence-${props.sentenceIndex}-sentenceExample-${props.sentenceExampleIndex}`;
    form.data = newExample;
    emit('validation', {
      data: form,
      id: validationId.value,
      targets: [ValidationTarget.TEST]
    });
  },
  { immediate: true, deep: true }
);

watch(
  validationId,
  (newVal) => {
    emit('sentenceExampleValidationId', newVal);
  },
  { immediate: true }
);

// Methods
function updatePicture(event: File | null = null, imageSrc: string | undefined) {
  console.log('updatePicture event', event);
  console.log('imageSrc', imageSrc);
  if (event && (event as any).name?.startsWith('https')) return;

  const emitterName = !event ? 'removePicture' : 'savePicture';
  emit(emitterName, {
    file: event,
    sentenceIndex: props.sentenceIndex,
    sentenceExampleIndex: props.sentenceExampleIndex,
    sentenceExampleStructure: {
      imageSrc
    }
  });
}
</script>

<template>
  <v-col cols="12" class="offset-md-1">
    <base-card>
      <v-card-title class="pb-0">
        {{ t('labels.exampleForSentence', { sentence: props.sentence }) }}
      </v-card-title>

      <v-btn class="ml-n16" color="primary" style="margin-top: 80px" absolute dark small fab>
        <v-icon>{{ index }}</v-icon>
      </v-btn>

      <v-card-text>
        <form-control-state v-slot="{ message }" :errors="form.errors.example">
          <v-text-field
            :hint="t('labels.hintForSentenceExample')"
            :label="t('labels.sentenceExample')"
            :placeholder="t('labels.sentenceExamplePlaceholder')"
            :model-value="props.sentenceExample.example"
            :error-messages="message"
            @update:model-value="
              (value) =>
                emit('updateSentenceExample', {
                  sentenceIndex: props.sentenceIndex,
                  sentenceExampleIndex: props.sentenceExampleIndex,
                  sentenceExampleStructure: { example: value }
                })
            "
          />
        </form-control-state>

        <form-control-state v-slot="{ message }" :errors="form.errors.translatedExample">
          <v-text-field
            :label="t('labels.translatedSentenceExample')"
            :placeholder="t('labels.translatedSentenceExamplePlaceholder')"
            :model-value="props.sentenceExample.translatedExample"
            :error-messages="message"
            @update:model-value="
              (value) =>
                emit('updateSentenceExample', {
                  sentenceIndex: props.sentenceIndex,
                  sentenceExampleIndex: props.sentenceExampleIndex,
                  sentenceExampleStructure: { translatedExample: value }
                })
            "
          />
        </form-control-state>

        <div class="d-flex">
          <v-img
            v-if="props.sentenceExample.imageSrc"
            :src="props.sentenceExample.imageSrc"
            class="create-lesson-image-localvoice"
          />
          <form-control-state
            v-slot="{ message, blobFile }"
            :image="props.sentenceExample.imageSrc"
            :errors="form.errors.imageSrc"
          >
            <v-file-input
              v-if="props.sentenceExample"
              :label="t('labels.fileInput')"
              flat
              :model-value="blobFile"
              :error-messages="message"
              class="d-inline-flex localvoice-file-input"
              truncate-length="4"
              @change="(value) => updatePicture(value, props.sentenceExample.imageSrc)"
            />
          </form-control-state>
        </div>

        <v-btn
          color="success"
          class="mr-4"
          @click="
            emit('insertSentenceExample', {
              sentenceIndex: props.sentenceIndex,
              sentenceExampleIndex: props.sentenceExampleIndex
            })
          "
        >
          <v-icon left>mdi-comment-plus-outline</v-icon>
          {{ t('buttons.addAnotherSentenceExample') }}
        </v-btn>

        <v-btn
          color="warning"
          class="mr-4"
          @click="
            emit('removeSentenceExample', {
              sentenceIndex: props.sentenceIndex,
              sentenceExampleIndex: props.sentenceExampleIndex,
              validationId: validationId
            })
          "
        >
          <v-icon left>mdi-comment-remove-outline</v-icon>
          {{ t('buttons.removeSentenceExample') }}
        </v-btn>
      </v-card-text>
    </base-card>
  </v-col>
</template>
