<template>
  <div class="container-fluid">
    <page-load-spinner v-if="isPageLoading" :showSpinner="isPageLoading"/>
    <div v-else-if="!isPageLoading && !responseErrorStatus">
      <div class="row">
        <!--      <img v-if="restaurant.imageUrl"-->
        <!--           :src="restaurant.imageUrl"-->
        <!--           class="img-fluid">-->
        <img
            src="https://thumbs.dreamstime.com/b/mexican-food-panoramic-header-blue-background-nachos-chili-con-carne-tacos-chicken-various-dips-top-shot-210526469.jpg"
            class="img-fluid">
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-12">
          <restaurant-info :restaurant="restaurant"/>
          <hr/>
          <menu-group-sidebar :menuGroups="menuGroups"/>
        </div>
        <div class="col-md-9 col-sm-12">
          <div class="main-content">
            <div v-if="isLoading">
              <app-spinner/>
            </div>
            <div v-else class="row" :id="`${group.menuGroupId}-` + group.name.split(' ')[0].toLowerCase()"
                 v-for="group of menu.menuGroups"
                 :key="`row-`+group.menuGroupId">
              <div class="row" v-if="group.items !== null">
                <div class="col-12 mb-3 mt-3">
                  <h3>{{ group.name }}</h3>
                </div>
                <div class="col-md-3 col-sm-6 mb-4" v-for="(item, i) of group.items"
                     :key="`col-${i}${item.menuItemId}`">
                  <div class="card menu-card h-100" @click="pushMenuData(item)">
                    <div class="menu-card-content">
                      <img v-if="item.imageUrl" v-bind:src="`http://localhost:9200/`+item.imageUrl"
                           class="card-img-top"
                           alt="...">
                      <img v-else
                           src="/placeholder.png"
                           class="card-img-top"
                           alt="...">
                      <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">R {{ item.price.toFixed(2) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
              </div>
              <div v-else class="row">
                <div class="col-12 mb-3 mt-3">
                  <h3>{{ group.name }}</h3>
                </div>
                <div class="col-md-12 mb-4">
                  <p class="text-muted">No menu items yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <location-map v-if="restaurant && restaurant.address"
                        :longitude="restaurant.address.longitude"
                        :latitude="restaurant.address.latitude"/>
        </div>
      </div>
    </div>
    <pretty-error v-if="responseErrorStatus" :request-status="responseErrorStatus"
                  :error-message="responseErrorMessage"/>
  </div>
</template>

<script lang="ts">
import {HttpResponseError, Menu, Restaurant} from "@/types/types"
import Vue from "vue"
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  components: {
    MenuGroupSidebar: () => import("@/components/menu/MenuGroupSidebar.vue"),
    LocationMap: () => import("@/components/restaurant/LocationMap.vue"),
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
      menu: {} as Menu,
      menuGroups: [] as Array<Record<string, string | number | undefined>>,
      restaurant: {} as Restaurant
    }
  },
  async mounted() {
    this.isPageLoading = true
    this.restaurantId = this.$route.params['id']
    await this.getMenu()
    await this.getRestaurant()
    this.isPageLoading = false
    this.smoothScroll()
  },
  methods: {
    async getMenu() {
      try {
        this.isLoading = true
        const response = await apiAdapter.get<Menu | HttpResponseError>(`/restaurants/${this.restaurantId}/menu`)
        if (response.status === 200) {
          const data = response.data as Menu
          this.menu = data
          this.menuGroups = data.menuGroups.map(item => {
            return {
              id: item.menuGroupId,
              name: item.name,
              length: item.items?.length
            }
          })
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
    async getRestaurant() {
      try {
        const response = await apiAdapter.get<Restaurant[]>(`/restaurants/${this.restaurantId}`)
        this.restaurant = response.data[0]
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    },
    pushMenuData(item: any) {
      this.$router.push({path: `/restaurant/menu/menu-item/${item.menuItemId}`, params: {data: JSON.stringify(item)}})
    },
    smoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const href = anchor.getAttribute('href')
          if (href) {
            document.querySelector(href)?.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }
})
</script>

<style scoped>

.main-content {
  min-height: 100vh;
  padding: 1em;
}

.card {
  border: none;
  cursor: pointer;
  background-color: #2c3e50;
  color: #FFFF;
  border-radius: .5rem;
}

.card-body {
  padding: 0.5rem;
}

.card-title {
  margin-bottom: 0;
}

.card-img-top {
  width: 100%;
  min-height: 12vw;
  object-fit: cover;
}

.menu-card-content {
  /* padding: 10px; */
}

.menu-card {
  transition: box-shadow 0.3s ease-in-out 0s;
  transition: transform .5s; /* Animation */
}

.menu-card:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 16px;
  transform: scale(1.05); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>
