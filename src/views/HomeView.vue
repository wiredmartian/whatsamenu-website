<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row justify-content-md-center">
        <div class="col-md-6">
          <div class="mt-5 mb-4 d-block text-center">
            <h1 class="font-weight-bolder">Whats A Menu?</h1>
            <p>You are what you eat</p>
          </div>
          <form class="text-center">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-lg btn-dark mt-4" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12" v-for="item of restaurantList" :key="item.name">
          <restaurant-item :restaurant="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {apiAdapter} from "@/api/adapter";
import {Restaurant, GeoCoordinates} from "@/types/types";

export default Vue.extend({
  name: 'HomeView',
  components: {
    RestaurantItem: () => import("@/components/restaurant/RestaurantItem.vue")
  },
  data() {
    return {
      restaurantList: [] as Restaurant[]
    }
  },
  mounted() {
    this.getCurrentUserLocation()
  },
  methods: {
    getCurrentUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getPlacesNearMe, positionError => {
          console.log(positionError)
        });
      } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },
    // eslint-disable-next-line no-undef
    async getPlacesNearMe(position: GeolocationPosition) {
      try {
        const coordinates: GeoCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        const response = await apiAdapter.putOrPost<GeoCoordinates, Restaurant[]>("restaurants/near-me", "POST", coordinates)
        this.restaurantList = response.data
      } catch (e) {
        console.log(e)
      }
    },
    showError(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          // x.innerHTML = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          // x.innerHTML = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          // x.innerHTML = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          // x.innerHTML = "An unknown error occurred."
          break;
      }
    }
  }
})
</script>
