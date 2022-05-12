<template>
  <div id="app">
    <AppNavbar/>
    <div class="mb-5 mt-5">
      <router-view/>
    </div>
    <AppFooter/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  components: {
    AppFooter: () => import("@/components/ui/Footer.vue"),
    AppNavbar: () => import("@/components/ui/Navbar.vue")
  },
  name: 'App',
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

</style>
