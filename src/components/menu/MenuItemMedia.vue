<template>
  <div>
    <!--  <router-link :to="`/restaurant/menu/menu-item/${menuItem.menuItemId}`">-->
    <!--  </router-link>x-->


    <div class="media mb-2" :key="menuItem.name">
      <!--      <img class="align-self-center rounded mr-3 w-25" :src="menuItem.imageUrl" :alt="menuItem.name">-->
      <img v-if="menuItem.imageUrl" v-bind:src="`${imgCDN}/` + menuItem.imageUrl" class="align-self-center rounded"
        :alt="menuItem.name">
      <svg v-else class="align-self-center rounded" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg"
        role="img" :aria-label="menuItem.name" preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="100%" height="100%" fill="#6c757d"></rect>
      </svg>
      <div class="media-body align-self-center pl-3">
        <h5 class="mt-0"> {{ menuItem.name }}</h5>
        <p class="block-ellipsis mb-0">{{ menuItem.summary }}
        </p>
        <span><b>R{{ menuItem.price.toFixed(2) }}</b></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { MenuItem } from "@/types";
import { API_BASE_URL } from "@/api/common";

export default Vue.extend({
  name: "MenuItemMedia",
  props: {
    menuItem: {
      type: Object,
      default: () => ({} as MenuItem),
      required: true
    }
  },
  data() {
    return {
      imgCDN: API_BASE_URL
    }
  }
})
</script>

<style scoped>
.media img,
.media svg {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.block-ellipsis {
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: auto;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>