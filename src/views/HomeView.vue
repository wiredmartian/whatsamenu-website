<template>
  <div class="home">
    <div id="homeCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#homeCarousel" data-slide-to="0" class="active"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://whatsamenu.core.wiredmartians.com/public/restaurants/10-36a9127d39d71c18f05442434aeb2c79.jpg" class="d-block w-100"
            alt="Banner Image">
          <div class="carousel-caption d-none d-md-block">
            <h1 class="font-weight-bold text-header">WhatsAMenu</h1>
            <p class="lead text-slogan">A detailed look at what's on your plate.</p>
            <div class="row justify-content-md-center">
              <div class="col-md-8">
                <form class="text-center">
                  <div class="input-group">
                    <input type="text" v-model="searchInput" autocomplete="off" class="form-control" placeholder="Lupa">
                    <div class="input-group-append">
                      <button class="btn btn-secondary" type="button" v-on:click="searchRestaurants">
                        <i class="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>

      <div class="container-fluid">
        <div class="row justify-content-md-center">
          <div class="col-md-6">
            <div class="mt-5 d-block text-center">
              <h1 class="font-weight-bolder">Restaurants</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-5">
        <div v-if="isLoading">
          <app-spinner />
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-6" v-for="item of restaurantList" :key="item.name">
            <restaurant-item :restaurant="item" />
          </div>
        </div>
      </div>
      <div v-if="error" class="container mt-5">
        <div class="row justify-content-md-center">
          <p class="lead alert alert-danger">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { apiAdapter } from "@/api/adapter";
import { Restaurant, GeoCoordinates } from "@/types/types";

export default Vue.extend({
  name: 'HomeView',
  components: {
    RestaurantItem: () => import("@/components/restaurant/RestaurantItem.vue"),
    AppSpinner: () => import("@/components/ui/Spinner.vue"),
  },
  data() {
    return {
      error: "",
      searchInput: "",
      isLoading: false,
      restaurantList: [] as Restaurant[]
    }
  },
  mounted() {
    this.getAllRestaurants()
  },
  methods: {
    getCurrentUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getPlacesNearMe, (_) => {
          this.getAllRestaurants()
          // this.showError(positionError)
        });
      } else {
        this.getAllRestaurants()
      }
    },
    // eslint-disable-next-line no-undef
    async getPlacesNearMe(position: GeolocationPosition) {
      try {
        this.isLoading = true
        const coordinates: GeoCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        const response = await apiAdapter.post<GeoCoordinates, Restaurant[]>("restaurants/near-me", coordinates)
        this.restaurantList = response.data
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    },
    async getAllRestaurants() {
      try {
        this.isLoading = true
        const response = await apiAdapter.get<Restaurant[]>(`restaurants`)
        this.restaurantList = response.data
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    },
    async searchRestaurants(event: any) {
      try {
        this.isLoading = true
        const response = await apiAdapter.get<Restaurant[]>(`restaurants/search?query=${this.searchInput}&limit=10`)
        this.restaurantList = response.data
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.log(e)
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

<style lang="css">
/* styles for carousel */
.carousel-item>img {
  height: 35vh;
  object-fit: cover;
}

h1.text-header {
  font-size: 3.5rem;
  text-shadow: 2px 2px 4px #00000071;
}
.text-slogan {
  text-shadow: 2px 2px 4px #00000071;
}
</style>