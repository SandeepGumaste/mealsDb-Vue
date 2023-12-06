<script setup>
import { computed, watch, ref } from "vue";
import store from "../store";
import { RouterLink } from "vue-router";
import Modal from "./Modal.vue";

const cart = computed(() => store.state.cart);
const isCartOpen = ref(false)

const calculateCartTotal = () => {
  return cart.value.reduce((total, meal) => {
    return total + Number(meal.idMeal) * meal.quantity;
  }, 0);
};


watch(cart.value, () => calculateCartTotal());
</script>

<template>
  <Teleport to="body">
    <Modal v-if="isCartOpen" :cart="cart" @close="isCartOpen = false" />
  </Teleport>
  <header class="bg-white shadow-md h-16 flex justify-between">
    <RouterLink :to="{ name: 'home' }" class="inline-flex items-center h-full px-5">
      Home
    </RouterLink>
    <div class="flex items-center gap-1">
      <div class="border-r-2 pr-3 cursor-pointer" @click="isCartOpen = true">
        Cart Total : INR {{ calculateCartTotal() }}
      </div>
      <RouterLink :to="{ name: 'byName' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-purple-100">
        Search Meals
      </RouterLink>
      <RouterLink :to="{ name: 'byLetter' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-purple-100">
        Meals by Letter
      </RouterLink>
      <RouterLink :to="{ name: 'byIngredient' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-purple-100">
        Meals by Ingredient
      </RouterLink>
    </div>
  </header>
</template>

<!-- <script>
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      cartItems: cart ? cart.value : [],
    };
  },
};
</script> -->
