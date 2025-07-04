import { Cart, CartItem, MenuItem } from '@/types/types'
import Vue from 'vue'

class CartService extends Vue {
  private cart: Cart = {
    items: [],
    restaurantId: '',
    restaurantName: '',
    totalAmount: 0,
    totalItems: 0
  }

  constructor() {
    super()
    this.loadCartFromStorage()
  }

  get currentCart(): Cart {
    return this.cart
  }

  get isCartEmpty(): boolean {
    return this.cart.items.length === 0
  }

  get cartItemCount(): number {
    return this.cart.totalItems
  }

  addToCart(menuItem: MenuItem, restaurantId: string, restaurantName: string, quantity = 1, specialInstructions?: string): void {
    // If cart has items from a different restaurant, clear it
    if (this.cart.restaurantId && this.cart.restaurantId !== restaurantId) {
      this.clearCart()
    }

    // Set restaurant info if cart is empty
    if (this.cart.items.length === 0) {
      this.cart.restaurantId = restaurantId
      this.cart.restaurantName = restaurantName
    }

    // Check if item already exists in cart
    const existingItemIndex = this.cart.items.findIndex(
      item => item.menuItemId === menuItem.menuItemId
    )

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      this.cart.items[existingItemIndex].quantity += quantity
      if (specialInstructions) {
        this.cart.items[existingItemIndex].specialInstructions = specialInstructions
      }
    } else {
      // Add new item to cart
      const cartItem: CartItem = {
        menuItemId: menuItem.menuItemId,
        name: menuItem.name,
        price: menuItem.price || 0,
        quantity,
        imageUrl: menuItem.imageUrl,
        specialInstructions
      }
      this.cart.items.push(cartItem)
    }

    this.updateCartTotals()
    this.saveCartToStorage()
    this.$emit('cart-updated', this.cart)
  }

  removeFromCart(menuItemId: string): void {
    this.cart.items = this.cart.items.filter(item => item.menuItemId !== menuItemId)
    this.updateCartTotals()
    this.saveCartToStorage()
    this.$emit('cart-updated', this.cart)
  }

  updateQuantity(menuItemId: string, quantity: number): void {
    const itemIndex = this.cart.items.findIndex(item => item.menuItemId === menuItemId)
    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeFromCart(menuItemId)
      } else {
        this.cart.items[itemIndex].quantity = quantity
        this.updateCartTotals()
        this.saveCartToStorage()
        this.$emit('cart-updated', this.cart)
      }
    }
  }

  clearCart(): void {
    this.cart = {
      items: [],
      restaurantId: '',
      restaurantName: '',
      totalAmount: 0,
      totalItems: 0
    }
    this.saveCartToStorage()
    this.$emit('cart-updated', this.cart)
  }

  private updateCartTotals(): void {
    this.cart.totalItems = this.cart.items.reduce((total, item) => total + item.quantity, 0)
    this.cart.totalAmount = this.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  private saveCartToStorage(): void {
    localStorage.setItem('whatsamenu_cart', JSON.stringify(this.cart))
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('whatsamenu_cart')
    if (savedCart) {
      try {
        this.cart = JSON.parse(savedCart)
        this.updateCartTotals()
      } catch (error) {
        console.error('Error loading cart from storage:', error)
        this.clearCart()
      }
    }
  }
}

export const cartService = new CartService()
