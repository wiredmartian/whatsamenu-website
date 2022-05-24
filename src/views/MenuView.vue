<template>
  <div class="container-fluid">
    <div class="row">
      <!--      <img v-if="restaurant.imageUrl"-->
      <!--           :src="restaurant.imageUrl"-->
      <!--           class="img-fluid">-->
      <img
          src="https://thumbs.dreamstime.com/b/mexican-food-panoramic-header-blue-background-nachos-chili-con-carne-tacos-chicken-various-dips-top-shot-210526469.jpg"
          class="img-fluid">
    </div>
    <div class="row" v-if="restaurant">
      <div class="col-md-6 col-sm-12">
        <div class="mt-5 d-block pl-4">
          <h2 class="font-weight-bolder">{{ restaurant.name }}</h2>
        </div>
        <p v-if="restaurant.address" class="text-muted pl-4">{{ restaurant.address.line1 }}, {{
            restaurant.address.line2
          }} <br/>
          {{ restaurant.address.city }}, {{ restaurant.address.state }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-12">
        <menu-group-sidebar :menuGroups="menuGroups"/>
      </div>
      <div class="col-md-9 col-sm-12">
        <div class="main-content">
          <div v-if="isLoading">
            <app-spinner/>
          </div>
          <div v-else class="row" :id="group.name.split(' ').join('-')" v-for="group of menu.menuGroups"
               :key="`row-`+group.menuGroupId">
            <div class="row" v-if="group.items !== null">
              <div class="col-12 mb-3 mt-3">
                <h3>{{ group.name }}</h3>
              </div>
              <div class="col-md-3 col-sm-6 mb-4" v-for="(item, i) of group.items" :key="`col-${i}${item.menuItemId}`">
                <router-link to="menu/item" v-if="item.imageUrl">
                  <div class="card menu-card h-100">
                    <div class="menu-card-content">
                      <img v-if="item.imageUrl" v-bind:src="`https://menu.core.wiredmartians.co.za/`+item.imageUrl"
                           class="card-img-top"
                           alt="...">
                      <img v-else
                           src="https://menu.core.wiredmartians.co.za/public/placeholder.png"
                           class="card-img-top"
                           alt="...">
                      <div class="card-body">
                        <h5 class="card-title"><b>{{ item.name }}</b></h5>
                        <p class="card-text">R {{ item.price.toFixed(2) }}</p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <hr/>
            </div>
            <div v-else class="row">
              <div class="col-12 mb-3 mt-3">
                <h3>{{ group.name }}</h3>
              </div>
              <div class="col-md-12 mb-4">
                <p class="lead text-muted">No menu items yet</p>
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
</template>

<script lang="ts">
import {Menu, Restaurant} from "@/types/types"
import Vue from "vue"
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  components: {
    MenuGroupSidebar: () => import("@/components/menu/MenuGroupSidebar.vue"),
    LocationMap: () => import("@/components/restaurant/LocationMap.vue"),
    AppSpinner: () => import("@/components/ui/Spinner.vue")
  },
  data() {
    return {
      isLoading: false,
      restaurantId: "",
      menu: {} as Menu,
      menuGroups: [] as Array<Record<string, string | number | undefined>>,
      restaurant: {} as Restaurant
    }
  },
  async mounted() {
    this.restaurantId = this.$route.params['id']
    await this.getMenu()
    await this.getRestaurant()
    this.smoothScroll()
  },
  methods: {
    async getMenu() {
      this.isLoading = true
      const response = await apiAdapter.get<Menu>(`/restaurants/menu/${this.restaurantId}`)
      this.menu = response.data
      this.menuGroups = response.data.menuGroups.map(item => {
        return {
          name: item.name,
          length: item.items?.length
        }
      })
      this.isLoading = false
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
}

.card-body {
  padding: 0.5rem 0 0.5rem 0;
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
  padding: 10px;
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
