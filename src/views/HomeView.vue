<template>
    <div class="home">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-content">
                <div class="container">
                    <div class="row justify-content-center text-center">
                        <div class="col-lg-8">
                            <h1 class="hero-title">Digital Menus Made Simple</h1>
                            <p class="hero-subtitle">
                                Create detailed, transparent menus that help customers make informed choices.
                                Free for restaurants, easy for everyone.
                            </p>
                            <div class="hero-actions mt-4">
                                <a href="https://dashboard.whatsamenu.co.za" target="_blank" 
                                   class="btn btn-primary btn-lg me-3">
                                    Get Started <i class="bi bi-arrow-right"></i>
                                </a>
                                <router-link to="/restaurants" class="btn btn-outline-light btn-lg">
                                    Browse Restaurants
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="features-section py-5">
            <div class="container">
                <div class="row text-center mb-5">
                    <div class="col-12">
                        <h2 class="section-title">Why Choose WhatsAMenu?</h2>
                        <p class="section-subtitle text-muted">
                            Everything you need to create and share digital menus
                        </p>
                    </div>
                </div>
                <div class="row g-4">
                    <div class="col-md-4 mb-4">
                        <div class="feature-card text-center">
                            <div class="feature-icon">
                                <i class="bi bi-currency-dollar"></i>
                            </div>
                            <h4>Free for Business</h4>
                            <p class="text-muted">
                                No subscription fees or hidden costs. Provide clear menus to your customers at no charge.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="feature-card text-center">
                            <div class="feature-icon">
                                <i class="bi bi-lightning"></i>
                            </div>
                            <h4>Easy to Use</h4>
                            <p class="text-muted">
                                Simple setup process. Create an account, add your restaurant, and start building your menu.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="feature-card text-center">
                            <div class="feature-icon">
                                <i class="bi bi-qr-code"></i>
                            </div>
                            <h4>QR Code Ready</h4>
                            <p class="text-muted">
                                Get instant QR codes for contactless menu viewing. Print and display for customers to scan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Restaurants Section -->
        <section class="restaurants-section py-5 bg-light">
            <div class="container">
                <div class="row text-center mb-5">
                    <div class="col-12">
                        <h2 class="section-title">Featured Restaurants</h2>
                        <p class="section-subtitle text-muted">
                            Discover restaurants already using WhatsAMenu
                        </p>
                    </div>
                </div>
                
                <div v-if="isLoading" class="text-center">
                    <app-spinner />
                </div>
                
                <div v-else>
                    <div class="row g-4">
                        <div class="col-lg-4 col-md-6" v-for="restaurant in restaurantList" :key="restaurant.restaurantId">
                            <restaurant-item :restaurant="restaurant" />
                        </div>
                    </div>
                    
                    <div class="text-center mt-5">
                        <router-link to="/restaurants" class="btn btn-dark btn-lg">
                            View All Restaurants <i class="bi bi-arrow-right"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

        <!-- Management Console Section -->
        <section class="management-section py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <h2 class="section-title">Powerful Management Console</h2>
                        <p class="lead text-muted mb-4">
                            Comprehensive dashboard for restaurant owners to manage restaurants, menus, and items. 
                            Built with simplicity and efficiency in mind.
                        </p>
                        <ul class="feature-list">
                            <li><i class="bi bi-check-circle text-success"></i> Easy menu management</li>
                            <li><i class="bi bi-check-circle text-success"></i> Real-time updates</li>
                            <li><i class="bi bi-check-circle text-success"></i> QR code generation</li>
                            <li><i class="bi bi-check-circle text-success"></i> Analytics and insights</li>
                        </ul>
                        <a href="https://dashboard.whatsamenu.co.za" target="_blank" 
                           class="btn btn-primary btn-lg mt-3">
                            Access Dashboard <i class="bi bi-box-arrow-up-right"></i>
                        </a>
                    </div>
                    <div class="col-lg-6">
                        <div class="image-container">
                            <img src="../../public/images/dashboard.png" 
                                 alt="Management Dashboard" 
                                 class="img-fluid rounded shadow" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Developer API Section -->
        <section class="api-section py-5 bg-dark text-white">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <div class="image-container">
                            <img src="../../public/images/developer-1.png" 
                                 alt="Developer API" 
                                 class="img-fluid rounded" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h2 class="section-title text-white">Developer-Friendly API</h2>
                        <p class="lead mb-4">
                            Build custom integrations with our RESTful API. Access restaurant data, 
                            menu items, and more for your applications.
                        </p>
                        <div class="api-features">
                            <div class="api-feature">
                                <i class="bi bi-code-slash"></i>
                                <span>RESTful endpoints</span>
                            </div>
                            <div class="api-feature">
                                <i class="bi bi-shield-check"></i>
                                <span>Secure authentication</span>
                            </div>
                            <div class="api-feature">
                                <i class="bi bi-file-earmark-text"></i>
                                <span>Comprehensive docs</span>
                            </div>
                        </div>
                        <a href="https://github.com/wiredmartian/whatsamenu-api-documentation" 
                           target="_blank" 
                           class="btn btn-light btn-lg mt-3">
                            View Documentation <i class="bi bi-box-arrow-up-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section py-5 bg-primary text-white">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-lg-8">
                        <h2 class="mb-3">Ready to Get Started?</h2>
                        <p class="lead mb-4">
                            Join restaurants already using WhatsAMenu to provide better dining experiences.
                        </p>
                        <div class="cta-actions">
                            <a href="https://dashboard.whatsamenu.co.za" target="_blank" 
                               class="btn btn-light btn-lg me-3">
                                Create Account
                            </a>
                            <a href="https://www.youtube.com/watch?v=pmanq2BNNIo&list=PLeB5OSgUY60FjFl5ZyQJWIwcuyKmAlX8E" 
                               target="_blank" 
                               class="btn btn-outline-light btn-lg">
                                Watch Tutorials
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import { apiAdapter } from "@/api/adapter"
import { Restaurant } from "@/types/types"

export default Vue.extend({
    name: "HomeView",
    components: {
        RestaurantItem: () =>
            import("@/components/restaurant/RestaurantItem.vue"),
        AppSpinner: () => import("@/components/ui/Spinner.vue")
    },
    data() {
        return {
            isLoading: false,
            restaurantList: [] as Restaurant[]
        }
    },
    mounted() {
        this.getAllRestaurants()
    },
    methods: {
        async getAllRestaurants(limit = 3, offset = 0) {
            try {
                this.isLoading = true
                const response = await apiAdapter.get<Restaurant[]>(`restaurants?limit=${limit}&offset=${offset}`)
                this.restaurantList = response.data
            } catch (error) {
                console.error('Failed to load restaurants:', error)
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 2rem 0;
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

.hero-actions .btn {
  margin: 0.5rem;
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.hero-actions .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Section Styling */
section {
  position: relative;
}

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

/* Features Section */
.features-section {
  padding: 5rem 0;
}

.feature-card {
  padding: 2rem 1rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  height: 100%;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.feature-icon i {
  font-size: 2rem;
  color: white;
}

.feature-card h4 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

/* Restaurants Section */
.restaurants-section {
  padding: 5rem 0;
}

/* Management Section */
.management-section {
  padding: 5rem 0;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.feature-list li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}

.feature-list i {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

.image-container {
  position: relative;
}

.image-container img {
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* API Section */
.api-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.api-features {
  margin: 2rem 0;
}

.api-feature {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.api-feature i {
  margin-right: 0.75rem;
  font-size: 1.3rem;
  color: #3498db;
}

/* CTA Section */
.cta-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.cta-actions .btn {
  margin: 0.5rem;
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.cta-actions .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-actions .btn,
  .cta-actions .btn {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
  }
  
  .feature-card {
    margin-bottom: 2rem;
  }
}

@media (max-width: 576px) {
  .hero-content {
    padding: 1rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .features-section,
  .restaurants-section,
  .management-section,
  .api-section {
    padding: 3rem 0;
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
</style>
