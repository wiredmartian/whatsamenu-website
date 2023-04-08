<template>
  <div class="restaurant-info">
    <div class="mt-4 d-block pl-4">
      <h1 class="font-weight-bolder">{{ restaurant.name }}</h1>
    </div>
    <p v-if="restaurant.address" class="text-muted pl-4">{{ restaurant.address.line1 }}, {{
        restaurant.address.line2
      }} <br/>
      {{ restaurant.address.city }}, {{ provinceMap[restaurant.address.state] }}
    </p>
  </div>
</template>

<script lang="ts">
import {ProvincesMap, Restaurant} from "@/types"
import Vue from "vue"

export default Vue.extend({
  name: "RestaurantInfo",
  data() {
    return {
      provinceMap: ProvincesMap
    }
  },
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
