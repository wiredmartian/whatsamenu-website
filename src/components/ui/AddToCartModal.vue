<template>
  <div class="modal fade" id="addToCartModal" tabindex="-1" role="dialog" aria-labelledby="addToCartModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addToCartModalLabel">Add to Cart</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="selectedItem">
            <div class="item-info mb-3">
              <div class="d-flex">
                <img 
                  v-if="selectedItem.imageUrl" 
                  :src="`${imgCDN}/${selectedItem.imageUrl}`"
                  class="item-image mr-3"
                  :alt="selectedItem.name"
                >
                <div class="item-details">
                  <h6 class="font-weight-bold">{{ selectedItem.name }}</h6>
                  <p class="text-muted mb-2">{{ selectedItem.summary }}</p>
                  <p class="price font-weight-bold">
                    <span v-if="selectedItem.price">{{ selectedItem.price.toFixed(2) }}</span>
                    <span v-else class="badge badge-dark">SQ</span>
                  </p>
                </div>
              </div>
            </div>

            <div class="quantity-section mb-3">
              <label class="font-weight-bold">Quantity:</label>
              <div class="quantity-controls">
                <button 
                  class="btn btn-outline-secondary btn-sm" 
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                >
                  -
                </button>
                <span class="quantity mx-3">{{ quantity }}</span>
                <button 
                  class="btn btn-outline-secondary btn-sm" 
                  @click="increaseQuantity"
                >
                  +
                </button>
              </div>
            </div>

            <div class="special-instructions mb-3">
              <label for="specialInstructions" class="font-weight-bold">Special Instructions (Optional):</label>
              <textarea 
                id="specialInstructions"
                v-model="specialInstructions"
                class="form-control"
                rows="3"
                placeholder="Any special requests or modifications?"
              ></textarea>
            </div>

            <div class="total-section mb-3">
              <div class="d-flex justify-content-between">
                <span class="font-weight-bold">Total:</span>
                <span class="font-weight-bold">
                  {{ ((selectedItem.price || 0) * quantity).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Cancel</button>
          <button 
            type="button" 
            class="btn btn-dark" 
            @click="addToCart"
            :disabled="!selectedItem || !selectedItem.price"
          >
            <i class="bi bi-cart-plus"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MenuItem } from '@/types/types'
import { cartService } from '@/services/cartService'
import { API_BASE_URL } from "@/api/interceptor"

export default Vue.extend({
  name: 'AddToCartModal',
  props: {
    selectedItem: {
      type: Object as () => MenuItem | null,
      default: null
    },
    restaurantId: {
      type: String,
      required: true
    },
    restaurantName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      quantity: 1,
      specialInstructions: '',
      imgCDN: API_BASE_URL
    }
  },
  watch: {
    selectedItem() {
      // Reset form when new item is selected
      this.quantity = 1
      this.specialInstructions = ''
    }
  },
  methods: {
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      if (this.selectedItem && this.selectedItem.price) {
        cartService.addToCart(
          this.selectedItem,
          this.restaurantId,
          this.restaurantName,
          this.quantity,
          this.specialInstructions || undefined
        )
        
        // Close modal
        this.$emit('close-modal')
        
        // Reset form
        this.quantity = 1
        this.specialInstructions = ''
        
        // Show success message
        this.$emit('item-added-to-cart', {
          item: this.selectedItem,
          quantity: this.quantity
        })
      }
    },
    closeModal() {
      // Reset form when closing
      this.quantity = 1
      this.specialInstructions = ''
      // Emit close event to parent
      this.$emit('close-modal')
    }
  }
})
</script>

<style scoped>
.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.quantity {
  min-width: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.price {
  font-size: 1.1rem;
}

.total-section {
  border-top: 1px solid #dee2e6;
  padding-top: 1rem;
  font-size: 1.1rem;
}
</style>
