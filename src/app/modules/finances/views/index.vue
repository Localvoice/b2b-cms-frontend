<template>
  <Card>
    <v-row justify="space-between" align="center">
      <v-col>
        <h4>Finanse</h4>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn v-if="activeTab === 'invoice-details'" class="confirm-btn" @click="handleEditingClick" rounded>{{
          isEditing ? 'Zapisz zmiany' : 'Edytuj informacje'
        }}</v-btn>
      </v-col>
    </v-row>
    <v-tabs class="tabs mb-8 w-full" v-model="activeTab" @update:modelValue="onTabChange">
      <v-tab value="income">Przychody</v-tab>
      <v-tab value="invoice-details">Dane do faktury</v-tab>
    </v-tabs>
    <div class="w-full" v-if="activeTab === 'income'">
      <v-row class="w-full mb-8">
        <v-col cols="12" md="6" lg="3" v-for="stats in financeStats" :key="stats.id">
          <FinanceStatTile
            :heading="stats.heading"
            :text="stats.text"
            :percentageDifference="stats.percentageDifference"
            :type="stats.type"
          />
        </v-col>
      </v-row>
      <v-row class="w-full mb-8">
        <v-col cols="12" lg="8">
          <v-card elevation="0" class="pa-4 w-full h-full" border rounded="lg">
            <v-row class="w-full mb-8" justify="space-between" align="center">
              <v-col cols="auto">
                <h5>Statystyki</h5>
              </v-col>
              <v-col cols="auto">
                <v-select
                  :items="['Ten miesiąc', 'Ten rok']"
                  density="compact"
                  v-model="statsRange"
                  bg-color="white"
                  rounded
                  border
                  class="select"
                ></v-select>
              </v-col>
            </v-row>
            <BarChart :series="barChart" />
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card elevation="0" class="pa-4 w-full h-full d-flex flex-column" border rounded="lg">
            <p class="muted-text mb-4">ROZKŁAD PRZYCHODU</p>
            <h5 class="mb-4">Kursy przynoszą większy przychód niż pojedyncze lekcje</h5>
            <p class="description-text mb-8">
              Obecnie większość przychodu pochodzi ze sprzedaży kursów, które odpowiadają za ponad połowę całkowitego
              zysku.
            </p>
            <div class="d-flex d-lg-block d-xl-flex align-center justify-center mt-auto">
              <DonutChart :series="[80, 20]" :labels="['Lekcje', 'Kursy']" :width="180" :height="180" />
              <div class="ml-4">
                <div class="d-flex align-center mb-4">
                  <div class="green-dot mr-2"></div>
                  <p class="muted-text">Gramatyka</p>
                </div>
                <div class="d-flex align-center">
                  <div class="blue-dot mr-2"></div>
                  <p class="muted-text">Nauka wymowy</p>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="w-full">
        <InvoicesTable :invoices="invoices" />
      </v-row>
    </div>
    <div class="w-full" v-if="activeTab === 'invoice-details'">
      <InvoiceDataForm />
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '~app/shared/base/Card.vue';
import FinanceStatTile from '../components/FinanceStatTile.vue';
import BarChart from '../components/BarChart.vue';
import InvoicesTable from '../components/InvoicesTable.vue';
import DonutChart from '~app/modules/stats/components/DonutChart.vue';
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { financeStats } from '../dummyData/financeStats';
import { barChart } from '../dummyData/charts';
import { useStore } from 'vuex';
import { financesActions, financesGetters } from '../store';
import InvoiceDataForm from '../components/InvoiceDataForm.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const activeTab = ref(route.query.tab || 'income');
const statsRange = ref('Ten miesiąc');

const setInvoicesData = () => store.dispatch(financesActions.setInvoicesData);
const toggleEditing = () => store.dispatch(financesActions.toggleEditing);
const invoices = computed(() => store.getters[financesGetters.getInvoices]);
const isEditing = computed(() => store.getters[financesGetters.isEditing]);
const userData = computed(() => store.getters[financesGetters.getInvoiceData]);

const handleEditingClick = () => {
  if (isEditing.value) {
    console.log('userData changed', userData.value);
  }
  toggleEditing();
};

const onTabChange = (newTab: string) => {
  router.replace({
    query: {
      ...route.query,
      tab: newTab
    }
  });
};

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab && newTab !== activeTab.value) {
      activeTab.value = newTab;
    }
  }
);

onMounted(() => {
  setInvoicesData();
  if (route.query.tab) {
    activeTab.value = route.query.tab;
  }
});
</script>

<style lang="scss">
.confirm-btn {
  background-color: #fe5b14;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-transform: initial;
}
.tabs {
  border-bottom: 1px solid #f2f0ff;
}
.v-tab__slider {
  background-color: #7b62fe;
  height: 3px;
}
.v-slide-group__container .v-btn__content {
  font-weight: 600;
  font-size: 14px;
  color: #6b708a;
  text-transform: initial;
}
.select .v-field__outline {
  display: none;
}
.select .v-field {
  border: 1px solid #f2f0ff;
}
.green-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #05c22d;
}
.blue-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2a61d9;
}
.description-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
.muted-text {
  color: #6b708a;
  font-weight: 600;
  font-size: 13px;
}
</style>
