<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
  margin-top: 60px;
}

/** custom cards */
.card {
  border: none;
}
.card-img-top {
    height: 12vw;
    object-fit: cover;
  }
  .card-body {
    padding: 0.5rem 0;
  }
  .card-title {
    margin-bottom: 0.25rem;
  }
  /** end custom card */
</style>
