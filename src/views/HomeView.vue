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
            <input class="form-control mr-sm-2" v-model="searchInput" type="search" placeholder="Search" aria-label="Search">
            <button type="button" class="btn btn-lg btn-dark mt-4" v-on:click="searchRestaurants">Search</button>
          </form>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4 col-sm-6" v-for="item of restaurantList" :key="item.name">
          <restaurant-item :restaurant="item"/>
        </div>
      </div>
    </div>
    <div v-if="error" class="container mt-5">
      <div class="row justify-content-md-center">
        <p class="lead alert alert-danger">{{ error }}</p>
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
      error: "",
      searchInput: "",
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
          this.showError(positionError)
        });
      } else {
        this.error = "Geolocation is not supported by this browser. Use our search functionality instead";
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
    async searchRestaurants(event: any) {
      if (this.searchInput.length > 3) {
        console.log(event)
        setTimeout(async () => {
          try {
            const response = await apiAdapter.get<Restaurant[]>(`restaurants/search?query=${this.searchInput}&limit=10`)

            if (response.status === 200 && response.data) {
              this.restaurantList = response.data
            }
            
          } catch (e) {
            console.log(e)
          }
        }, 300)
      }
    },
    showError(err: any) {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          this.error = "User denied the request for Geolocation."
          break;
        case err.POSITION_UNAVAILABLE:
          this.error = "Location information is unavailable."
          break;
        case err.TIMEOUT:
          this.error = "The request to get user location timed out."
          break;
        case err.UNKNOWN_ERROR:
          this.error = "An unknown error occurred."
          break;
      }
      this.error = this.error + " Please try refreshing the page"
    }
  }
})
</script>
