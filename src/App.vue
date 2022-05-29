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
  font-family: 'Roboto', sans-serif;
  font-weight: 300 !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
h1, h2, h3, h4, h5, h6 {
	font-weight: 300;
}

a, a:hover {
  color: #2c3e50;
  text-decoration: none;
}
</style>
