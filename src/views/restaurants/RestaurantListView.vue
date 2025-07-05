<template>
    <div class="restaurants-page">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-content w-100">
                <div class="container">
                    <div class="row justify-content-center text-center">
                        <div class="col-lg-8">
                            <h1 class="hero-title">Discover Restaurants</h1>
                            <p class="hero-subtitle">
                                Find restaurants with detailed digital menus. Search by name, cuisine, or location.
                            </p>
                            
                            <!-- Search Bar -->
                            <div class="search-container mt-4">
                                <div class="search-form">
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            v-model="searchInput" 
                                            autocomplete="off" 
                                            class="form-control search-input"
                                            placeholder="Search restaurants..."
                                            @keyup.enter="searchRestaurants"
                                        >
                                        <button 
                                            class="btn btn-primary search-btn" 
                                            type="button"
                                            @click="searchRestaurants"
                                        >
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Restaurants Section -->
        <section class="restaurants-section py-5">
            <div class="container">
                <div class="row text-center mb-5">
                    <div class="col-12">
                        <h2 class="section-title">All Restaurants</h2>
                        <p class="section-subtitle text-muted">
                            Browse through our collection of restaurants with digital menus
                        </p>
                    </div>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="row justify-content-center mb-4">
                    <div class="col-lg-8">
                        <div class="alert alert-danger" role="alert">
                            <i class="bi bi-exclamation-triangle me-2"></i>
                            {{ error }}
                        </div>
                    </div>
                </div>

                <!-- Loading Spinner -->
                <div v-if="isLoading" class="text-center">
                    <app-spinner />
                </div>

                <!-- Restaurant Grid -->
                <div v-else>
                    <div class="row g-4">
                        <div class="col-lg-4 col-md-6" v-for="restaurant in restaurantList" :key="restaurant.restaurantId">
                            <restaurant-item :restaurant="restaurant" />
                        </div>
                    </div>

                    <!-- Load More Button -->
                    <div class="text-center mt-5" v-if="restaurantList.length > 0">
                        <button 
                            v-if="!loadingMore" 
                            type="button" 
                            class="btn btn-primary btn-lg load-more-btn"
                            @click="loadMoreRestaurants"
                        >
                            Load More Restaurants
                        </button>
                        <app-spinner v-else />
                    </div>

                    <!-- No Results -->
                    <div v-if="restaurantList.length === 0 && !isLoading" class="text-center mt-5">
                        <div class="no-results">
                            <i class="bi bi-search display-1 text-muted mb-3"></i>
                            <h3 class="text-muted">No restaurants found</h3>
                            <p class="text-muted">Try adjusting your search terms or browse all restaurants.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
                navigator.geolocation.getCurrentPosition(
                    this.getPlacesNearMe, 
                    () => {
                        this.getAllRestaurants()
                    }
                );
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
            } finally {
                this.isLoading = false
            }
        },
        async loadMoreRestaurants() {
            this.offset += this.limit
            try {
                this.loadingMore = true
                const response = await apiAdapter.get<Restaurant[]>(`restaurants?limit=${this.limit}&offset=${this.offset}`)
                this.restaurantList = this.restaurantList.concat(response.data)
            } catch (e) {
                console.error(e)
            } finally {
                this.loadingMore = false
            }
        },
        async getAllRestaurants() {
            try {
                this.isLoading = true
                const response = await apiAdapter.get<Restaurant[]>(`restaurants?limit=${this.limit}&offset=${this.offset}`)
                this.restaurantList = response.data
            } catch (e) {
                console.error(e)
            } finally {
                this.isLoading = false
            }
        },
        async searchRestaurants() {
            if (!this.searchInput.trim()) {
                this.getAllRestaurants()
                return
            }
            
            try {
                this.isLoading = true
                const response = await apiAdapter.get<Restaurant[]>(`restaurants/search?query=${this.searchInput}&limit=10`)
                this.restaurantList = response.data
            } catch (e) {
                console.error(e)
            } finally {
                this.isLoading = false
            }
        }
    }
})
</script>

<style lang="css" scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 4rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.6;
}

/* Search Section */
.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-form {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.input-group {
  border-radius: 50px;
  overflow: hidden;
}

.search-input {
  border: none;
  background: transparent;
  color: white;
  font-size: 1.1rem;
  padding: 2rem 1.5rem;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.search-input:focus {
  background: transparent;
  border: none;
  box-shadow: none;
  color: white;
}

.search-btn {
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  transform: translateY(-2px);
}

/* Section Styling */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.section-subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

/* Restaurants Section */
.restaurants-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

/* Load More Button */
.load-more-btn {
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  border: none;
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
}

/* Error Alert */
.alert {
  border-radius: 15px;
  border: none;
  font-size: 1rem;
}

.alert-danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
}

/* No Results */
.no-results {
  padding: 3rem 0;
}

.no-results .display-1 {
  opacity: 0.3;
}

.no-results h3 {
  margin-bottom: 1rem;
  color: #6c757d;
}

.no-results p {
  font-size: 1.1rem;
  color: #95a5a6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    min-height: 50vh;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .search-input,
  .search-btn {
    padding: 0.75rem 1rem;
  }
  
  .restaurants-section {
    padding: 3rem 0;
  }
}

@media (max-width: 576px) {
  .hero-content {
    padding: 2rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .search-form {
    padding: 0.25rem;
  }
  
  .search-input {
    font-size: 1rem;
    padding: 0.75rem 1rem;
  }
  
  .load-more-btn {
    width: 100%;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Button enhancements */
.btn {
  transition: all 0.3s ease;
  border-radius: 25px;
  font-weight: 600;
}

.btn:hover {
  transform: translateY(-2px);
}

/* General improvements */
.container {
  max-width: 1200px;
}

.row {
  margin-left: 0;
  margin-right: 0;
}

/* Ensure restaurant cards follow the same design as feature cards */
:deep(.restaurant-card) {
  padding: 2rem 1rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  height: 100%;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: none;
}

:deep(.restaurant-card:hover) {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

:deep(.restaurant-card .card-body) {
  padding: 1.5rem;
}

:deep(.restaurant-card .card-title) {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

:deep(.restaurant-card .card-text) {
  color: #6c757d;
  line-height: 1.6;
}
</style>