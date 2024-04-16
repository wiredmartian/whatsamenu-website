<template>
  <div class="container-fluid">
    <page-load-spinner v-if="isPageLoading" :showSpinner="isPageLoading" />
    <div v-else-if="!isPageLoading && !responseErrorStatus">
      <div class="row">
        <img v-if="restaurant.imageUrl" :src="`${imgCDN}/${restaurant.imageUrl}`" class="img-fluid img-header"
          alt="Restaurant header">
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-12">
          <restaurant-info :restaurant="restaurant" />
          <hr v-if="menuList.length > 1" />
          <!-- No point showing a dropdown with 1 item -->
          <div v-if="menuList.length > 1" class="pl-2 pr-2">
            <h4>Menus</h4>
            <p class="text-muted">Select to see any addition/extra menus from {{ restaurant.name }}</p>
            <div class="btn-group btn-block dropright">
              <button type="button" class="btn btn-secondary btn-lg dropdown-toggle" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {{ activeMenuName }}
              </button>
              <div class="dropdown-menu w-100">
                <a class="dropdown-item" href="#" v-for="item of menuList" :key="item.menuId"
                  @click="getMenuById(item.menuId)">
                  {{ item.name }}
                </a>
              </div>
            </div>
          </div>
          <hr />
          <menu-group-sidebar v-if="!isLoading" :menuGroups="menuGroups" />
          <hr />
          <img alt="QR Code" v-if="qrCode" :src="qrCode" class="img-fluid m-auto d-md-block d-lg-block d-none">
          <hr class="d-md-block d-lg-block d-none" />
          <!-- <location-map class="d-md-block d-lg-block d-none" v-if="restaurant && restaurant.address"
            :longitude="restaurant.address.longitude" :latitude="restaurant.address.latitude" /> -->
        </div>
        <div class="col-md-9 col-sm-12">
          <div class="main-content">
            <div v-if="isLoading">
              <app-spinner />
            </div>
            <div v-else>
              <div :id="group.name.split(' ')[0].toLowerCase() + `${group.menuGroupId}`"
                v-for="group of menu.menuGroups" :key="`row-` + group.menuGroupId">
                <div class="row" v-if="group.items !== null">
                  <div class="col-12 mb-3 mt-3">
                    <h3 class="text-uppercase font-weight-bolder">{{ group.name }}</h3>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="text-muted" v-if="group.summary">
                          <small>{{ group.summary }}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12 mb-4" v-for="(item, i) of group.items"
                    :key="`col-${i}${item.menuItemId}`">
                    <div class="media mb-2" :key="item.name" data-toggle="modal" data-target="#menuItemDetail"
                      role="button" v-on:click="setSelectedItem(item)">
                      <img v-if="item.imageUrl" v-bind:src="`${imgCDN}/` + item.imageUrl"
                        class="align-self-center rounded mr-3" :alt="item.name">
                      <div class="media-body align-self-center">
                        <h5 class="mt-0 font-weight-bolder"> {{ item.name }}</h5>
                        <p class="block-ellipsis mb-0">{{ item.summary }}
                        </p>
                        <span v-if="item.price" class="font-weight-bold"><b>{{ item.price.toFixed(2) }}</b></span>
                        <span v-else class="info-sq font-weight-bold badge badge-dark">
                          SQ
                        </span>
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
    <pretty-error v-if="responseErrorStatus" :request-status="responseErrorStatus"
      :error-message="responseErrorMessage" />

    <!-- Modal -->
    <div v-if="Object.keys(selectedMenuItem).length" :key="selectedMenuItem.menuItemId" class="modal fade"
      id="menuItemDetail" tabindex="-1" role="dialog" aria-labelledby="menuItemDetailTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="Add Menu Group/Sub-category">{{ selectedMenuItem.name }}</h5>
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
    <!-- End Modal -->

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
    PrettyError: () => import("@/components/ui/PrettyError.vue")
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
    pushMenuData(item: any) {
      this.$router.push({ path: `/restaurant/menu/menu-item/${item.menuItemId}`, params: { data: JSON.stringify(item) } })
    },
    setSelectedItem(item: MenuItem) {
      console.log(item)
      this.selectedMenuItem = item
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
  }
})
</script>

<style scoped>
small {
  font-size: 90%;
}

.main-content {
  min-height: 100vh;
  padding: 1em;
}

.media img,
.media svg {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.img-header {
  width: 100vw;
  height: 35vh;
  object-fit: cover;
  object-position: center;
}

.block-ellipsis {
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: auto;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ask the waiter */
.info-sq {
  font-size: 1rem;
}

/** chat modal */
.modal-dialog-bottom-right {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 0;
}

/* .modal.fade .modal-dialog.modal-dialog-bottom-right {
  transform: translate(25%, 105%);
} */

.modal-content {
  width: 400px;
  margin-right: auto;
}
</style>
