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
          <h1 class="display-4">
            <b>Steers Prince Burger</b>
          </h1>
          <p class="lead">The wacky wednesday special gives you 2 chicken or beef burgers and small chips. A fully
            loaded
            burger box
            for the price of one</p>
        </div>
      </div>
    </div>
    <MenuItemIngredients :ingredients="ingredients"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {fakeIngredients} from "@/fake";
import {MenuItemIngredient} from "@/types/types";

export default Vue.extend({
  name: "MenuItemView",
  components: {
    MenuItemIngredients: () => import("@/components/menu/MenuItemIngredients.vue")
  },
  data() {
    return {
      ingredients: [] as MenuItemIngredient[]
    }
  },
  mounted() {
    this.ingredients = fakeIngredients
  }
})
</script>

<style scoped>

</style>
