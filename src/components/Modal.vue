<template>
    <div class="absolute bg-gray-700 bg-opacity-30 w-full h-full top-0 flex justify-center items-center">
        <div v-if="cart.length === 0" class="bg-white p-5 rounded-2xl">
            <button @click="$emit('close')" class="bg-red-500 p-2 mb-2 rounded-lg text-white">
                Close
            </button>
            <h3>
                No Items in cart
            </h3>
        </div>
        <div v-else class="bg-white p-5 rounded-2xl">
            <button @click="$emit('close')" class="bg-red-500 p-2 mb-2 rounded-lg text-white">
                Close
            </button>

            <div class="flex font-semibold">

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
            </div>
            <ul>
                <li v-for="(cartItem, index) in cart">
                    <div class="flex font-semibold">
                        <div class="p-2 border w-[58px]">{{ index + 1 }}</div>
                        <div class="border p-2 w-1/2 align-middle">
                            {{ cartItem.strMeal }}
                        </div>
                        <div class="border p-2 w-1/4">
                            {{ cartItem.idMeal }}
                        </div>
                        <div class="border p-2 w-1/6">
                            {{ cartItem.quantity }}
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    cart: Array,
})

defineEmits(["close"])
</script>
