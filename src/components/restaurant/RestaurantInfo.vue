<template>
  <div class="restaurant-info">
    <div class="mt-4 d-block pl-4">
      <h1 class="font-weight-bolder">{{ restaurant.name }}</h1>
    </div>
    <p v-if="restaurant.address" class="text-muted pl-4">{{ restaurant.address.line1 }}, {{
        restaurant.address.line2
      }} <br/>
      {{ restaurant.address.city }}, {{ restaurant.address.state }}
    </p>
  </div>
</template>

<script lang="ts">
import {Restaurant} from "@/types/types"
import Vue from "vue"

export default Vue.extend({
  name: "RestaurantInfo",
  props: {
    restaurant: {
      type: Object,
      default: () => ({} as Restaurant),
      required: true
    }
  },
  mounted() {
    console.log(this.restaurant)
  }
})
</script>

<style>

</style>
