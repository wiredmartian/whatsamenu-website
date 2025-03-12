<template>
    <div class="home">
        <div id="homeCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../../../public/images/wm-banner.png" class="d-block w-100" alt="Banner">
                    <div class="carousel-caption d-none d-md-block">
                        <h1 class="font-weight-bold text-header">WhatsAMenu</h1>
                        <p class="lead text-slogan">A detailed look at what's on your plate.</p>
                        <div class="row justify-content-md-center">
                            <div class="col-md-8">
                                <form class="text-center">
                                    <div class="input-group">
                                        <input type="text" v-model="searchInput" autocomplete="off" class="form-control"
                                            placeholder="Enter search term...">
                                        <div class="input-group-append">
                                            <button class="btn btn-secondary" type="button"
                                                v-on:click="searchRestaurants">
                                                <i class="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
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
            <div v-if="error" class="container mt-5">
                <div class="row justify-content-md-center">
                    <p class="lead alert alert-danger">{{ error }}</p>
                </div>
            </div>
            <div class="container mt-5 mb-5">
                <div v-if="isLoading">
                    <app-spinner />
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-6" v-for="item of restaurantList" :key="item.name">
                        <restaurant-item :restaurant="item" />
                    </div>
                </div>
                <!-- Load more items -->
                <button type="button" v-if="!loadingMore" class="btn m-auto btn-lg btn-dark d-block"
                    v-on:click="loadMoreRestaurants">Load
                    more</button>
                <app-spinner v-else />
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
            loadingMore: false,
            restaurantList: [] as Restaurant[],
            limit: 30,
            offset: 0,
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
            } catch (e) {
                console.error(e)
            }
            this.isLoading = false
        },
        async loadMoreRestaurants() {
            this.offset += this.limit
            try {
                this.loadingMore = true
                const response = await apiAdapter.get<Restaurant[]>(`restaurants?limit=${this.limit}&offset=${this.offset}`)
                this.restaurantList = this.restaurantList.concat(response.data)
            } catch (e) {
                console.error(e)
            }
            this.loadingMore = false
        },

        async getAllRestaurants() {
            try {
                this.isLoading = true
                const response = await apiAdapter.get<Restaurant[]>(`restaurants?limit=${this.limit}&offset=${this.offset}`)
                this.restaurantList = response.data
            } catch (e) {
                console.error(e)
            }
            this.isLoading = false

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