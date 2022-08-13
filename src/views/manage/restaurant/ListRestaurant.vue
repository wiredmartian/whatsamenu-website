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
              <button v-on:click="setSelectedRestaurantId(item.restaurantId)" data-toggle="modal"
                      data-target="#restaurantUpload"
                      class="btn btn-sm btn-outline-secondary"><i
                  class="bi bi-image"></i> Banner
              </button> &nbsp;
              <button type="button" class="btn btn-sm btn-danger mr-1">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="restaurantUpload" tabindex="-1" role="dialog" aria-labelledby="restaurantUploadTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="Add Menu Group/Sub-category">Upload image item: #{{ selectedRestaurantId }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <upload :entity-id="selectedRestaurantId" :entity-type="entityType"/>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {Restaurant} from "@/types/types";
import {apiAdapter} from "@/api/adapter";
import {ENTITY_TYPE} from "@/types";

export default Vue.extend({
  name: "ListRestaurant",
  components: {
    "upload": () => import("@/components/upload/UploadImageForm.vue")
  },
  data() {
    return {
      restaurants: [] as Array<Restaurant>,
      entityType: ENTITY_TYPE.RESTAURANT,
      selectedRestaurantId: ""
    }
  },
  async mounted() {
    await this.getMyRestaurants()
  },
  methods: {
    async getMyRestaurants() {
      try {
        const response = await apiAdapter.get<Restaurant[]>("/restaurants/owner")
        this.restaurants = response.data
      } catch (e) {
        console.log(e)
      }
    },
    setSelectedRestaurantId(restaurantId: string) {
      this.selectedRestaurantId = restaurantId
    }
  }
})
</script>

<style scoped>

</style>
