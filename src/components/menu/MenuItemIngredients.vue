<template>
  <div class="row mt-5">
    <div class="col-sm-12">
      <h3 class="display-4 text-center">Ingredients</h3>
      <div class="row align-items-center h-100 mb-3">
        <div class="col-md-4" v-for="item of ingredients" :key="item.name">
          <div class="row align-items-center h-100">
            <div class="col-sm-6">
              <img src="https://www.mcdonalds.co.za/media/products/big-mac/McDonalds-Image-Resize.psdBig-mac.png"
                   class="align-self-center mr-3 img-fluid" alt="...">
            </div>
            <div class="col-sm-6">
              <h4 class="mt-0">{{ item.name }}</h4>
            </div>
          </div>
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
