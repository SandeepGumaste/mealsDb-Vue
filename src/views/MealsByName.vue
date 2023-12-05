<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import { useRoute } from "vue-router";
import store from "../store";

const keyword = ref("");
const meals = computed(() => store.state.searchedMeals);
const route = useRoute();

const getMeals = () => {
  if (keyword.value && keyword.value.length > 3) {
    store.dispatch("searchMeals", keyword.value);
  }
};
watchEffect(() => {
  getMeals();
}, keyword.value);

onMounted(() => {
  keyword.value = route.params.name;
  if (keyword.value) {
    getMeals();
  }
});
</script>

<template>
  <div class="p-8 pb-0">
    <input
      type="text"
      name="search"
      v-model="keyword"
      class="rounded border-2 border-gray-200 w-full"
      placeholder="Search for meals"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-8">
    <div
      v-for="meal of meals"
      :key="meal.idMeal"
      class="bg-white shadow rounded-xl overflow-hidden"
    >
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-96 object-cover"
      />
      <div class="px-3">
        <h3 class="font-bold">
          {{ meal.strMeal }}
        </h3>
        <p></p>
        <div class="py-3 flex items-center gap-3">
          <a
            :href="meal.strYoutube"
            target="_blank"
            class="px-3 py-2 rounded border-2 border-red-600 bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Youtube
          </a>
          <RouterLink
            :to="{
              name: 'mealDetails',
              params: {
                id: meal.idMeal,
              },
            }"
            class="px-3 py-2 rounded border-2 border-purple-600 bg-purple-500 hover:bg-purple-600 text-white transition-colors"
          >
            View
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
