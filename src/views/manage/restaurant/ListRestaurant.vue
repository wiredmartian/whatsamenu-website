<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-10 col-sm-12">
        <div class="mt-5 mb-5 d-block text-center">
          <h2 class="font-weight-bolder">My Restaurants</h2>
        </div>
        <table class="table">
          <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item of restaurants" :key="item.restaurantId">
            <th scope="row">{{ item.restaurantId }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.address.line1 }}, {{ item.address.line2 }}</td>
            <td>
              <router-link :to="`/manage/restaurant/add/${item.restaurantId}`" class="btn btn-sm btn-dark mr-1">Update
              </router-link>
              <router-link :to="`/manage/restaurants/${item.restaurantId}/menu`" type="button"
                           class="btn btn-sm btn-dark mr-1">Menu
              </router-link>
              <button type="button" class="btn btn-sm btn-danger mr-1">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {Restaurant} from "@/types/types";
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  name: "ListRestaurant",
  data() {
    return {
      restaurants: [] as Array<Restaurant>,
    }
  },
  async mounted() {
    await this.getMyRestaurants()
  },
  methods: {
    async getMyRestaurants() {
      try {
        const response = await apiAdapter.get<Restaurant[]>("/restaurants/owner")
        console.log(response.data)
        this.restaurants = response.data
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style scoped>

</style>
