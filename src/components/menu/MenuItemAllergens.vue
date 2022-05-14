<template>
  <div class="row mt-5">
    <div class="col-sm-12">
      <h2 class="font-weight-bolder text-center mb-5">Allergens</h2>
      <div class="align-items-center mb-3">
        <ul class="list-group list-group-flush">
          <li v-for="item of allergens" :key="item.name" class="list-group-item border-0">
            <p class="lead">{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {MenuItemAllergen} from "@/types/types";

export default Vue.extend({
  name: "MenuItemAllergens",
  props: {
    allergens: {
      type: Array as () => Array<MenuItemAllergen>,
      required: true
    },
  },
})

</script>

<style scoped>

</style>
