<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-sm-12">
        <div class="mt-5 mb-5 d-block text-center">
          <h2 class="font-weight-bolder">Add Menu Group/Sub-category</h2>
        </div>
        <form @submit.prevent="addMenuGroup" :model="model">
          <div class="form-group">
            <label for="name">Name</label>
            <textarea name="name" v-model="model.name" class="form-control" id="name"
                      rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="summary">Summary (Optional)</label>
            <textarea name="summary" v-model="model.summary" class="form-control" id="summary" rows="3"></textarea>
          </div>
          
          <button v-if="!isLoading" type="submit" class="btn btn-block btn-dark">Save Changes</button>
          <loading-spinner v-else/>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { apiAdapter } from "@/api/adapter"
import {AddMenuGroupRequest} from "@/types"
import Vue from "vue"

export default Vue.extend({
  name: "AddMenuGroup",
  components: {
    "loading-spinner": () => import("@/components/ui/Spinner.vue")
  },
  props: {
    menuId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      model: {} as AddMenuGroupRequest,
      isLoading: false
    }
  },
  methods: {
    async addMenuGroup() {
      try {
        this.isLoading = true
        const response = await apiAdapter.putOrPost(`/menu/${this.menuId}/menu-groups`, "POST", this.model)
        if (response.status === 201 || response.status === 200) {
          console.log(response.data)
        }
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped>

</style>
