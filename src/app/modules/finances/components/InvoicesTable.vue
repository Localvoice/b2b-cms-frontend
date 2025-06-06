<template>
  <v-table class="w-full" rounded="lg">
    <thead>
      <tr>
        <th class="text-left">FAKTURA</th>
        <th class="text-left">STATUS</th>
        <th class="text-left">DATA WYSTAWIENIA</th>
        <th class="text-left">KWOTA</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in invoices" :key="invoice.invoiceId">
        <td>
          <h6 class="table-text">{{ invoice.name }}</h6>
        </td>
        <td>
          <v-chip v-if="invoice.status === 'PAID'" size="small" color="green" class="d-inline-flex align-center">
            <div class="green-dot mr-2"></div>
            <span>Zapłacone</span>
          </v-chip>
        </td>
        <td>
          <h6 class="table-text">{{ formatDateString(invoice.dateOfIssue) }}</h6>
        </td>
        <td>
          <h6 class="table-text">{{ invoice.amount }} zł</h6>
        </td>
        <td>
          <v-btn class="download-btn" append-icon="mdi-download" variant="plain" rounded>Pobierz</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import InvoiceModel from '../models/invoice';

defineProps<{
  invoices: InvoiceModel[];
}>();

const formatDateString = (date: string) => {
  return date.split('T')[0];
};
</script>

<style lang="scss" scoped>
thead {
  background-color: #f9f9fb;
}
th {
  text-transform: uppercase;
  color: #161d40;
  font-weight: 600 !important;
  font-size: 12px;
}
td {
  padding: 16px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table-text {
  color: #3b4471;
  font-weight: 600;
  font-size: 13px;
}
.green-dot {
  width: 6px;
  height: 6px;
  background-color: #05c22d;
  border-radius: 50%;
}
.download-btn {
  background-color: #f9f9fb;
  color: #7b62fe !important;
  font-weight: 600;
  font-size: 13px;
  text-transform: initial;
}
</style>
