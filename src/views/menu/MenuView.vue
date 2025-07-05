<template>
  <div class="menu-page">
    <page-load-spinner v-if="isPageLoading" :showSpinner="isPageLoading" />
    
    <div v-else-if="!isPageLoading && !responseErrorStatus">
      <!-- Restaurant Header Section -->
      <section class="restaurant-header">
        <div class="header-image-container">
          <img 
            v-if="restaurant.imageUrl" 
            :src="`${imgCDN}/${restaurant.imageUrl}`" 
            class="header-image"
            :alt="restaurant.name"
          >
          <img 
            v-else 
            class="header-image" 
            src="../../../public/placeholder.png" 
            :alt="restaurant.name"
          >
        </div>
      </section>

      <!-- Menu Content Section -->
      <section class="menu-content-section">
        <div class="container-fluid">
          <div class="row g-0">
            <!-- Sidebar -->
            <div class="col-lg-3 col-md-4">
              <div class="sidebar">
                <div class="sidebar-content">
                  <!-- Restaurant Info -->
                  <div class="restaurant-info-card">
                    <restaurant-info :restaurant="restaurant" />
                  </div>

                  <!-- Menu Selection -->
                  <div v-if="menuList.length > 1" class="menu-selection-card">
                    <h5 class="card-title">Menus</h5>
                    <p class="card-subtitle">Select from available menus</p>
                    <div class="menu-dropdown">
                      <select 
                        class="form-select" 
                        @change="handleMenuChange"
                        :value="menu.menuId"
                      >
                        <option v-for="item in menuList" :key="item.menuId" :value="item.menuId">
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- Menu Groups Navigation -->
                  <div class="menu-navigation-card">
                    <h5 class="card-title">Categories</h5>
                    <menu-group-sidebar v-if="!isLoading" :menuGroups="menuGroups" />
                  </div>

                  <!-- QR Code -->
                  <div v-if="qrCode" class="qr-code-card d-none d-md-block">
                    <h5 class="card-title">QR Menu</h5>
                    <div class="qr-code-container">
                      <img :src="qrCode" class="qr-code-image img-fluid" alt="QR Code">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="col-lg-9 col-md-8">
              <div class="main-content">
                <div v-if="isLoading" class="loading-container">
                  <app-spinner />
                </div>
                
                <div v-else class="menu-groups-container">
                  <div 
                    v-for="group in menu.menuGroups" 
                    :key="group.menuGroupId"
                    :id="group.name.split(' ')[0].toLowerCase() + `${group.menuGroupId}`"
                    class="menu-group"
                  >
                    <div v-if="group.items && group.items.length > 0">
                      <!-- Group Header -->
                      <div class="group-header">
                        <h2 class="group-title">{{ group.name }}</h2>
                        <p v-if="group.summary" class="group-subtitle">{{ group.summary }}</p>
                      </div>

                      <!-- Menu Items Grid -->
                      <div class="menu-items-grid">
                        <div 
                          v-for="(item, index) in group.items" 
                          :key="`${item.menuItemId}-${index}`"
                          class="menu-item-card"
                        >
                          <div class="item-content">
                            <!-- Item Image -->
                            <div v-if="item.imageUrl" class="item-image-container">
                              <img 
                                :src="`${imgCDN}/${item.imageUrl}`"
                                class="item-image"
                                :alt="item.name"
                              >
                            </div>

                            <!-- Item Details -->
                            <div class="item-details">
                              <h4 class="item-name">{{ item.name }}</h4>
                              <p class="item-summary">{{ item.summary }}</p>
                              
                              <!-- Price and Actions -->
                              <div class="item-footer">
                                <div class="price-section">
                                  <span v-if="item.price" class="item-price">
                                    {{ item.price.toFixed(2) }}
                                  </span>
                                  <span v-else class="price-on-request">
                                    <i class="bi bi-chat-dots me-1"></i>Ask for Price
                                  </span>
                                </div>
                                
                                <div class="item-actions">
                                  <button 
                                    class="btn btn-outline-primary btn-sm action-btn" 
                                    data-toggle="modal" 
                                    data-target="#menuItemDetail"
                                    @click="setSelectedItem(item)"
                                    title="View Details"
                                  >
                                    <i class="bi bi-info-circle"></i>
                                    <span class="d-none d-sm-inline ms-1">Details</span>
                                  </button>
                                  
                                  <button 
                                    v-if="item.price" 
                                    class="btn btn-primary btn-sm action-btn" 
                                    data-toggle="modal" 
                                    data-target="#addToCartModal"
                                    @click="setSelectedItemForCart(item)"
                                    title="Add to Cart"
                                  >
                                    <i class="bi bi-cart-plus"></i>
                                    <span class="d-none d-sm-inline ms-1">Add</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Error Display -->
    <pretty-error 
      v-if="responseErrorStatus" 
      :request-status="responseErrorStatus"
      :error-message="responseErrorMessage" 
    />

    <!-- Modals -->
    <!-- Menu Item Details Modal -->
    <div 
      v-if="Object.keys(selectedMenuItem).length" 
      :key="selectedMenuItem.menuItemId" 
      class="modal fade"
      id="menuItemDetail" 
      tabindex="-1" 
      role="dialog" 
      aria-labelledby="menuItemDetailTitle" 
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content modern-modal">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedMenuItem.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <menu-item-details :menu-item-id="selectedMenuItem.menuItemId" />
          </div>
        </div>
      </div>
    </div>

    <!-- Add to Cart Modal -->
    <add-to-cart-modal 
      :selected-item="selectedMenuItemForCart"
      :restaurant-id="restaurantId"
      :restaurant-name="restaurant.name"
      @close-modal="closeAddToCartModal"
      @item-added-to-cart="onItemAddedToCart"
    />

    <!-- Cart Sidebar -->
    <cart-sidebar />
  </div>
</template>

<script lang="ts">
import { HttpResponseError, Menu, MenuItem, Restaurant } from "@/types/types"
import Vue from "vue"
import { apiAdapter } from "@/api/adapter";
import { API_BASE_URL } from "@/api/interceptor";

export default Vue.extend({
  components: {
    MenuItemDetails: () => import("@/components/menu/MenuItemDetails.vue"),
    MenuGroupSidebar: () => import("@/components/menu/MenuGroupSidebar.vue"),
    RestaurantInfo: () => import("@/components/restaurant/RestaurantInfo.vue"),
    AppSpinner: () => import("@/components/ui/Spinner.vue"),
    PageLoadSpinner: () => import("@/components/ui/PageLoadSpinner.vue"),
    PrettyError: () => import("@/components/ui/PrettyError.vue"),
    AddToCartModal: () => import("@/components/ui/AddToCartModal.vue"),
    CartSidebar: () => import("@/components/ui/CartSidebar.vue")
  },
  data() {
    return {
      isLoading: false,
      isPageLoading: false,
      responseErrorStatus: 0,
      responseErrorMessage: "",
      restaurantId: "",
      menuList: [] as Menu[],
      menu: {} as Menu,
      selectedMenuItem: {} as MenuItem,
      selectedMenuItemForCart: null as MenuItem | null,
      menuGroups: [] as Array<Record<string, string | number | undefined>>,
      restaurant: {} as Restaurant,
      qrCode: "",
      imgCDN: API_BASE_URL,
      activeMenuName: "Other Menus",
      enableGPT: false
    }
  },
  async mounted() {
    this.isPageLoading = true
    this.restaurantId = this.$route.params['id']
    await this.getRestaurant()
    await this.listMenus()
    this.isPageLoading = false
    await this.getQrCode()
    this.smoothScroll()
    this.setupModalEventListeners()
  },
  methods: {
    async listMenus() {
      try {
        this.isLoading = true
        const response = await apiAdapter.get<Menu[] | HttpResponseError>(`/restaurants/${this.restaurantId}/menus`)
        if (response.status === 200) {
          if (Array.isArray(response.data) && response.data.length === 0) {
            this.responseErrorMessage = `Looks like this restaurant does not have a menu yet`
            this.responseErrorStatus = 404
            return
          }
          const data = response.data as Menu[]
          this.menuList = data
          await this.getMenuById(data[0].menuId)
        } else {
          this.responseErrorMessage = (response.data as HttpResponseError).error
          this.responseErrorStatus = response.status
        }
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    },
    async getMenuById(menuId: string) {
      try {
        this.isLoading = true
        const response = await apiAdapter.get<Menu | HttpResponseError>(`/menu/${menuId}`)
        const data = response.data as Menu
        this.menu = data
        this.activeMenuName = data.name
        if (data.menuGroups) {
          this.menuGroups = data.menuGroups.filter(x => x.items?.length).map(item => {
            return {
              id: item.menuGroupId,
              name: item.name,
              length: item.items?.length
            }
          })
        } else {
          this.menuGroups = []
        }

        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    },
    async getRestaurant() {
      try {
        this.isLoading = true
        let resource = `/restaurants/${this.restaurantId}`
        if (!/^\d+$/.test(this.restaurantId)) {
          resource += "/alias"
        }
        const response = await apiAdapter.get<Restaurant>(resource)
        this.restaurant = response.data
        this.restaurantId = response.data.restaurantId
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    },
    async getQrCode() {
      const response = await apiAdapter.get<{ image: string }>(`/restaurants/${this.restaurantId}/qrcode`)
      this.qrCode = response.data.image
    },
    pushMenuData(item: MenuItem) {
      this.$router.push({ path: `/restaurant/menu/menu-item/${item.menuItemId}`, params: { data: JSON.stringify(item) } })
    },
    setSelectedItem(item: MenuItem) {
      console.log(item)
      this.selectedMenuItem = item
    },
    setSelectedItemForCart(item: MenuItem) {
      this.selectedMenuItemForCart = item
    },
    closeAddToCartModal() {
      this.selectedMenuItemForCart = null
      // Close the Bootstrap modal programmatically
      this.$nextTick(() => {
        const modalElement = document.getElementById('addToCartModal')
        if (modalElement) {
          // Use jQuery if available (Bootstrap 4)
          const windowWithJquery = window as unknown as { $?: (selector: string) => { modal: (action: string) => void } }
          if (typeof windowWithJquery.$ !== 'undefined') {
            windowWithJquery.$('#addToCartModal').modal('hide')
          } else {
            // Fallback: trigger the close button click
            const closeButton = modalElement.querySelector('[data-dismiss="modal"]') as HTMLElement
            if (closeButton) {
              closeButton.click()
            }
          }
        }
      })
    },
    onItemAddedToCart(data: { item: MenuItem; quantity: number }) {
      // Show a success message or notification
      console.log(`Added ${data.quantity} x ${data.item.name} to cart`)
      // You could show a toast notification here
    },
    handleMenuChange(event: Event) {
      const target = event.target as HTMLSelectElement
      if (target && target.value) {
        this.getMenuById(target.value)
      }
    },
    smoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          let href = anchor.getAttribute('href')
          if (href) {
            href = href.replace(/([:.])/g, '\\$1');
            document.querySelector(href)?.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
    },
    setupModalEventListeners() {
      // Add event listener for when the modal is hidden
      this.$nextTick(() => {
        const modalElement = document.getElementById('addToCartModal')
        if (modalElement) {
          modalElement.addEventListener('hidden.bs.modal', () => {
            this.selectedMenuItemForCart = null
          })
          
          // For Bootstrap 4 with jQuery
          const windowWithJquery = window as unknown as { $?: (selector: string) => { on: (event: string, callback: () => void) => void } }
          if (typeof windowWithJquery.$ !== 'undefined') {
            windowWithJquery.$('#addToCartModal').on('hidden.bs.modal', () => {
              this.selectedMenuItemForCart = null
            })
          }
        }
      })
    },
  }
})
</script>

<style scoped>
/* Menu Page Layout */
.menu-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Restaurant Header */
.restaurant-header {
  position: relative;
  height: 40vh;
  min-height: 300px;
  overflow: hidden;
}

.header-image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* .header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
} */

/* Menu Content Section */
.menu-content-section {
  margin-top: -50px;
  position: relative;
  z-index: 10;
}

/* Sidebar */
.sidebar {
  background: white;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 250px);
}

.sidebar-content {
  padding: 2rem 1.5rem;
}

/* Sidebar Cards */
.restaurant-info-card,
.menu-selection-card,
.menu-navigation-card,
.qr-code-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

/* Menu Dropdown */
.menu-dropdown .form-select {
  border-radius: 10px;
  border: 2px solid #e9ecef;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.menu-dropdown .form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}


/* Main Content */
.main-content {
  background: white;
  border-radius: 0 15px 15px 15px;
  box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 250px);
  padding: 1.5rem 1rem;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

/* Menu Groups */
.menu-groups-container {
  max-width: none;
}

.menu-group {
  margin-bottom: 3rem;
}

.group-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.group-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.group-subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
  line-height: 1.6;
}

/* Menu Items Grid */
.menu-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.menu-item-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  transition: all 0.3s ease;
  height: 100%;
}

.menu-item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.item-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Item Image */
.item-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.menu-item-card:hover .item-image {
  transform: scale(1.05);
}

/* Item Details */
.item-details {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.item-summary {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Item Footer */
.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f1f3f4;
}

.price-section {
  flex-shrink: 0;
}

.item-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #28a745;
}

.price-on-request {
  font-size: 0.9rem;
  font-weight: 600;
  color: #667eea;
  padding: 0.375rem 0.75rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 20px;
}

/* Item Actions */
.item-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-btn {
  border-radius: 25px;
  font-weight: 600;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  border: 2px solid;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.btn-outline-primary.action-btn {
  border-color: #667eea;
  color: #667eea;
}

.btn-outline-primary.action-btn:hover {
  background: #667eea;
  border-color: #667eea;
  color: white;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary.action-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

.btn-primary.action-btn:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  border-color: #5a6fd8;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Modern Modal */
.modern-modal {
  border-radius: 15px;
  border: none;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modern-modal .modal-header {
  border-bottom: 1px solid #f1f3f4;
  padding: 1.5rem 2rem;
}

.modern-modal .modal-title {
  font-weight: 600;
  color: #2c3e50;
}

.modern-modal .modal-body {
  padding: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .restaurant-header {
    height: 30vh;
    min-height: 250px;
  }
  
  .menu-content-section {
    margin-top: -30px;
  }
  
  .sidebar {
    border-radius: 15px 15px 0 0;
    margin-bottom: 1rem;
  }
  
  .main-content {
    border-radius: 15px;
    margin-top: 1rem;
    padding: 1.5rem 1rem;
  }
  
  .sidebar-content {
    padding: 1.5rem 1rem;
  }
  

  .group-title {
    font-size: 1.5rem;
  }
  
  .menu-items-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .item-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .item-actions {
    justify-content: center;
  }
  
  .action-btn {
    flex: 1;
    max-width: 120px;
  }
}

@media (max-width: 576px) {
  .restaurant-header {
    height: 25vh;
    min-height: 200px;
  }
  
  .item-details {
    padding: 1rem;
  }
  
  .item-name {
    font-size: 1.1rem;
  }
  
  .item-summary {
    font-size: 0.85rem;
  }
  
  .item-price {
    font-size: 1.3rem;
  }
  
  .action-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}

/* Legacy compatibility for existing components */
.block-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* General improvements */
.container-fluid {
  max-width: 1400px;
}
</style>
