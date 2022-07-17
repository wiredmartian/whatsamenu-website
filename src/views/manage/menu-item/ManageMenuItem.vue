<template>
  <div class="container">
    <build-menu-item :menu-item-id="menuItemId"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageMenuItem",
  components: {
    "build-menu-item": () => import("@/components/menu/builder/menu-item/BuildMenuItem.vue"),
  },
  data() {
    return {
      menuId: "",
      menuItemId: ""
    }
  },
  mounted() {
    this.menuId = this.$route.params['mid']
    this.menuItemId = this.$route.params['id']
    console.log(this.menuItemId)
    console.log(this.menuId)
  },
})
</script>

<style scoped>

</style>
