<template>
  <div class="restaurant-info">
    <div class="mt-4 d-block pl-4">
      <h1 class="font-weight-bolder">{{ restaurant.name }}</h1>
    </div>
    <p v-if="restaurant.address" class="text-muted pl-4">
      <i class="bi bi-geo-alt"></i> {{ restaurant.address.line1 }}, {{
        restaurant.address.line2
      }} <br />
      {{ restaurant.address.city }}, {{ provinceMap[restaurant.address.state] }} &nbsp;
      <span class="badge badge-light rounded-pill" data-toggle="modal" data-target="#restaurantDetail" role="button">More
        info</span>
    </p>

    <!-- Modal -->
    <div :key="restaurant.restaurantId" class="modal fade" id="restaurantDetail" tabindex="-1" role="dialog"
      aria-labelledby="restaurantDetailTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="restaurant.restaurantId">{{ restaurant.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="w-100">
                <div class="col">
                  <img v-if="restaurant.imageUrl" v-bind:src="`${imgCDN}/${restaurant.imageUrl}`"
                    class="w-100 d-block m-auto" :alt="restaurant.name">
                </div>
                <div class="col mt-2 mb-4">
                  <div class="description-content">
                    <h2 class="font-weight-normal pb-2">
                      {{ restaurant.name }}
                    </h2>
                    <p class="text-muted">{{ restaurant.summary }}</p>
                    <hr />
                    <p v-if="restaurant.address" class="text-muted">
                      <i class="bi bi-geo-alt-fill"></i> {{ restaurant.address.line1 }}, {{
                        restaurant.address.line2
                      }}, {{ restaurant.address.city }}
                    </p>
                    <hr />
                    <location-map v-if="restaurant && restaurant.address" :address="formattedAddress"
                      :restaurantName="restaurant.name" />
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { ProvincesMap, Restaurant } from "@/types"
import { API_BASE_URL } from "@/api/interceptor";

export default Vue.extend({
  name: "RestaurantInfo",
  components: {
    locationMap: () => import("@/components/restaurant/LocationMap.vue"),
  },
  data() {
    return {
      provinceMap: ProvincesMap,
      imgCDN: API_BASE_URL,
      formattedAddress: `${this.restaurant.address.line1},${this.restaurant.address.line2},${this.restaurant.address.city}`
    }
  },
  props: {
    restaurant: {
      type: Object as () => Restaurant,
      default: () => ({} as Restaurant),
      required: true
    }
  },
})
</script>

<style></style>
