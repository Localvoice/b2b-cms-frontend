<template>
  <v-card class="pa-4" color="grey-lighten-5" border rounded="lg">
    <v-row>
      <v-col cols="12" sm="6">
        <p class="label mb-1">Nazwa firmy</p>
        <v-text-field
          v-if="isEditing"
          id="companyName"
          density="compact"
          rounded
          variant="outlined"
          required
          bg-color="white"
          :rules="[companyNameRules.required]"
          placeholder="Wpisz nazwę firmy"
          v-model="userData.companyName"
        ></v-text-field>
        <h6 v-if="!isEditing" class="muted-text">{{ userData.companyName }}</h6>
      </v-col>
      <v-col cols="12" sm="6">
        <p class="label mb-1">NIP</p>
        <v-text-field
          v-if="isEditing"
          id="taxId"
          density="compact"
          rounded
          variant="outlined"
          required
          bg-color="white"
          :rules="[taxIdRules.required]"
          placeholder="Wpisz NIP"
          v-model="userData.taxId"
        ></v-text-field>
        <h6 v-if="!isEditing" class="muted-text">{{ userData.taxId }}</h6>
      </v-col>
      <v-col cols="12" sm="6">
        <p class="label mb-1">Ulica</p>
        <v-text-field
          v-if="isEditing"
          id="street"
          density="compact"
          rounded
          variant="outlined"
          required
          bg-color="white"
          :rules="[streetRules.required]"
          placeholder="Wpisz NIP"
          v-model="userData.street"
        ></v-text-field>
        <h6 v-if="!isEditing" class="muted-text">{{ userData.street }}</h6>
      </v-col>
      <v-col cols="12" sm="6">
        <p class="label mb-1">Nr mieszkania i/lub bloku</p>
        <v-text-field
          v-if="isEditing"
          id="apartmentNumber"
          density="compact"
          rounded
          variant="outlined"
          required
          bg-color="white"
          :rules="[apartmentNumberRules.required]"
          placeholder="Wpisz numer mieszkania i/lub bloku"
          v-model="userData.apartmentNumber"
        ></v-text-field>
        <h6 v-if="!isEditing" class="muted-text">{{ userData.apartmentNumber }}</h6>
      </v-col>
      <v-col cols="12" sm="6">
        <p class="label mb-1">Kod pocztowy</p>
        <v-text-field
          v-if="isEditing"
          id="postalCode"
          density="compact"
          rounded
          variant="outlined"
          required
          bg-color="white"
          :rules="[postalCodeRules.required, postalCodeRules.pattern]"
          placeholder="Wpisz kod pocztowy"
          v-model="userData.postalCode"
        ></v-text-field>
        <h6 v-if="!isEditing" class="muted-text">{{ userData.postalCode }}</h6>
      </v-col>
      <v-col cols="12" sm="6">
        <p class="label mb-1">Miejscowość</p>
        <v-text-field
          v-if="isEditing"
          id="city"
          density="compact"
          rounded
          variant="outlined"
          required
          bg-color="white"
          :rules="[cityRules.required]"
          placeholder="Wpisz kod pocztowy"
          v-model="userData.city"
        ></v-text-field>
        <h6 v-if="!isEditing" class="muted-text">{{ userData.city }}</h6>
      </v-col>
      <v-col cols="12" sm="6">
        <p class="label mb-1">Kraj</p>
        <v-text-field
          v-if="isEditing"
          id="country"
          density="compact"
          rounded
          variant="outlined"
          required
          bg-color="white"
          :rules="[countryRules.required]"
          placeholder="Wpisz kraj"
          v-model="userData.country"
        ></v-text-field>
        <h6 v-if="!isEditing" class="muted-text">{{ userData.country }}</h6>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { financesGetters } from '../store';

const store = useStore();
const invoiceData = computed(() => store.getters[financesGetters.getInvoiceData]);
const isEditing = computed(() => store.getters[financesGetters.isEditing]);

const userData = reactive({ ...invoiceData.value });

const companyNameRules = {
  required: (v: string) => !!v || 'Nazwa firmy jest wymagana'
};

const taxIdRules = {
  required: (v: string) => !!v || 'NIP jest wymagany'
};

const streetRules = {
  required: (v: string) => !!v || 'Ulica jest wymagana'
};

const apartmentNumberRules = {
  required: (v: string) => !!v || 'Numer mieszkania jest wymagany'
};

const postalCodeRules = {
  required: (v: string) => !!v || 'Kod pocztowy jest wymagany',
  pattern: (v: string) => /^[0-9]{2}-[0-9]{3}$/.test(v) || 'Niepoprawny format kodu pocztowego'
};

const cityRules = {
  required: (v: string) => !!v || 'Miasto jest wymagane'
};

const countryRules = {
  required: (v: string) => !!v || 'Kraj jest wymagany'
};
</script>

<style lang="scss" scoped></style>
