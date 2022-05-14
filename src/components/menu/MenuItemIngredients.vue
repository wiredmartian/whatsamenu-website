<template>
  <div class="row mt-5">
    <div class="col-sm-12">
      <h2 class="font-weight-bolder text-center mb-5">Ingredients</h2>
      <div class="row align-items-center mb-3">
        <div class="col-md-2 col-sm-6 mb-3" v-for="item of ingredients" :key="item.name">
          <figure class="figure">
            <img src="https://www.mcdonalds.co.za/media/products/big-mac/McDonalds-Image-Resize.psdBig-mac.png"
                 class="figure-img img-fluid rounded"
                 alt="A generic square placeholder image with rounded corners in a figure.">
            <figcaption class="figure-caption text-center">
              <p class="lead">{{ item.name }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {MenuItemIngredient} from "@/types/types";

export default Vue.extend({
  name: "MenuItemIngredients",
  props: {
    ingredients: {
      type: Array as () => Array<MenuItemIngredient>,
      required: true
    },
  },
})
</script>

<style scoped>

</style>
