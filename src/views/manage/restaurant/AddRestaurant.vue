<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-sm-12">
        <div class="mt-5 mb-5 d-block text-center">
          <h2 class="font-weight-bolder">Add Restaurant</h2>
        </div>
        <form @submit.prevent="addRestaurant" :v-model="model">
          <div class="form-group">
            <label for="name">Name</label>
            <input name="name" v-model="model.name" type="text" class="form-control" id="name" placeholder="Name">
          </div>
          <div class="form-group">
            <label for="summary">Summary</label>
            <textarea name="summary" v-model="model.summary" class="form-control" id="summary" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="line1">Address Line 1</label>
            <input name="line1" v-model="model.line1" type="text" class="form-control" id="line1"
                   placeholder="1234 Main St">
          </div>
          <div class="form-group">
            <label for="line2">Address Line 2</label>
            <input name="line2" v-model="model.line2" type="text" class="form-control" id="line2"
                   placeholder="Apartment, studio, or floor">
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="city">City</label>
              <input name="city" v-model="model.city" type="text" placeholder="Durban" class="form-control" id="city">
            </div>
            <div class="form-group col-md-6">
              <label for="state">State</label>
              <select name="state" v-model="model.state" id="state" class="form-control">
                <option v-for="item of Object.keys(provinces)" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="country">Country</label>
            <input name="country" placeholder="South Africa" v-model="model.country" type="text" class="form-control"
                   id="country">
          </div>
          <button type="submit" class="btn btn-block btn-dark">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {AddRestaurantRequest, Restaurant} from "@/types/types";
import {PROVINCES} from "@/types/enums"
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  name: "AddRestaurant",
  data() {
    return {
      model: {} as AddRestaurantRequest,
      provinces: PROVINCES,
      restaurantId: ""
    }
  },
  async mounted() {
    this.restaurantId = this.$route.params['id']
    await this.getRestaurant()
  },
  methods: {
    async addRestaurant() {
      try {
        this.model.latitude = 0.16364
        this.model.longitude = 1.92384872
        const res = await apiAdapter.putOrPost("/restaurants", "POST", this.model)
        if (res.status === 200 || res.status === 201) {
          console.log(res.data)
          await this.$router.push({path: '/manage/my-restaurants'})
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getRestaurant() {
      if (this.restaurantId) {
        try {
          const response = await apiAdapter.get<Restaurant[]>(`/restaurants/${this.restaurantId}`)
          if (response.status === 200 && response.data) {
            console.log(response.data[0])
            const data = response.data[0]
            this.model.name = data.name
            this.model.summary = data.summary
            this.model.line1 = data.address.line1
            this.model.line2 = data.address.line2
            this.model.city = data.address.city
            this.model.state = data.address.state
            this.model.country = data.address.country
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
})
</script>

<style scoped>

</style>
