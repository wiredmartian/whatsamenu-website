<template>
  <form @submit.prevent="addIngredient" :model="model">
    <div class="form-group">
      <label for="name">Name</label>
      <input name="name" v-model="model.name" class="form-control" id="name"/>
    </div>
    <spinner v-if="isLoading"/>
    <button v-else type="submit" class="btn btn-block btn-dark">Save Changes</button>
  </form>
</template>

<script lang="ts">
import {apiAdapter} from '@/api/adapter'
import {AddIngredientRequest} from '@/types'
import Vue from 'vue'

export default Vue.extend({
  name: "AddIngredientForm",
  components: {spinner: () => import("@/components/ui/Spinner.vue")},
  props: {
    menuItemId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      model: {} as AddIngredientRequest
    }
  },
  methods: {
    async addIngredient() {
      try {
        const response = await apiAdapter.putOrPost(`/menu-item/${this.menuItemId}/ingredients`, "POST", this.model)
        if (response.status === 201 && response.data) {
          console.log(response.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>