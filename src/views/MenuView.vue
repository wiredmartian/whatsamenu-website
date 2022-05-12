<template>
  <div class="container-fluid">
    <div class="row">
      <img
          src="https://thumbs.dreamstime.com/b/mexican-food-panoramic-header-blue-background-nachos-chili-con-carne-tacos-chicken-various-dips-top-shot-210526469.jpg"
          class="img-fluid">
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-12">
        <MenuGroupSidebar :menuGroups="menuGroups"/>
      </div>
      <div class="col-md-9 col-sm-12">
        <div class="main-content">
          <div class="row" :id="group.name" v-for="group of menu.menuGroups" :key="`row-`+group.menuGroupId">
            <div class="col-12 mb-3 mt-3">
              <h3>{{ group.name }}</h3>
            </div>
            <div class="col-md-3 col-sm-6 mb-4" v-for="item of group.items" :key="`col-${item.menuItemId}`">
              <div class="card menu-card h-100">
                <div class="menu-card-content">
                  <!--                  <img v-if="item.imageUrl" v-bind:src="`http://localhost:9200/`+item.imageUrl" class="card-img-top"-->
                  <!--                       alt="...">-->
                  <img
                      v-bind:src="`https://www.mcdonalds.co.za/media/products/big-mac/McDonalds-Image-Resize.psdBig-mac.png`"
                      class="card-img-top"
                      alt="...">
                  <!--                  <img v-else-->
                  <!--                       v-bind:src="`https://www.mcdonalds.co.za/media/products/big-mac/McDonalds-Image-Resize.psdBig-mac.png`"-->
                  <!--                       class="card-img-top"-->
                  <!--                       alt="...">-->
                  <div class="card-body">
                    <h5 class="card-title"><b>{{ item.name }}</b></h5>
                    <p class="card-text">R {{ item.price.toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Menu} from "@/types/types"
import MenuGroupSidebar from "@/components/menu/MenuGroupSidebar.vue"
import Vue from "vue"
import {fakeMenu} from "@/fake"

export default Vue.extend({
  components: {
    MenuGroupSidebar
  },
  data() {
    return {
      menu: {} as Menu,
      menuGroups: [] as Array<Record<string, string | number | undefined>>
    }
  },
  async mounted() {
    await this.getMenu()
    this.smoothScroll()
  },
  methods: {
    async getMenu() {
      // const response = await $axios.get<Menu>("/restaurants/menu/6")
      const response = fakeMenu;
      this.menu = response

      this.menuGroups = response.menuGroups.map(item => {
        return {
          name: item.name,
          length: item.items?.length
        }
      })
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
  height: 12vw;
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
