<template>
  <v-table class="w-full" rounded="lg">
    <thead>
      <tr>
        <th class="text-left">IMIĘ I NAZWISKO</th>
        <th class="text-left">E-MAIL</th>
        <th class="text-left">OD KIEDY</th>
        <th class="text-left">STOPIEŃ UKOŃCZENIA KURSU</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="d-flex align-center">
            <img class="mr-4" src="/images/student-avatar.png" alt="avatar" />
            <h6 class="table-text">Ewelina Laskowska</h6>
          </div>
        </td>
        <td>
          <h6 class="table-text">ewelina.laskowska@gmail.com</h6>
        </td>
        <td>
          <h6 class="table-text">30.06.2024</h6>
        </td>
        <td>
          <div class="d-flex align-center">
            <div class="mr-2">
              <CircularProgress :progress="66" :size="28" :stroke="6" />
            </div>
            <h6 class="table-text">66%</h6>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="d-flex align-center">
            <img class="mr-4" src="/images/student-avatar.png" alt="avatar" />
            <h6 class="table-text">Alan Halinowski</h6>
          </div>
        </td>
        <td>
          <h6 class="table-text">karolina.bodzio@gmail.com</h6>
        </td>
        <td>
          <h6 class="table-text">30.05.2024</h6>
        </td>
        <td>
          <div class="d-flex align-center">
            <div class="mr-2">
              <CircularProgress :progress="66" :size="28" :stroke="6" />
            </div>
            <h6 class="table-text">66%</h6>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="d-flex align-center">
            <img class="mr-4" src="/images/student-avatar.png" alt="avatar" />
            <h6 class="table-text">Ewelina Laskowska</h6>
          </div>
        </td>
        <td>
          <h6 class="table-text">alan.halinowski@gmail.com</h6>
        </td>
        <td>
          <h6 class="table-text">30.04.2024</h6>
        </td>
        <td>
          <div class="d-flex align-center">
            <div class="mr-2">
              <CircularProgress :progress="66" :size="28" :stroke="6" />
            </div>
            <h6 class="table-text">66%</h6>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import CircularProgress from '~app/modules/onboarding/components/CircularProgress.vue';

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
  margin-bottom: 0;
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
