<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-3">
              <MenuGroupSidebar :menuGroups="menuGroups"/>
          </div>
          <div class="col-9">
              <div class="main-content">
                  <div class="row" :id="group.name" v-for="group of menu.menuGroups" :key="`row-`+group.menuGroupId">
                    <div class="col-12 mb-4 mt-4">
                        <h2>{{group.name}}</h2>
                    </div>
                    <div class="col-3" v-for="item of group.items" :key="`col-`+item.menuItemId">
                        <div class="card h-100">
                            <img v-if="item.imageUrl" v-bind:src="`http://localhost:9200/`+item.imageUrl" class="card-img-top" alt="...">
                            <img v-else v-bind:src="`http://localhost:9200/public/placeholder.png`" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title"><b>{{item.name}}</b></h5>
                                <p class="card-text">R{{item.price}}</p>
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
import { $axios } from "@/api/common"
import { Menu } from "@/types/types"
import MenuGroupSidebar from "@/components/menu/MenuGroupSidebar.vue"
import Vue from "vue"
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
            const response = await $axios.get<Menu>("/restaurants/menu/19")
            this.menu = response.data
            this.menuGroups = response.data.menuGroups.map(item => {
               return {
                    name: item.name,
                    length: item.items?.length
               }
            })
        },
        smoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click',  (e) => {
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
  .sidebar-section {
    height: 100%;
  }
  .main-content {
    min-height: 100vh;
    padding: 1em;
  }
</style>