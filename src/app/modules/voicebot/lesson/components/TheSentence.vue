<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import FormControlState from '~app/shared/form/FormControlState.vue';
import SentenceExample from './SentenceExample.vue';
import { ValidationTarget } from '~app/shared/types';
import SentenceExercisesModel from '../models/sentenceExerciseModel';
import { createSentenceForm } from '../validation/forms';

// Props
const props = defineProps<{
  sentenceExercise: SentenceExercisesModel;
  sentenceIndex: number;
}>();

// Emits
const emit = defineEmits<{
  (e: 'updateSentence', payload: { sentence: string; sentenceIndex: number }): void;
  (e: 'addSentenceExample', sentenceIndex: number): void;
  (e: 'insertSentence', sentenceIndex: number): void;
  (e: 'removeSentence', payload: { sentenceIndex: number; validationIds: string[] }): void;
  (e: 'updateSentenceExample', payload: any): void;
  (e: 'insertSentenceExample', payload: any): void;
  (e: 'removeSentenceExample', payload: any): void;
  (e: 'savePicture', payload: any): void;
  (e: 'removePicture', payload: any): void;
  (e: 'validation', payload: any): void;
}>();

const { t } = useI18n();

// Form state
const form = createSentenceForm();
const validationId = ref('');
const sentenceExampleValidationIds = ref<string[]>([]);
const index = computed(() => props.sentenceIndex + 1);

// Watchers
watch(
  () => props.sentenceExercise,
  (newExercise) => {
    console.log('sentenceExercise', newExercise);
    validationId.value = `sentence-${props.sentenceIndex}`;
    form.data = newExercise;
    emit('validation', {
      data: form,
      id: validationId.value,
      targets: [ValidationTarget.TEST]
    });
  },
  { immediate: true, deep: true }
);

// Methods
function setSentenceExampleValidationIds(id: string) {
  sentenceExampleValidationIds.value.push(id);
}
</script>

<template>
  <v-col cols="10" class="offset-md-1">
    <base-card>
      <v-card-title class="pb-0">{{ t('labels.sentenceTitle') }}</v-card-title>

      <v-btn class="ml-n16 mt-10" color="primary" absolute dark small fab>
        <v-icon>{{ index }}</v-icon>
      </v-btn>

      <v-card-text>
        <form-control-state v-slot="{ message }" :errors="form.errors.sentence">
          <v-text-field
            :counter="50"
            :error-messages="message"
            :label="t('labels.sentenceToLearn')"
            :placeholder="t('labels.sentencePlaceholder')"
            :model-value="props.sentenceExercise.sentence"
            @update:model-value="
              (value) => emit('updateSentence', { sentence: value, sentenceIndex: props.sentenceIndex })
            "
          />
        </form-control-state>

        <v-btn color="success" class="mr-4" @click="emit('addSentenceExample', props.sentenceIndex)">
          {{ t('buttons.addSentenceExample') }}
        </v-btn>

        <v-btn color="primary" class="mr-4" @click="emit('insertSentence', props.sentenceIndex)">
          {{ t('buttons.addExample') }}
        </v-btn>

        <v-btn
          color="error"
          dark
          class="mr-4"
          @click="
            emit('removeSentence', {
              sentenceIndex: props.sentenceIndex,
              validationIds: [...sentenceExampleValidationIds, validationId]
            })
          "
        >
          Usuń słowo/wyrażenie
        </v-btn>
      </v-card-text>
    </base-card>

    <div
      v-for="(sentenceExample, sentenceExampleIndex) in props.sentenceExercise.sentenceExample"
      :key="sentenceExampleIndex"
    >
      <sentence-example
        :sentence="props.sentenceExercise.sentence"
        :sentence-index="props.sentenceIndex"
        :sentence-example="sentenceExample"
        :sentence-example-index="sentenceExampleIndex"
        @updateSentenceExample="emit('updateSentenceExample', $event)"
        @insertSentenceExample="emit('insertSentenceExample', $event)"
        @removeSentenceExample="emit('removeSentenceExample', $event)"
        @savePicture="emit('savePicture', $event)"
        @removePicture="emit('removePicture', $event)"
        @validation="emit('validation', $event)"
        @sentenceExampleValidationId="setSentenceExampleValidationIds"
      />
    </div>
  </v-col>
</template>
