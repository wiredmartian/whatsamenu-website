<template>
  <div class="container-fluid">
    <build-menu v-if="menu.menuId" :menu-id="menu.menuId"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {apiAdapter} from "@/api/adapter";
import {HttpResponseError, Menu} from "@/types";

export default Vue.extend({
  name: "ManageMenu",
  components: {
    "build-menu": () => import("@/components/menu/builder/menu-item/BuildMenu.vue"),
  },
  data() {
    return {
      menu: {} as Menu,
      restaurantId: "",
      isLoading: false,
    }
  },
  mounted() {
    this.restaurantId = this.$route.params['id']
    this.getMenu()
  },
  methods: {
    async getMenu() {
      try {
        this.isLoading = true
        const response = await apiAdapter.get<Menu | HttpResponseError>(`/restaurants/${this.restaurantId}/menu`)
        if (response.status === 200) {
          this.menu = response.data as Menu
          console.log(this.menu)
        } 
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    }
  }
})
</script>

<style scoped>

</style>
