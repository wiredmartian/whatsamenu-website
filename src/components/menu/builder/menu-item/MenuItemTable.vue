<template>
  <div class="menu-item-table">
    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Group</th>
        <th scope="col">Price</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item of menuItems" :key="item.menuItemId">
        <td>
          {{ item.menuItemId }}
        </td>
        <th>
          <img v-if="item.imageUrl" v-bind:src="`http://localhost:9200/`+item.imageUrl"
               class="img-small"
               :alt="item.name">
          <p v-else class="text-muted">No Image</p>
        </th>
        <td>{{ item.name }}</td>
        <td>{{ menuGroup }}</td>
        <td>R{{ item.price.toFixed(2) }}</td>
        <td>
          <button class="btn btn-sm btn-outline-dark"><i class="bi bi-pencil-square"></i> Edit</button> &nbsp;
          <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i> Delete</button> &nbsp;
          <button v-on:click="setSelectedMenuItemId(item.menuItemId)" data-toggle="modal" data-target="#menuItemUpload"
                  class="btn btn-sm btn-outline-secondary"><i
              class="bi bi-image"></i> Upload
          </button>
        </td>
      </tr>
      </tbody>
    </table>


    <!-- Modal -->
    <div class="modal fade" id="menuItemUpload" tabindex="-1" role="dialog" aria-labelledby="menuItemUploadTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="Add Menu Group/Sub-category">Upload image item: #{{ selectedMenuItemId }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <upload :entity-id="selectedMenuItemId" :entity-type="entityType"/>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>

</template>

<script lang="ts">
import Vue from "vue"
import {ENTITY_TYPE, MenuItem} from "@/types";

export default Vue.extend({
  name: "MenuItemTable",
  data() {
    return {
      entityType: ENTITY_TYPE.MENUITEM,
      selectedMenuItemId: ""
    }
  },
  components: {
    "upload": () => import("@/components/upload/UploadImageForm.vue")
  },
  props: {
    menuItems: {
      type: Array as () => Array<MenuItem>,
      required: true
    },
    menuGroup: {
      type: String,
      required: true
    }
  },
  methods: {
    setSelectedMenuItemId(menuItemId: string) {
      this.selectedMenuItemId = menuItemId
    }
  }

})
</script>

<style scoped lang="css">
.img-small {
  width: 80px;
  height: auto;
}
</style>