<template>
  <div class="cart-sidebar">
    <!-- Cart Toggle Button -->
    <button 
      class="cart-toggle-btn" 
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
        <div class="header-content">
          <h4 class="cart-title">
            <i class="bi bi-cart me-2"></i>
            &nbsp; Your Order
          </h4>
          <button class="cart-close-btn" @click="closeCart">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <div class="cart-body">
        <div v-if="cartService.isCartEmpty" class="empty-cart">
          <div class="empty-cart-icon">
            <i class="bi bi-cart-x"></i>
          </div>
          <h5 class="empty-cart-title">Your cart is empty</h5>
          <p class="empty-cart-text">Add some delicious items to get started!</p>
        </div>

        <div v-else class="cart-content">
          <div class="restaurant-info">
            <div class="restaurant-badge">
              <i class="bi bi-shop me-2"></i>
              <span class="restaurant-name">{{ cartService.currentCart.restaurantName }}</span>
            </div>
          </div>

          <div class="cart-items">
            <div 
              v-for="item in cartService.currentCart.items" 
              :key="item.menuItemId"
              class="cart-item"
            >
              <div class="cart-item-content">
                <div class="item-header">
                  <h6 class="item-name">{{ item.name }}</h6>
                  <button 
                    class="remove-btn" 
                    @click="removeItem(item.menuItemId)"
                    title="Remove item"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
                
                <div class="item-details">
                  <div class="item-price">{{ item.price.toFixed(2) }}</div>
                  <div v-if="item.specialInstructions" class="item-instructions">
                    <i class="bi bi-chat-left-text me-1"></i>
                    <span>{{ item.specialInstructions }}</span>
                  </div>
                </div>

                <div class="item-controls">
                  <div class="quantity-controls">
                    <button 
                      class="quantity-btn decrease-btn" 
                      @click="decreaseQuantity(item.menuItemId)"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                    <span class="quantity-display">{{ item.quantity }}</span>
                    <button 
                      class="quantity-btn increase-btn" 
                      @click="increaseQuantity(item.menuItemId)"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  <div class="item-total">
                    {{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!cartService.isCartEmpty" class="cart-footer">
        <div class="cart-summary">
          <div class="summary-row">
            <span class="summary-label">Items:</span>
            <span class="summary-value">{{ cartService.currentCart.totalItems }}</span>
          </div>
          <div class="summary-row total-row">
            <span class="summary-label">Total:</span>
            <span class="summary-value total-amount">{{ cartService.currentCart.totalAmount.toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="cart-actions">
          <button class="btn btn-outline-secondary clear-btn" @click="clearCart">
            <i class="bi bi-trash me-2"></i>
            Clear Cart
          </button>
          <button class="btn btn-primary checkout-btn" @click="proceedToCheckout">
            <i class="bi bi-credit-card me-2"></i>
            Checkout
          </button>
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
      alert('Checkout functionality will be implemented soon!')
    }
  }
})
</script>

<style scoped>
/* Cart Toggle Button */
.cart-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  color: white;
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  transition: all 0.3s ease;
}

.cart-toggle-btn:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 12px 35px rgba(52, 152, 219, 0.4);
  background: #2980b9;
}

.cart-toggle-btn.cart-has-items {
  background: #27ae60;
  box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
}

.cart-toggle-btn.cart-has-items:hover {
  background: #219a52;
  box-shadow: 0 12px 35px rgba(39, 174, 96, 0.4);
}

.cart-toggle-btn i {
  font-size: 1.5rem;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}

/* Sidebar Overlay */
.cart-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 62, 80, 0.5);
  backdrop-filter: blur(2px);
  z-index: 1040;
  transition: opacity 0.3s ease;
}

/* Sidebar Content */
.cart-sidebar-content {
  position: fixed;
  top: 0;
  right: -420px;
  width: 420px;
  height: 100%;
  background: white;
  z-index: 1050;
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
  border-radius: 15px 0 0 15px;
}

.cart-sidebar-content.cart-open {
  right: 0;
}

/* Cart Header */
.cart-header {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px 0 0 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.cart-close-btn {
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
}

.cart-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Cart Body */
.cart-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #bdc3c7 transparent;
}

.cart-body::-webkit-scrollbar {
  width: 6px;
}

.cart-body::-webkit-scrollbar-track {
  background: transparent;
}

.cart-body::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 3px;
}

/* Empty Cart State */
.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
}

.empty-cart-icon {
  margin-bottom: 1.5rem;
}

.empty-cart-icon i {
  font-size: 4rem;
  color: #bdc3c7;
}

.empty-cart-title {
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.empty-cart-text {
  font-size: 0.95rem;
  margin: 0;
}

/* Restaurant Info */
.restaurant-info {
  margin-bottom: 1.5rem;
}

.restaurant-badge {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 15px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #2c3e50;
}

.restaurant-name {
  font-weight: 600;
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.cart-item:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.cart-item-content {
  padding: 1rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.item-name {
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  margin-right: 0.5rem;
}

.remove-btn {
  background: rgba(231, 76, 60, 0.1);
  border: none;
  color: #e74c3c;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.remove-btn:hover {
  background: #e74c3c;
  color: white;
  transform: scale(1.05);
}

.item-details {
  margin-bottom: 1rem;
}

.item-price {
  color: #27ae60;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.item-instructions {
  color: #7f8c8d;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 8px;
}

.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
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
}

.quantity-btn:hover {
  background: #3498db;
  color: white;
}

.quantity-display {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
}

.item-total {
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.1rem;
}

/* Cart Footer */
.cart-footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 1.5rem;
  border-radius: 0 0 15px 0;
}

.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e9ecef;
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

/* Cart Actions */
.cart-actions {
  display: flex;
  gap: 0.75rem;
}

.clear-btn {
  flex: 1;
  border-radius: 12px;
  font-weight: 600;
  padding: 0.75rem;
  font-size: 0.9rem;
  border: 1px solid #6c757d;
  color: #6c757d;
  background: white;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.checkout-btn {
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

.checkout-btn:hover {
  background: linear-gradient(135deg, #2980b9 0%, #1f5f8b 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .cart-sidebar-content {
    width: 100vw;
    right: -100vw;
    border-radius: 0;
  }

  .cart-header {
    border-radius: 0;
  }

  .cart-toggle-btn {
    bottom: 15px;
    right: 15px;
    width: 55px;
    height: 55px;
  }

  .cart-toggle-btn i {
    font-size: 1.3rem;
  }

  .cart-badge {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }

  .cart-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .clear-btn,
  .checkout-btn {
    flex: none;
  }
}

@media (max-width: 480px) {
  .cart-body {
    padding: 1rem;
  }

  .cart-footer {
    padding: 1rem;
  }

  .cart-item-content {
    padding: 0.75rem;
  }

  .item-name {
    font-size: 0.9rem;
  }
}
</style>
