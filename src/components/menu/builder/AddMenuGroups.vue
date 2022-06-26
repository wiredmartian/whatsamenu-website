<template>
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
      <div class="mt-2">
        <a href="#" class="badge badge-light mr-2 mb-2" v-for="item of menuGroups" :key="item.name">
          <h5 class="mb-0">{{ item.name }}</h5>
        </a>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {apiAdapter} from "@/api/adapter"
import {AddMenuGroupRequest, MenuGroup} from "@/types"
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
      menuGroups: [] as MenuGroup[],
      isLoading: false
    }
  },
  async mounted() {
    await this.getMenuGroups()
  },
  methods: {
    async getMenuGroups() {
      try {
        const response = await apiAdapter.get<MenuGroup[]>(`/menu/${this.menuId}/menu-groups`)
        if (response.status === 200) {
          this.menuGroups = response.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addMenuGroup() {
      try {
        this.isLoading = true
        const response = await apiAdapter.putOrPost(`/menu/${this.menuId}/menu-groups`, "POST", this.model)
        if (response.status === 201 || response.status === 200) {
          console.log(response.data)
        }
        await this.getMenuGroups()
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
