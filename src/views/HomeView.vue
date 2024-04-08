<template>
    <div class="home">
        <div class="header-section">
            <app-header />
        </div>
        <div class="motivation-section px-4 container-fluid bg-dark">
            <!-- Why Whats a menu -->
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <div class="d-block text-center my-2">
                            <h2 class="font-weight-bolder">Why WhatsAMenu?</h2>
                        </div>
                        <p class="text-center lead pt-4">
                            Unlike the often cryptic menus
                            of the past, this platform allows restaurants to describe their food items down to the
                            finest details. You'll no longer have to
                            guess what you're ordering. With this level of transparency, you can make informed choices
                            about what you eat.
                        </p>
                    </div>
                    <div class="col-md-4">
                        <div class="mt-5 d-block">
                            <p class="lead">
                                <b>Free for Business</b>
                            </p>
                            <p class="lead">
                                We believe that businesses should not have to
                                pay to provide a clear and concise menu to their customers.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mt-5 d-block">
                            <p class="lead">
                                <b>Easy to Use</b>
                            </p>
                            <p class="lead">
                                Simply create an account, add your restaurant and start
                                adding
                                your menu items.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mt-5 d-block">
                            <p class="lead">
                                <b>Free QR Code</b>
                            </p>
                            <p class="lead">
                                Get your QR code, print and display the
                                code for your customers to scan and view your menu.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Learn more -->
                <div class="row">
                    <div class="d-block m-auto mt-5">
                        <a href="https://medium.com/@wiredmartian/whats-a-menu-fd661fa5cf82" target="_blank"
                            class="btn btn-lg btn-light btn-rounded px-5">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Restaurants section -->
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-12">
                    <div class="mt-5 mb-5 d-block text-center">
                        <h2 class="font-weight-bolder">
                            <b>Our Restaurants</b>
                        </h2>
                    </div>
                </div>
            </div>
            <div v-if="isLoading">
                <app-spinner />
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6" v-for="item of restaurantList" :key="item.name">
                    <restaurant-item :restaurant="item" />
                </div>
                <!-- See more -->
                <div class="d-block m-auto mt-5">
                    <router-link to="/restaurants" class="btn btn-lg btn-dark btn-rounded px-5">
                        See More
                    </router-link>
                </div>
            </div>
        </div>

        <!-- For Developers -->

        <div class="container-fluid mt-5">
            <div class="container">
                <div class="col-md-6">
                    <img alt="For Developers" src="../../public/images/developer-1.png" class="img-fluid" />
                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import { apiAdapter } from "@/api/adapter"
import { Restaurant, GeoCoordinates } from "@/types/types"
import router from "@/router"

export default Vue.extend({
    name: "HomeView",
    components: {
        RestaurantItem: () =>
            import("@/components/restaurant/RestaurantItem.vue"),
        AppHeader: () => import("@/components/ui/Header.vue"),
        AppSpinner: () => import("@/components/ui/Spinner.vue")
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
                navigator.geolocation.getCurrentPosition(
                    this.getPlacesNearMe,
                    (_) => {
                        this.getAllRestaurants()
                        // this.showError(positionError)
                    }
                )
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
                const response = await apiAdapter.post<
                    GeoCoordinates,
                    Restaurant[]
                >("restaurants/near-me", coordinates)
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
                const response =
                    await apiAdapter.get<Restaurant[]>(`restaurants`)
                this.restaurantList = response.data.slice(0, 3)
                this.isLoading = false
            } catch (e) {
                this.isLoading = false
                console.log(e)
            }
        },
        async searchRestaurants(event: any) {
            try {
                this.isLoading = true
                const response = await apiAdapter.get<Restaurant[]>(
                    `restaurants/search?query=${this.searchInput}&limit=10`
                )
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
                    break
                case err.POSITION_UNAVAILABLE:
                    this.error = "Location information is unavailable."
                    break
                case err.TIMEOUT:
                    this.error = "The request to get user location timed out."
                    break
                case err.UNKNOWN_ERROR:
                    this.error = "An unknown error occurred."
                    break
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

.motivation-section {
    padding: 50px 0;
    color: #ffffff;
}
</style>
