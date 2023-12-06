import axiosClient from "../axiosClient";

export async function searchMeals({ commit }, keyword) {
  axiosClient.get(`search.php?s=${keyword}`).then(({ data }) => {
    commit("setSearchedMeals", data.meals);
  });
}

export function changeCartItems({ commit }, cartItems) {
  commit("setCartItems", cartItems);
}
