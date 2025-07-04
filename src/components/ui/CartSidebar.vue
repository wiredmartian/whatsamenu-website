<template>
  <div class="cart-sidebar">
    <!-- Cart Toggle Button -->
    <button 
      class="btn btn-dark cart-toggle-btn" 
      @click="toggleCart"
      :class="{ 'cart-has-items': cartService.cartItemCount > 0 }"
    >
      <i class="bi bi-cart"></i>
      <span v-if="cartService.cartItemCount > 0" class="cart-badge">{{ cartService.cartItemCount }}</span>
    </button>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar-overlay" v-if="isCartOpen" @click="closeCart"></div>
    <div class="cart-sidebar-content" :class="{ 'cart-open': isCartOpen }">
      <div class="cart-header">
        <h4>Your Order</h4>
        <button class="btn btn-link cart-close-btn" @click="closeCart">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="cart-body">
        <div v-if="cartService.isCartEmpty" class="empty-cart">
          <i class="bi bi-cart fa-3x text-muted mb-3"></i>
          <p class="text-muted">Your cart is empty</p>
        </div>

        <div v-else>
          <div class="restaurant-info mb-3">
            <h6 class="font-weight-bold">{{ cartService.currentCart.restaurantName }}</h6>
          </div>

          <div class="cart-items">
            <div 
              v-for="item in cartService.currentCart.items" 
              :key="item.menuItemId"
              class="cart-item"
            >
              <div class="cart-item-info">
                <h6 class="cart-item-name">{{ item.name }}</h6>
                <p class="cart-item-price">{{ item.price.toFixed(2) }}</p>
                <p v-if="item.specialInstructions" class="cart-item-instructions">
                  <small class="text-muted">{{ item.specialInstructions }}</small>
                </p>
              </div>
              <div class="cart-item-controls">
                <div class="quantity-controls">
                  <button 
                    class="btn btn-sm btn-outline-secondary" 
                    @click="decreaseQuantity(item.menuItemId)"
                  >
                    -
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button 
                    class="btn btn-sm btn-outline-secondary" 
                    @click="increaseQuantity(item.menuItemId)"
                  >
                    +
                  </button>
                </div>
                <button 
                  class="btn btn-sm btn-link text-danger remove-btn" 
                  @click="removeItem(item.menuItemId)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="cart-footer">
            <div class="cart-total">
              <div class="d-flex justify-content-between">
                <span>Total Items:</span>
                <span>{{ cartService.currentCart.totalItems }}</span>
              </div>
              <div class="d-flex justify-content-between font-weight-bold">
                <span>Total:</span>
                <span>{{ cartService.currentCart.totalAmount.toFixed(2) }}</span>
              </div>
            </div>
            <div class="cart-actions mt-3">
              <button class="btn btn-outline-danger btn-sm" @click="clearCart">
                Clear Cart
              </button>
              <button class="btn btn-dark btn-sm ml-2" @click="proceedToCheckout">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { cartService } from '@/services/cartService'

export default Vue.extend({
  name: 'CartSidebar',
  data() {
    return {
      isCartOpen: false,
      cartService
    }
  },
  mounted() {
    cartService.$on('cart-updated', () => {
      this.$forceUpdate()
    })
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
    closeCart() {
      this.isCartOpen = false
    },
    increaseQuantity(menuItemId: string) {
      const item = cartService.currentCart.items.find(item => item.menuItemId === menuItemId)
      if (item) {
        cartService.updateQuantity(menuItemId, item.quantity + 1)
      }
    },
    decreaseQuantity(menuItemId: string) {
      const item = cartService.currentCart.items.find(item => item.menuItemId === menuItemId)
      if (item) {
        cartService.updateQuantity(menuItemId, item.quantity - 1)
      }
    },
    removeItem(menuItemId: string) {
      cartService.removeFromCart(menuItemId)
    },
    clearCart() {
      if (confirm('Are you sure you want to clear your cart?')) {
        cartService.clearCart()
      }
    },
    proceedToCheckout() {
      // Implement checkout logic here
      alert('Checkout functionality would be implemented here')
    }
  }
})
</script>

<style scoped>
.cart-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.cart-toggle-btn:hover {
  transform: scale(1.1);
}

.cart-toggle-btn.cart-has-items {
  background-color: #28a745;
  border-color: #28a745;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.cart-sidebar-content {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100%;
  background-color: white;
  z-index: 1050;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.cart-sidebar-content.cart-open {
  right: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.cart-close-btn {
  font-size: 1.5rem;
  padding: 0;
  line-height: 1;
}

.cart-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.empty-cart {
  text-align: center;
  padding: 2rem 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.cart-item-price {
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.cart-item-instructions {
  margin-bottom: 0;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}

.remove-btn {
  padding: 0.25rem;
}

.cart-footer {
  border-top: 1px solid #dee2e6;
  padding-top: 1rem;
}

.cart-total {
  margin-bottom: 1rem;
}

.cart-actions {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .cart-sidebar-content {
    width: 100%;
    right: -100%;
  }
}
</style>
