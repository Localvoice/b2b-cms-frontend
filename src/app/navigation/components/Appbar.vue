<template>
  <v-app-bar :elevation="2" class="px-8">
    <div class="d-lg-none mr-4">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </div>
    <router-link to="/" class="mr-8">
      <img :src="Logoipsum" alt="app-logo" />
    </router-link>
    <div class="d-none d-lg-block">
      <div class="nav-wrapper">
        <router-link :key="item.id" v-for="item in menuItems" :to="item.to">
          <v-btn
            :prepend-icon="item.icon"
            class="nav-btn"
            :class="['nav-btn', { active: route.path === item.to }]"
            rounded="lg"
            >{{ item.title }}</v-btn
          >
        </router-link>
      </div>
    </div>
    <v-spacer />
    <div class="d-none d-lg-block">
      <Account :avatarUrl="AvatarPlaceholder" :name="'Adam Kowalski'" :email="'adam.kowalski@example.com'" />
    </div>
    <v-btn class="notification-btn ml-4" icon="mdi-bell-outline"></v-btn>
  </v-app-bar>
</template>

<script setup>
import Logoipsum from '../../../assets/images/Logo.png';
import AvatarPlaceholder from '../../../assets/images/avatar.png';
import Account from './Account.vue';
import { menuItems } from '../data/menu-items';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style lang="scss">
.nav-btn {
  text-transform: initial;
  font-weight: 600;
  font-size: 14px;
  color: #6b708a;
  &.active {
    background-color: #f2f0ff;
    color: #7b62fe;
  }
}
.nav-wrapper {
  display: flex;
  gap: 16px;
}
.notification-btn {
  width: 42px;
  height: 42px;
  color: #fe5b14;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f2f0ff;
  font-size: 14px;
}
</style>
