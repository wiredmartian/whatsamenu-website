<template>
  <div class="modal fade" id="addToCartModal" tabindex="-1" role="dialog" aria-labelledby="addToCartModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content modern-modal">
        <div class="modal-header">
          <h4 class="modal-title" id="addToCartModalLabel">
            <i class="bi bi-cart me-2"></i>
            Add to Order
          </h4>
          <button type="button" class="modal-close-btn" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="selectedItem" class="modal-content-wrapper">
            <!-- Item Information Card -->
            <div class="item-info-card">
              <div class="item-display">
                <div class="item-image-container">
                  <img 
                    v-if="selectedItem.imageUrl" 
                    :src="`${imgCDN}/${selectedItem.imageUrl}`"
                    class="item-image"
                    :alt="selectedItem.name"
                  >
                  <div v-else class="item-image-placeholder">
                    <i class="bi bi-image"></i>
                  </div>
                </div>
                <div class="item-details">
                  <h6 class="item-name">{{ selectedItem.name }}</h6>
                  <p class="item-description">{{ selectedItem.summary }}</p>
                  <div class="item-price">
                    <span v-if="selectedItem.price" class="price-amount">R{{ selectedItem.price.toFixed(2) }}</span>
                    <span v-else class="price-badge">Price on Request</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quantity Selection Card -->
            <div class="quantity-card">
              <div class="card-header">
                <i class="bi bi-plus-circle me-2"></i>
                <span class="card-title">Quantity</span>
              </div>
              <div class="quantity-controls">
                <button 
                  class="quantity-btn decrease-btn" 
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <span class="quantity-display">{{ quantity }}</span>
                <button 
                  class="quantity-btn increase-btn" 
                  @click="increaseQuantity"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>

            <!-- Special Instructions Card -->
            <div class="instructions-card">
              <div class="card-header">
                <i class="bi bi-chat-left-text me-2"></i>
                <span class="card-title">Special Instructions</span>
              </div>
              <textarea 
                id="specialInstructions"
                v-model="specialInstructions"
                class="instructions-textarea"
                rows="3"
                placeholder="Any special requests or modifications? (Optional)"
              ></textarea>
            </div>

            <!-- Order Summary Card -->
            <div class="summary-card">
              <div class="summary-content">
                <div class="summary-row">
                  <span class="summary-label">Unit Price:</span>
                  <span class="summary-value">R{{ (selectedItem.price || 0).toFixed(2) }}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Quantity:</span>
                  <span class="summary-value">{{ quantity }}</span>
                </div>
                <div class="summary-row total-row">
                  <span class="summary-label">Total:</span>
                  <span class="summary-value total-amount">R{{ ((selectedItem.price || 0) * quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="footer-actions">
            <button type="button" class="btn btn-md cancel-btn" data-dismiss="modal" @click="closeModal">
              Cancel
            </button>
            <button 
              type="button" 
              class="btn btn-md add-to-cart-btn" 
              @click="addToCart"
              :disabled="!selectedItem || !selectedItem.price"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MenuItem } from '@/types/types'
import { cartService } from '@/services/cart-service'
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
/* Modern Modal Design - Matching CartSidebar.vue */
.modern-modal {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
}

/* Modal Header - Same gradient as CartSidebar */
.modal-header {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 1.5rem;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.modal-close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  cursor: pointer;
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Modal Body */
.modal-body {
  padding: 1.5rem;
  background: #f8f9fa;
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #bdc3c7 transparent;
}

.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 3px;
}

.modal-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Card Styling - Matching CartSidebar cards */
.item-info-card,
.quantity-card,
.instructions-card,
.summary-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.item-info-card:hover,
.quantity-card:hover,
.instructions-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

/* Item Information */
.item-display {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.item-image-container {
  flex-shrink: 0;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-image-placeholder {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.item-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-amount {
  color: #27ae60;
  font-weight: 600;
  font-size: 1.1rem;
}

.price-badge {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Card Headers */
.card-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #2c3e50;
}

.card-title {
  font-weight: 600;
}

/* Quantity Controls - Same as CartSidebar */
.quantity-controls {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 10px;
  margin: 1rem;
  gap: 1rem;
}

.quantity-btn {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
}

.quantity-btn:hover:not(:disabled) {
  background: #3498db;
  color: white;
}

.quantity-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

/* Instructions */
.instructions-textarea {
  width: 100%;
  border: none;
  padding: 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
  resize: vertical;
  background: transparent;
  color: #2c3e50;
  font-family: inherit;
}

.instructions-textarea:focus {
  outline: none;
  background: #f8f9fa;
}

.instructions-textarea::placeholder {
  color: #7f8c8d;
}

/* Summary Card - Same styling as CartSidebar */
.summary-card {
  background: white;
  border: 1px solid #e9ecef;
}

.summary-content {
  padding: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.summary-label {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.summary-value {
  color: #2c3e50;
  font-weight: 600;
}

.total-row {
  border-top: 1px solid #e9ecef;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0;
}

.total-row .summary-label,
.total-row .summary-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.total-amount {
  color: #27ae60;
}

/* Modal Footer - Same as CartSidebar actions */
.modal-footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 1.5rem;
}

.footer-actions {
  display: flex;
  gap: 0.75rem;
}

.cancel-btn {
  flex: 1;
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid #6c757d;
  color: #6c757d;
  background: white;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.add-to-cart-btn {
  flex: 2;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #2980b9 0%, #1f5f8b 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.add-to-cart-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Utility classes for icon spacing */
.me-1 {
  margin-right: 0.25rem;
}

.me-2 {
  margin-right: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-dialog {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }

  .modal-body {
    padding: 1rem;
    max-height: 60vh;
  }

  .modal-footer {
    padding: 1rem;
  }

  .footer-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .cancel-btn,
  .add-to-cart-btn {
    flex: none;
  }

  .item-display {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .item-image,
  .item-image-placeholder {
    margin-bottom: 1rem;
  }

  .quantity-controls {
    margin: 0.5rem;
  }
}

@media (max-width: 480px) {
  .modal-dialog {
    margin: 0.5rem;
    max-width: calc(100vw - 1rem);
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.1rem;
  }

  .item-display {
    padding: 0.75rem;
  }

  .item-name {
    font-size: 1rem;
  }

  .item-description {
    font-size: 0.85rem;
  }

  .summary-content {
    padding: 0.75rem;
  }
}

/* Animation for modal appearance */
.modal.fade .modal-dialog {
  transform: translate(0, -50px);
  transition: transform 0.3s ease-out;
}

.modal.show .modal-dialog {
  transform: translate(0, 0);
}
</style>
