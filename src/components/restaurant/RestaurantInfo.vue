<template>
  <div class="restaurant-info">
      <h1 class="restaurant-name">{{ restaurant.name }}</h1>
      <div v-if="restaurant.address" class="restaurant-address">
        <div class="address-info">
          <i class="bi bi-geo-alt"></i>
          <span class="address-text">
            {{ restaurant.address.line1 }}, {{ restaurant.address.line2 }}<br />
            {{ restaurant.address.city }}, {{ provinceMap[restaurant.address.state] }}
          </span>
        </div>
        <button 
          class="btn btn-outline-primary btn-sm more-info-btn" 
          data-toggle="modal" 
          data-target="#restaurantDetail"
          data-backdrop="false"
          type="button"
        >
          <i class="bi bi-info-circle me-2"></i>
          More Info
        </button>
    </div>

    <!-- Modal -->
    <div 
      :key="restaurant.restaurantId" 
      class="modal fade" 
      id="restaurantDetail" 
      tabindex="-1" 
      role="dialog"
      aria-labelledby="restaurantDetailTitle" 
      aria-hidden="true"
      data-backdrop="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content modern-modal">
          <div class="modal-header">
            <h5 class="modal-title" :id="restaurant.restaurantId">
              <i class="bi bi-shop me-2"></i>
              &nbsp; {{ restaurant.name }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="restaurant-detail-content">
              <!-- Restaurant Image -->
              <div class="restaurant-image-container">
                <img 
                  v-if="restaurant.imageUrl" 
                  :src="`${imgCDN}/${restaurant.imageUrl}`"
                  class="restaurant-image" 
                  :alt="restaurant.name"
                >
                <img 
                  v-else 
                  class="restaurant-image" 
                  src="../../../public/placeholder.png" 
                  :alt="restaurant.name"
                >
                <div class="image-overlay">
                  <h3 class="overlay-title">{{ restaurant.name }}</h3>
                </div>
              </div>

              <!-- Restaurant Details -->
              <div class="restaurant-details">
                <div class="detail-section">
                  <h4 class="section-title">
                    <i class="bi bi-info-circle me-2"></i>
                    About
                  </h4>
                  <p class="restaurant-summary">{{ restaurant.summary || 'No description available.' }}</p>
                </div>

                <div class="detail-section" v-if="restaurant.address">
                  <h4 class="section-title">
                    <i class="bi bi-geo-alt me-2"></i>
                    Location
                  </h4>
                  <div class="location-info">
                    <p class="location-address">
                      <i class="bi bi-geo-alt-fill me-2"></i>
                      {{ restaurant.address.line1 }}, {{ restaurant.address.line2 }}, {{ restaurant.address.city }}
                    </p>
                    <div class="map-container">
                      <location-map 
                        v-if="restaurant && restaurant.address" 
                        :address="formattedAddress"
                        :restaurantName="restaurant.name" 
                      />
                    </div>
                  </div>
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

<style scoped>
/* Restaurant Info Header */
.restaurant-info {
  margin-bottom: 2rem;
}


.restaurant-name {
  color: #2c3e50;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.restaurant-address {
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.address-info {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1;
}

.address-info i {
  color: #3498db;
  margin-top: 0.2rem;
  font-size: 1.1rem;
}

.address-text {
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.5;
}

.more-info-btn {
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  border: 1px solid #3498db;
  color: #3498db;
  background: white;
  transition: all 0.3s ease;
}

.more-info-btn:hover {
  background: #3498db;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

/* Modern Modal Styling */
#restaurantDetail {
  z-index: 1060;
}

/* Disable backdrop completely */
#restaurantDetail.modal {
  background: none !important;
}

.modal-backdrop {
  display: none !important;
}

.modern-modal {
  border: none;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 1060;
  position: relative;
  margin-top: 5%;
}

.modern-modal .modal-header {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 1.5rem 2rem;
  border-bottom: none;
}

.modern-modal .modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  color: white;
}

.modern-modal .close {
  color: white;
  font-size: 1.5rem;
  font-weight: 300;
  text-shadow: none;
  opacity: 0.8;
  transition: all 0.3s ease;
  z-index: 1070;
  position: relative;
}

.modern-modal .close:hover {
  color: white;
  opacity: 1;
  transform: scale(1.1);
}

.modern-modal .modal-body {
  padding: 0;
  background: #f8f9fa;
  z-index: 1055;
  position: relative;
}

/* Restaurant Detail Content */
.restaurant-detail-content {
  display: flex;
  flex-direction: column;
}

.restaurant-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.restaurant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.restaurant-image:hover {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 2rem;
  color: white;
}

.overlay-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Restaurant Details */
.restaurant-details {
  padding: 2rem;
}

.detail-section {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 0.5rem;
}

.section-title i {
  color: #3498db;
}

.restaurant-summary {
  color: #7f8c8d;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.location-address {
  color: #7f8c8d;
  font-size: 0.95rem;
  margin: 0;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 10px;
}

.location-address i {
  color: #3498db;
}

.map-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  background: white;
  border: 1px solid #e9ecef;
}

/* Responsive Design */
@media (max-width: 768px) {


  .restaurant-name {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .restaurant-address {
    flex-direction: column;
    gap: 0.75rem;
  }

  .more-info-btn {
    align-self: flex-start;
  }

  .modern-modal .modal-header {
    padding: 1rem 1.5rem;
  }

  .modern-modal .modal-title {
    font-size: 1.25rem;
  }

  .restaurant-details {
    padding: 1rem;
  }

  .detail-section {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .restaurant-image-container {
    height: 200px;
  }

  .overlay-title {
    font-size: 1.25rem;
  }

  .image-overlay {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {


  .restaurant-name {
    font-size: 1.3rem;
  }

  .address-text {
    font-size: 0.9rem;
  }

  .more-info-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .restaurant-details {
    padding: 0.75rem;
  }

  .detail-section {
    padding: 0.75rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .restaurant-image-container {
    height: 150px;
  }
}

/* Animation for modal */
.modal.fade .modern-modal {
  transform: translateY(-50px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal.show .modern-modal {
  transform: translateY(0);
}
</style>
