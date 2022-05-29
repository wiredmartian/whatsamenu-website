<template>
  <div class="container h-100">
    <page-load-spinner v-if="isPageLoading" :showSpinner="isPageLoading"/>
    <div v-else>
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
            {{ menuItem.name }}
          </h1>
          <p class="lead">{{ menuItem.description }}</p>
          <p class="text-muted">{{ menuItem.summary }}</p>
        </div>
      </div>
    </div>
    <menu-item-ingredients :ingredients="ingredients"/>
    <menu-item-allergens :allergens="allergens"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {MenuItemIngredient, MenuItemAllergen, MenuItem} from "@/types/types";
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  name: "MenuItemView",
  components: {
    MenuItemIngredients: () => import("@/components/menu/MenuItemIngredients.vue"),
    MenuItemAllergens: () => import("@/components/menu/MenuItemAllergens.vue"),
    PageLoadSpinner: () => import("@/components/ui/PageLoadSpinner.vue")
  },
  data() {
    return {
      isPageLoading: false,
      menuItemId: "",
      menuItem: {} as MenuItem,
      ingredients: [] as MenuItemIngredient[],
      allergens: [] as MenuItemAllergen[],
    }
  },
  async mounted() {
    this.isPageLoading = true
    this.menuItemId = this.$route.params['id']
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
  }
})
</script>

<style scoped>

</style>
