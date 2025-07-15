<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal>
      <q-toolbar class="back-color">
        <q-toolbar-title>
        </q-toolbar-title>

        <div>
          <q-btn
            flat
            dense
            round
            icon="logout"
            color="primary"
            aria-label="logout"
            size="large"
            @click="logout()"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { routerService } from 'src/services/router.service';

function logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  routerService.navigateToLogin();
}
</script>

<style lang="sass" scoped>
.back-color
  background-color: $backgr
</style>
