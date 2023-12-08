<template>
    <div
        class="absolute z-10 bg-gray-700 bg-opacity-30 w-full h-screen top-0 flex justify-center items-center overflow-y-auto">
        <div v-if="cart.length === 0" class="bg-white p-5 rounded-0 lg:rouded-2xl w-full h-full lg:w-auto lg:h-auto">
            <button @click="$emit('close')" class=" border-2 px-3 py-2  rounded-lg text-white">
                <img src="/leftArrow.png" width="30" alt="back">
            </button>
            <h3>
                No Items in cart
            </h3>
        </div>
        <div v-else class="bg-white p-5 rounded-0 lg:rouded-2xl w-full h-full lg:w-auto lg:h-auto">
            <div class="flex gap-5 items-center mb-5 ">
                <button @click="$emit('close')" class=" border-2 px-3 py-2  rounded-lg text-white">
                    <img src="/leftArrow.png" width="30" alt="back">
                </button>
                <h3 class="text-2xl">
                    Cart ({{ cart.length }} Items)
                </h3>

            </div>

            <!-- <div class="flex font-semibold">

                <div class="border p-2">
                    Sl No

                </div>
                <div class="border p-2 w-1/2 align-middle">
                    Name
                </div>
                <div class="border p-2 w-1/4">
                    Price in INR
                </div>
                <div class="border p-2 w-1/6">
                    Qty
                </div>
            </div> -->
            <ul>
                <li :key="cartItem.strMeal" v-for="(cartItem, index) in cart">
                    <div class="flex font-semibold border-b-2 py-5 gap-5">
                        <div>
                            <img :src="cartItem.strMealThumb" class="w-60" alt="">
                        </div>
                        <div class=" p-2 w-full align-middle">
                            <p class="text-xl">
                                {{ cartItem.strMeal }}
                            </p>
                            <p class="text-sm text-gray-500">
                                MRP: &#x20B9;{{ cartItem.idMeal }}
                            </p>
                        </div>
                        <div class="flex flex-col h-full justify-between w-[120px]">
                            <button class="bg-red-600 border-red-500 py-2 rounded mb-5 text-white"
                                @click="removeItemFromCart(cartItem.idMeal)">
                                Delete
                            </button>
                            <div class="border-2 px-2 rounded flex justify-between items-center">
                                <label for="qty">Qty</label>
                                <select :value="cartItem.quantity" name="qty"
                                    @change="changeQuantity(index, $event.target.value)" class="border-0 focus:outline-0">
                                    <option :value="qty" v-for="qty of qtyVals">{{ qty }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <div>
                <h3 class="text-2xl font-bold my-3">Price details</h3>

                <div class="flex text-xl justify-between font-semibold">
                    <p>
                        Cart Value
                    </p>
                    <p>
                        &#x20B9; {{
                            items.reduce((total, meal) => {
                                return total + Number(meal.idMeal) * meal.quantity;
                            }, 0)
                        }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import store from '../store';

defineProps({
    cart: Array,
})
const items = computed(() => store.state.cart);
const qtyVals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const removeItemFromCart = (itemId) => {
    const tempCart = [...items.value];
    const existingItemIndex = tempCart.findIndex((i) => i.idMeal === itemId);
    let updatedCart = tempCart
    if (confirm(`Do you want to remove ${tempCart[existingItemIndex].strMeal} from cart`)) {
        updatedCart = tempCart.filter((item) => item.idMeal !== itemId);
    }
    store.dispatch("changeCartItems", updatedCart)
};

const changeQuantity = (itemIndex, quantity) => {
    const tempCart = [...items.value];
    tempCart[itemIndex] = { ...tempCart[itemIndex], quantity }
    store.dispatch("changeCartItems", tempCart)
}


defineEmits(["close"])
</script>
