<template>
  <div class="row">
    <page-load-spinner class="text-center" v-if="isPageLoading" :showSpinner="isPageLoading"/>
    <div class="w-100" v-else>
      <div class="col">
        <img v-if="menuItem.imageUrl"
             v-bind:src="`${cdn}/${menuItem.imageUrl}`"
             class="w-75 d-block m-auto"
             :alt="menuItem.name">
      </div>
      <div class="col mt-2 mb-4">
        <div class="description-content">
          <h2 class="font-weight-normal text-center pb-2">
            {{ menuItem.name }}
          </h2>
          <p class="lead">{{ menuItem.description }}</p>
          <p class="text-muted">{{ menuItem.summary }}</p>
        </div>
        <hr/>
      </div>
      <div class="col" v-if="ingredients.length">
        <h3 class="text-center mb-4">Ingredients</h3>
        <ul class="list-group list-group-horizontal row">
          <li v-for="g of ingredients" :key="`ing-`+g.name"
              class="list-group-item col-md-6 border-0">
            <div class="fw-bold">
              <p role="button" v-on:click="askGoogle(g.name)" class="lead mb-0">{{ g.name }} <span
                  class="badge badge-light rounded-pill"
              >?</span>
              </p>
            </div>
          </li>
        </ul>
        <hr/>
      </div>
      <div class="col" v-if="allergens.length">
        <menu-item-allergens-accordian :allergens="allergens"/>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {MenuItemIngredient, MenuItemAllergen, MenuItem} from "@/types/types";
import {apiAdapter} from "@/api/adapter";
import {IMGCDN} from "@/api/common";

export default Vue.extend({
  name: "MenuItemView",
  components: {
    MenuItemAllergensAccordian: () => import("@/components/menu/MenuItemAllergensAccordian.vue"),
    // MenuItemIngredients: () => import("@/components/menu/MenuItemIngredients.vue"),
    PageLoadSpinner: () => import("@/components/ui/PageLoadSpinner.vue")
  },
  props: {
    menuItemId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      isPageLoading: false,
      menuItem: {} as MenuItem,
      ingredients: [] as MenuItemIngredient[],
      allergens: [] as MenuItemAllergen[],
      cdn: IMGCDN
    }
  },
  async mounted() {
    this.isPageLoading = true
    await Promise.all([this.getMenuItem(), this.getIngredients(), this.getAllergens()])
    this.isPageLoading = false
  },
  methods: {
    async getIngredients() {
      const response = await apiAdapter.get<MenuItemIngredient[]>(`/menu-item/${this.menuItemId}/ingredients`);
      this.ingredients = response.data
    },
    async getAllergens() {
      const response = await apiAdapter.get<MenuItemAllergen[]>(`/menu-item/${this.menuItemId}/allergens`)
      this.allergens = response.data
    },
    async getMenuItem() {
      const response = await apiAdapter.get<MenuItem>(`/menu-item/${this.menuItemId}`)
      this.menuItem = response.data
    },
    async askGoogle(ingredient: string) {
      const query = `https://www.google.com/search?q=${ingredient}+food`;
      window.open(query, "_blank")
    }
  }
})
</script>

<style scoped>

</style>
