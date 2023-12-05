<script setup>
import Navbar from "../components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg-gray-100 h-full">
    <Navbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
