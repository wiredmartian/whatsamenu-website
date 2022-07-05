<template>
  <table class="table">
    <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Group</th>
      <th scope="col">Price</th>
      <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item of menuItems" :key="item.menuItemId">
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
        <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i> Delete</button>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<script lang="ts">
import Vue from "vue"
import {MenuItem} from "@/types";

export default Vue.extend({
  name: "MenuItemTable",
  props: {
    menuItems: {
      type: Array as () => Array<MenuItem>,
      required: true
    },
    menuGroup: {
      type: String,
      required: true
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