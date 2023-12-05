<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../store";
import axiosClient from "../axiosClient";

const meals = computed(() => store.state.meals);
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ingredients = ref([]);

onMounted(async () => {
  const res = await axiosClient.get("list.php?i=list");
  ingredients.value = res.data;
  console.log(res.data);
});
</script>

<template>
  <div class="flex p-8 flex-col h-full">
    <div class="flex gap-2 justify-center mt-2">
      <router-link
        :to="{ name: 'byLetter', params: { letter } }"
        v-for="letter of letters"
        :key="{ letter }"
      >
        {{ letter }}
      </router-link>
    </div>
  </div>
</template>
