<template>
  <div class="container h-100">
    <div class="row align-items-center h-100">
      <div class="col-md-7 mt-5">
        <img
            v-bind:src="`https://www.mcdonalds.co.za/media/products/big-mac/McDonalds-Image-Resize.psdBig-mac.png`"
            class="img-fluid"
            alt="...">
      </div>
      <div class="col-md-5 mt-5">
        <div class="description-content">
          <h1 class="display-4 font-weight-bold">
            Steers Prince Burger
          </h1>
          <p class="lead">The wacky wednesday special gives you 2 chicken or beef burgers and small chips. A fully
            loaded
            burger box
            for the price of one</p>
        </div>
      </div>
    </div>
    <MenuItemIngredients :ingredients="ingredients"/>
    <MenuItemAllergens :allergens="allergens"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {fakeIngredients, fakeAllergens} from "@/fake";
import {MenuItemIngredient, MenuItemAllergen} from "@/types/types";
import {$axios} from "@/api/common";
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  name: "MenuItemView",
  components: {
    MenuItemIngredients: () => import("@/components/menu/MenuItemIngredients.vue"),
    MenuItemAllergens: () => import("@/components/menu/MenuItemAllergens.vue")
  },
  data() {
    return {
      ingredients: [] as MenuItemIngredient[],
      allergens: [] as MenuItemAllergen[]
    }
  },
  async mounted() {
    this.ingredients = fakeIngredients;
    this.allergens = fakeAllergens;

    await this.getIngredients()
    await this.getAllergens()
  },
  methods: {

    async getIngredients() {
      const response = await apiAdapter.get<MenuItemIngredient[]>('/menu-item/2/ingredients');
      this.ingredients = response.data
    },
    async getAllergens() {
      const response = await apiAdapter.get<MenuItemAllergen[]>('/menu-item/2/allergens')
      this.allergens = response.data
    }
  }
})
</script>

<style scoped>

</style>
