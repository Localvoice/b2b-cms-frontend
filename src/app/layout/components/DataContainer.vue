<template>
  <v-main app>
    <v-container class="pt-10">
      <router-view />
    </v-container>
  </v-main>
</template>

<script>
export default {};
</script>

<style lang="scss">
.v-main__wrap {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
