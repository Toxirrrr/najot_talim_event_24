<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComp from './components/Header/HeaderComp.vue'
import FooterComp from './components/Footer/FooterComp.vue'
</script>

<template>
  <HeaderComp />
  <main>
    <RouterView />
  </main>
  <FooterComp />
</template>
