<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import { useRoute } from "vue-router";
import store from "../store";

const keyword = ref("");
const cart = ref([]);
const meals = computed(() => store.state.searchedMeals);
const route = useRoute();

const getMeals = () => {
  if (keyword.value && keyword.value.length > 3) {
    store.dispatch("searchMeals", keyword.value);
  }
};

const handleAddToCart = (item) => {
  let tempCart = [...cart.value];
  const existingItemIndex = tempCart.findIndex((i) => i.idMeal === item.idMeal);
  if (existingItemIndex >= 0) {
    tempCart[existingItemIndex] = {
      ...tempCart[existingItemIndex],
      quantity: tempCart[existingItemIndex].quantity + 1,
    };
  } else {
    tempCart = [
      ...tempCart,
      {
        ...item,
        quantity: 1,
      },
    ];
    alert(`Added ${item.strMeal} to cart`)
  }

  cart.value = tempCart;
};

const removeItemFromCart = (itemId) => {
  const tempCart = [...cart.value];
  const existingItemIndex = tempCart.findIndex((i) => i.idMeal === itemId);
  let updatedCart = tempCart
  if (existingItemIndex >= 0 && updatedCart[existingItemIndex].quantity > 1) {
    updatedCart[existingItemIndex] = {
      ...updatedCart[existingItemIndex], quantity: updatedCart[existingItemIndex].quantity - 1
    }
  } else {
    if (confirm(`Do you want to remove ${tempCart[existingItemIndex].strMeal} from cart`)) {
      updatedCart = tempCart.filter((item) => item.idMeal !== itemId);
    }
  }
  cart.value = updatedCart;
};
watchEffect(() => {
  getMeals();
}, keyword.value);

watchEffect(() => {
  store.dispatch("changeCartItems", cart.value);
}, cart.value);

onMounted(() => {
  keyword.value = route.params.name;
  if (keyword.value) {
    getMeals();
  }
});
</script>

<template>
  <div class="p-8 pb-0">
    <input type="text" name="search" v-model="keyword" class="rounded border-2 border-gray-200 w-full"
      placeholder="Search for meals" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-8">
    <div v-for="meal of meals" :key="meal.idMeal" class="bg-white shadow rounded-xl overflow-hidden">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-96 object-cover" />
      <div class="px-3">
        <h3 class="font-bold">
          {{ meal.strMeal }}
        </h3>
        <p class="font-semibold">price: INR {{ meal.idMeal }}</p>
        <div class="py-3 flex items-center gap-3">
          <!-- <a
            :href="meal.strYoutube"
            target="_blank"
            class="px-3 py-2 rounded border-2 border-red-600 bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Youtube
          </a> -->
          <RouterLink :to="{
            name: 'mealDetails',
            params: {
              id: meal.idMeal,
            },
          }"
            class="px-3 py-2 rounded border-2 border-purple-600 bg-purple-500 hover:bg-purple-600 text-white transition-colors">
            View
          </RouterLink>
          <button v-if="!cart.find((item) => item.idMeal === meal.idMeal)"
            class="px-3 py-2 rounded border-2 border-green-600 bg-green-500 hover:bg-green-600 text-white transition-colors"
            @click="handleAddToCart(meal)">
            Add to cart
          </button>
          <div v-else class="flex gap-3 items-center font-bold">
            <button @click="handleAddToCart(meal)" class="bg-green-600 py-2 px-3 text-white rounded">+</button>
            <p class="text-xl">
              {{ cart.find((item) => item.idMeal === meal.idMeal).quantity }}
            </p>
            <button @click="removeItemFromCart(meal.idMeal)" class=" bg-red-600 py-2 px-4 text-white rounded">-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
