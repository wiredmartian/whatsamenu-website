<template>
    <div class="home">
        <div class="header-section">
            <app-header />
        </div>
        <div class="motivation-section container-fluid bg-dark">
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
                            class="btn btn-lg btn-light btn-rounded px-4">
                            Learn More <i class="bi bi-box-arrow-up-right"></i>
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
                <div class="col-md-4" v-for="item of restaurantList" :key="item.name">
                    <restaurant-item :restaurant="item" />
                </div>
                <!-- See more -->
                <div class="d-block m-auto mt-5 mb-5">
                    <router-link to="/restaurants" class="btn btn-lg btn-dark btn-rounded px-5">
                        See More <i class="bi bi-arrow-right"></i>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Tutorials to help get started -->
        <div class="container-fluid bg-light mt-5 pb-5">
            <!-- Why Whats a menu -->
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <div class="d-block text-center my-2">
                            <h2 class="font-weight-bolder pt-5">
                                <b>How to get started</b>
                            </h2>
                        </div>
                        <p class="text-center lead pt-4">
                            We have tutorials to help you get started with WhatsAMenu.
                            Learn how to create an account, add your restaurant, and start adding your menu items.
                        </p>
                    </div>

                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-6">
                        <div class="mt-5 d-block">
                            <iframe width="100%" height="315"
                                src="https://www.youtube.com/embed/pmanq2BNNIo?si=ts5yJ7_PNjdkyMv0" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mt-5 d-block">
                            <iframe width="100%" height="315"
                                src="https://www.youtube.com/embed/NwEKG8YnECs?si=s-8GNct9C961pvNM" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-md-center">
                    <div class="col-md-6">
                        <div class="mt-5 d-block">
                            <iframe width="100%" height="315"
                                src="https://www.youtube.com/embed/TIuFRKKSM4k?si=GEPtGym8Lr6Xi6dA" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mt-5 d-block">
                            <iframe width="100%" height="315"
                                src="https://www.youtube.com/embed/YxwqRUVa6EE?si=oVfRdpvPWYqzS_5f" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-md-center">
                    <div class="col-md-6">
                        <div class="mt-5 d-block">
                            <iframe width="100%" height="315"
                                src="https://www.youtube.com/embed/3zZCj4XNU78?si=ZIhAN-RDj93UNA8s" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mt-5 d-block">
                            <iframe width="100%" height="315"
                                src="https://www.youtube.com/embed/oLhu50W2cvU?si=UKrI7Wqnqk6OThpd" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Management Console -->
        <div class="container-fluid">
            <div class="container mt-5">
                <div class="row align-items-center h-100">
                    <div class="col-md-6 py-5">
                        <div class="d-block">
                            <h2 class="font-weight-bolder">
                                <b>Management Console</b>
                            </h2>
                        </div>
                        <p class="lead pt-4">
                            We provide a management console for restaurant owners to manage their restaurants, menus,
                            menu
                            items, and more.
                            We're constantly improving the platform to make it easier for you to manage your restaurant.
                        </p>
                        <div class="d-block m-auto mt-5">
                            <a href="https://dashboard.whatsamenu.co.za" target="_blank"
                                class="btn btn-md btn-dark btn-rounded px-4">
                                Get Started <i class="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-6 py-5">
                        <img alt="For Developers" src="../../public/images/dashboard.png" class="img-fluid" />
                    </div>

                </div>
            </div>
        </div>



        <!-- For Developers -->

        <div class="container-fluid bg-light">
            <div class="container mt-5 ">
                <div class="row align-items-center h-100">
                    <div class="col-md-8 py-5">
                        <img alt="For Developers" src="../../public/images/developer-1.png" class="img-fluid" />
                    </div>
                    <div class="col-md-4 py-5">
                        <div class="d-block">
                            <h2 class="font-weight-bolder">
                                <b>Developer-friendly REST API</b>
                            </h2>
                        </div>
                        <p class="lead pt-4">
                            For building something more custom to your restaurant, WhatsAMenu provides a RESTful API
                            that allows developers to access
                            restaurant data, menu items, and more.
                        </p>
                        <div class="d-block m-auto mt-5">
                            <a href="https://github.com/wiredmartian/whatsamenu-api-documentation" target="_blank"
                                class="btn btn-md btn-dark btn-rounded px-4">
                                See API documentation <i class="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Learn more -->
        <div class="container-fluid bg-light">
            <div class="row">
                <div class="d-block m-auto pt-5 pb-5">
                    <a href="https://www.youtube.com/watch?v=pmanq2BNNIo&list=PLeB5OSgUY60FjFl5ZyQJWIwcuyKmAlX8E"
                        target="_blank" class="btn btn-lg btn-dark btn-rounded px-4">
                        Playlist on YouTube <i class="bi bi-box-arrow-up-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import { apiAdapter } from "@/api/adapter"
import { Restaurant, GeoCoordinates } from "@/types/types"

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
        async getAllRestaurants(limit = 3, offset = 0) {
            try {
                this.isLoading = true
                const response =
                    await apiAdapter.get<Restaurant[]>(`restaurants?limit=${limit}&offset=${offset}`)
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
