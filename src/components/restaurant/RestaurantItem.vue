<template>
  <router-link :to="`restaurants/${restaurantIdentifier}`" class="restaurant-link">
    <div class="restaurant-card mb-4">
      <div class="restaurant-image-container">
        <img 
          v-if="restaurant.imageUrl" 
          class="restaurant-image"
          :src="`${imgCDN}/${restaurant.imageUrl}`" 
          :alt="restaurant.name"
        >
        <img 
          v-else 
          class="restaurant-image" 
          src="../../../public/placeholder.png"
          :alt="restaurant.name"
        >
        <div v-if="restaurant.distance" class="distance-badge">
          {{ formatDistance(restaurant.distance) }}
        </div>
      </div>
      
      <div class="restaurant-content">
        <h4 class="restaurant-name text-one-line">{{ restaurant.name }}</h4>
        <div v-if="restaurant.address" class="restaurant-address">
          <i class="bi bi-geo-alt text-muted me-1"></i>
          <div class="address-content">
            <div class="text-one-line">
              {{ restaurant.address.line1 }}<span v-if="restaurant.address.line2">, {{ restaurant.address.line2 }}</span>
            </div>
            <div class="address-line2">
              {{ restaurant.address.city }}, {{ provinceMap[restaurant.address.state] }}
            </div>
          </div>
        </div>
        
        <div class="restaurant-footer mt-3">
          <span class="view-menu-text">
            View Menu <i class="bi bi-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue"
import { ProvincesMap, Restaurant } from "@/types"
import { API_BASE_URL } from "@/api/interceptor";

export default Vue.extend({
  name: "RestaurantItem",
  data() {
    return {
      provinceMap: ProvincesMap,
      imgCDN: API_BASE_URL,
      restaurantIdentifier: ""
    }
  },
  props: {
    restaurant: {
      type: Object as () => Restaurant,
      default: () => ({} as Restaurant),
      required: true
    }
  },
  mounted() {
    this.restaurantIdentifier = this.restaurant.alias ?? this.restaurant.restaurantId
  },
  methods: {
    // distance in km
    formatDistance(distance: number): string {
      if (!distance) {
        return "Not available"
      }
      if (distance < 1) {
        return `${(distance * 1000).toFixed(2)}m away`
      }
      return `${distance.toFixed(1)}km away`
    }
  }
})
</script>

<style scoped>
.restaurant-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.restaurant-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: none;
  position: relative;
}

.restaurant-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.restaurant-image-container {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.restaurant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.restaurant-card:hover .restaurant-image {
  transform: scale(1.05);
}

.distance-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.restaurant-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100% - 200px);
  min-height: 180px;
}

.restaurant-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.restaurant-address {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  min-height: 3rem;
  max-height: 3rem;
}

.restaurant-address i {
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.address-content {
  flex: 1;
  overflow: hidden;
}

.text-one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.address-line2 {
  color: #95a5a6;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.restaurant-footer {
  border-top: 1px solid #f8f9fa;
  padding-top: 1rem;
  margin-top: auto;
}

.view-menu-text {
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.restaurant-card:hover .view-menu-text {
  color: #764ba2;
}

.view-menu-text i {
  transition: transform 0.3s ease;
}

.restaurant-card:hover .view-menu-text i {
  transform: translateX(5px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .restaurant-image-container {
    height: 180px;
  }
  
  .restaurant-content {
    padding: 1.25rem;
    height: calc(100% - 180px);
    min-height: 160px;
  }
  
  .restaurant-name {
    font-size: 1.1rem;
    height: 2.4rem;
  }
  
  .restaurant-address {
    min-height: 2.8rem;
    max-height: 2.8rem;
  }
  
  .distance-badge {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 576px) {
  .restaurant-image-container {
    height: 160px;
  }
  
  .restaurant-content {
    padding: 1rem;
    height: calc(100% - 160px);
    min-height: 140px;
  }
  
  .restaurant-name {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    height: 2.2rem;
  }
  
  .restaurant-address {
    font-size: 0.85rem;
    min-height: 2.6rem;
    max-height: 2.6rem;
  }
  
  .address-line1,
  .address-line2 {
    font-size: 0.8rem;
  }
}
</style>
