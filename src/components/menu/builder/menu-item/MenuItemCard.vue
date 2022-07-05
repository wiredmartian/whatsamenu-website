<template>
  <div class="card menu-card h-100">
    <div class="menu-card-content">
      <img v-if="menuItem.imageUrl" v-bind:src="`http://localhost:9200/`+menuItem.imageUrl"
           class="card-img-top"
           alt="...">
      <img v-else
           src="/placeholder.png"
           class="card-img-top"
           alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ menuItem.name }}</h5>
        <p class="card-text">R {{ menuItem.price.toFixed(2) }}</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-sm btn-outline-dark mr-2"><i class="bi bi-pencil-square"></i> Edit</button>
        <button class="btn btn-sm btn-outline-dark"><i class="bi bi-cloud-upload"></i> Image</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {MenuItem} from "@/types";

export default Vue.extend({
  name: "MenuItemCard",
  props: {
    menuItem: {
      type: Object,
      default: () => ({} as MenuItem),
      required: true
    }
  }
})
</script>

<style scoped>

</style>