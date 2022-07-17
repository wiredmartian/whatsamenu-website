<template>
  <div class="row">
    <div class="col-md-12">
      <div class="mt-4 d-block mb-4">
        <h1 class="font-weight-bolder">Manage Item</h1>
      </div>
    </div>
    <div class="col-md-12">

      <table class="table">
        <thead class="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item of ingredients" :key="item.ingredientId">
          <td>
            {{ item.ingredientId }}
          </td>
          <th>
            <img v-if="item.imageUrl" v-bind:src="`http://localhost:9200/`+item.imageUrl"
                 class="img-small"
                 :alt="item.name">
            <p v-else class="text-muted">No Image</p>
          </th>
          <td>{{ item.name }}</td>
          <td>
            <button v-on:click="setSelectedIngredientId(item.ingredientId)" data-toggle="modal"
                    data-target="#ingredientUpload"
                    class="btn btn-sm btn-outline-secondary"><i
                class="bi bi-image"></i> Upload
            </button> &nbsp;
            <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i> Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="float-right">
        <button type="button" data-toggle="modal" data-target="#addIngredientModal"
                class="btn btn-dark"><i class="bi bi-plus-square"></i> New Ingredient
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addIngredientModal" tabindex="-1" role="dialog"
         aria-labelledby="addIngredientModalTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="Add Menu Group/Sub-category">Add Ingredient</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <add-ingredient-form :menu-item-id="menuItemId"/>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->

    <!-- Modal -->
    <div class="modal fade" id="ingredientUpload" tabindex="-1" role="dialog" aria-labelledby="ingredientUploadTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="Add Menu Group/Sub-category">Upload image item: #{{ selectedIngredientId }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <upload :entity-id="selectedIngredientId" :entity-type="entityType"/>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script lang="ts">
import {apiAdapter} from "@/api/adapter";
import {ENTITY_TYPE, MenuItemIngredient} from "@/types";
import Vue from "vue"

export default Vue.extend({
  components: {
    "add-ingredient-form": () => import("@/components/menu/builder/ingredient/AddIngredientForm.vue"),
    "upload": () => import("@/components/upload/UploadImageForm.vue")
  },
  name: "BuildMenuItem",
  props: {
    menuItemId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedIngredientId: "",
      entityType: ENTITY_TYPE.INGREDIENT,
      ingredients: [] as MenuItemIngredient[]
    }
  },
  async mounted() {
    console.log("I was mounted")
    await this.getMenuItemIngredients();
  },
  methods: {
    async getMenuItemIngredients() {
      try {
        const response = await apiAdapter.get<MenuItemIngredient[]>(`/menu-item/${this.menuItemId}/ingredients`)
        if (response.status == 200) {
          console.log(response.data)
          this.ingredients = response.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    setSelectedIngredientId(ingredientId: string) {
      this.selectedIngredientId = ingredientId
    }
  }
})
</script>

<style scoped>
.img-small {
  width: 80px;
  height: auto;
}
</style>