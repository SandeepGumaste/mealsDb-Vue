<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="bg-white shadow-md h-16 flex justify-between">
    <RouterLink
      :to="{ name: 'home' }"
      class="inline-flex items-center h-full px-5"
    >
      Home
    </RouterLink>
    <div class="flex items-center gap-1">
      <RouterLink
        :to="{ name: 'byName' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-purple-100"
      >
        Search Meals
      </RouterLink>
      <RouterLink
        :to="{ name: 'byLetter' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-purple-100"
      >
        Meals by Letter
      </RouterLink>
      <RouterLink
        :to="{ name: 'byIngredient' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-purple-100"
      >
        Meals by Ingredient
      </RouterLink>
    </div>
  </header>
</template>
