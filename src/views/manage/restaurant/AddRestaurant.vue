<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-sm-12">
        <div class="mt-5 mb-5 d-block text-center">
          <h2 class="font-weight-bolder">Add Restaurant</h2>
        </div>
        <form @submit.prevent="addRestaurant" :model="model">
          <div class="form-group">
            <label for="inputEmail4">Name</label>
            <input v-model="model.name" type="text" class="form-control" id="inputEmail4" placeholder="Name">
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Summary</label>
            <textarea v-model="model.summary" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="inputAddress">Address Line 1</label>
            <input v-model="model.line1" type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
          </div>
          <div class="form-group">
            <label for="inputAddress2">Address Line 2</label>
            <input v-model="model.line2" type="text" class="form-control" id="inputAddress2"
                   placeholder="Apartment, studio, or floor">
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input v-model="model.city" type="text" placeholder="Durban" class="form-control" id="inputCity">
            </div>
            <div class="form-group col-md-6">
              <label for="inputState">State</label>
              <select v-model="model.state" id="inputState" class="form-control">
                <option v-for="item of Object.keys(provinces)" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputZip">Country</label>
            <input placeholder="South Africa" v-model="model.country" type="text" class="form-control" id="inputZip">
          </div>
          <button type="submit" class="btn btn-block btn-dark">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {AddRestaurantRequest} from "@/types/types";
import {PROVINCES} from "@/types/enums"
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  name: "AddRestaurant",
  data() {
    return {
      model: {} as AddRestaurantRequest,
      provinces: PROVINCES
    }
  },
  methods: {
    async addRestaurant() {
      try {
        this.model.latitude = 0.16364
        this.model.longitude = 1.92384872
        const res = await apiAdapter.putOrPost("/restaurants", "POST", this.model)
        if (res.status === 200 || res.status === 201) {
          console.log(res.data)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
})
</script>

<style scoped>

</style>
