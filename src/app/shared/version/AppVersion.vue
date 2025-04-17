<template>
  <div class="app-version text--disabled">
    <strong>UI:</strong>
    v{{ frontend.version }}

    <template v-if="backend.version">
      <strong>API:</strong>
      v{{ backend.version }}
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { api } from '~app/core/api/client';
import info from '../../../../package.json';

interface VersionInfo {
  version: string;
}

const frontend = { version: info.version };
const backend = ref<Partial<VersionInfo>>({});

onMounted(async () => {
  try {
    const res = await api.get<VersionInfo>('/api/version');
    if (res?.data) {
      backend.value = res.data;
    }
  } catch (error) {
    // Handle or log error silently
  }
});
</script>
