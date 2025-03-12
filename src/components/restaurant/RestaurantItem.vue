<template>
  <router-link :to="`restaurants/${restaurantIdentifier}`">
    <div class="media mb-4" :key="restaurant.name">
      <div class="row">
        <div class="col-md-12">
          <img v-if="restaurant.imageUrl" class="img-restaurant rounded mr-3 w-100"
            :src="`${imgCDN}/${restaurant.imageUrl}`" :alt="restaurant.name">
          <img v-else class="img-restaurant rounded mr-3 w-100" src="../../../public/placeholder.png"
            :alt="restaurant.name">
        </div>
        <div class="col-md-12">
          <div class="media-body pt-2">
            <h5 class="mt-0"> {{ restaurant.name }}</h5>
            <p v-if="restaurant.address" class="text-muted">{{ restaurant.address.line1 }}, {{
              restaurant.address.line2
            }} <br />
              {{ restaurant.address.city }}, {{ provinceMap[restaurant.address.state] }}
            </p>
            <p class="lead" v-if="restaurant.distance">
              <span class="badge badge-dark rounded-pill p-2">{{
                formatDistance(restaurant.distance)
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue"
import { ProvincesMap, Restaurant } from "@/types"
import { API_BASE_URL } from "@/api/interceptor";

export default Vue.extend({
  name: "RestaurantItem",
  data() {
    return {
      provinceMap: ProvincesMap,
      imgCDN: API_BASE_URL,
      restaurantIdentifier: ""
    }
  },
  props: {
    restaurant: {
      type: Object as () => Restaurant,
      default: () => ({} as Restaurant),
      required: true
    }
  },
  mounted() {
    this.restaurantIdentifier = this.restaurant.alias ?? this.restaurant.restaurantId
  },
  methods: {
    // distance in km
    formatDistance(distance: number): string {
      if (!distance) {
        return "Not available"
      }
      if (distance < 1) {
        return `${(distance * 1000).toFixed(2)}m away`
      }
      return `${distance.toFixed(1)}km away`
    }
  }
})
</script>

<style scoped>
.img-restaurant {
  object-fit: cover;
  height: 200px;
}
</style>
