<template>
  <div class="row mt-5">
    <div class="col-sm-12" v-if="ingredients.length > 0">
      <h3 class="text-center mb-5">Ingredients</h3>
      <div class="row align-items-center mb-3">
        <div class="col-md-3 mb-3" v-for="item of ingredients" :key="item.name">
          <figure class="figure">
            <img src="https://www.mcdonalds.co.za/media/products/big-mac/McDonalds-Image-Resize.psdBig-mac.png"
                 class="figure-img img-fluid rounded"
                 alt="A generic square placeholder image with rounded corners in a figure.">
            <figcaption class="figure-caption text-center">
              <p class="lead">{{ item.name }}
                <span class="badge badge-dark rounded-pill" @click="wikiLookup(item.name)">?</span>
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {MenuItemIngredient, WikipediaQueryResponse} from "@/types/types";

export default Vue.extend({
  name: "MenuItemIngredients",
  data() {
    return {
      wikiData: {} as WikipediaQueryResponse,
      isLoading: false,
      noWikiData: false
    }
  },
  props: {
    ingredients: {
      type: Array as () => Array<MenuItemIngredient>,
      required: true
    },
  },
  methods: {
    async wikiLookup(searchTerm: string) {
      console.log(searchTerm)
    }
  }
})
</script>

<style scoped>
.badge {
  cursor: pointer;
}
</style>
