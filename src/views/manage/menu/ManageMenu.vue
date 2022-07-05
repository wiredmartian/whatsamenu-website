<template>
  <div class="container-fluid">
    <add-menu-group v-if="menu.menuId" :menu-id="menu.menuId"/>
    <!--    <div class="row justify-content-md-center">-->
    <!--      <add-menu-item v-if="menu.menuId" :menu-id="menu.menuId"/>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {apiAdapter} from "@/api/adapter";
import {HttpResponseError, Menu} from "@/types";

export default Vue.extend({
  name: "ManageMenu",
  components: {
    "add-menu-group": () => import("@/components/menu/builder/AddMenuGroups.vue"),
    // "add-menu-item": () => import("@/components/menu/builder/menu-item/AddMenuItem.vue")
  },
  data() {
    return {
      menu: {} as Menu,
      responseErrorStatus: 0,
      responseErrorMessage: "",
      restaurantId: "",
      isLoading: false,
      isPageLoading: false,
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
        } else {
          this.responseErrorMessage = (response.data as HttpResponseError).error
          this.responseErrorStatus = response.status
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
