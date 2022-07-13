<template>
  <form @submit.prevent="addMenuItem" :model="model">
    <div class="form-group">
      <label for="menuGroupId">Group/category</label>
      <select name="menuGroupId" v-model="model.menuGroupId" id="menuGroupId" class="form-control">
        <option v-for="item of menuGroups" :key="item.menuGroupId" :value="item.menuGroupId">{{
            item.name
          }}
        </option>
      </select>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="name">Name</label>
        <input name="name" v-model="model.name" type="text" class="form-control" id="name" placeholder="Name">
      </div>
      <div class="form-group col-md-6">
        <label for="price">Price</label>
        <input name="price" v-model="model.price" type="number" class="form-control" id="price"
               placeholder="25.50">
      </div>
    </div>
    <div class="form-group">
      <label for="summary">Summary</label>
      <textarea name="summary" v-model="model.summary" class="form-control" id="summary" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea name="description" v-model="model.description" class="form-control" id="description"
                rows="3"></textarea>
    </div>
    <div class="form-group form-check form-check-inline" v-for="item in allergens" :key="item.name">
      <input v-model="checkedAllergens" class="form-check-input" type="checkbox" :id="`allergen-${item.allergenId}`"
             :value="item.allergenId">
      <label class="form-check-label" :for="`allergen-${item.allergenId}`">{{ item.name }}</label>
    </div>
    <button type="submit" class="btn btn-block btn-dark">Save Changes</button>
  </form>
</template>

<script lang="ts">
import {apiAdapter} from "@/api/adapter"
import {AddMenuItemRequest, Allergen, MenuGroup} from "@/types"
import Vue from "vue"

export default Vue.extend({
  name: "AddMenuItem",
  props: {
    menuId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      model: {} as AddMenuItemRequest,
      menuGroups: [] as MenuGroup[],
      allergens: [] as Allergen[],
      checkedAllergens: [],
      isLoading: false,
    }
  },
  async mounted() {
    await Promise.all([this.getMenuGroups(), this.getAllergens()])
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
    async addMenuItem() {
      try {
        this.model.allergens = this.checkedAllergens
        this.model.price = parseFloat(this.model.price.toString())
        const response = await apiAdapter.putOrPost<AddMenuItemRequest, { data: string }>(`/menu-groups/${this.model.menuGroupId}/menu-items`, "POST", this.model)
        if (response.status === 201 && response.data) {
          console.log(response.data)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getAllergens() {
      try {
        const response = await apiAdapter.get<Allergen[]>(`/allergens`)
        if (response.status == 200 && response.data) {
          this.allergens = response.data
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
