<template>
  <router-link :to="`restaurants/${restaurant.restaurantId}/menu`">
    <div class="media mb-4" :key="restaurant.name">
      <img class="align-self-center rounded mr-3 w-25" :src="restaurant.imageUrl" :alt="restaurant.name">
      <div class="media-body align-self-center">
        <h5 class="mt-0"> {{ restaurant.name }}</h5>
        <p>{{ restaurant.summary }}</p>
        <p v-if="restaurant.address" class="text-muted">{{ restaurant.address.line1 }}, {{
            restaurant.address.line2
          }} <br/>
          {{ restaurant.address.city }}, {{ restaurant.address.state }}
        </p>
        <p class="lead">
          <span class="badge badge-dark rounded-pill">{{ restaurant.distance.toFixed(2) }}km away</span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue"
import {Restaurant} from "@/types/types";

export default Vue.extend({
  name: "RestaurantItem",
  props: {
    restaurant: {
      type: Object,
      default: () => ({} as Restaurant),
      required: true
    }
  }
})
</script>

<style scoped>

</style>
