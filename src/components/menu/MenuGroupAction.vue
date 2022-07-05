<template>
  <div class="sidebar-section mt-4">
    <div class="sidebar-item sticky-top">
      <div class="sidebar-content">
        <ul class="list-group">
          <li v-for="g of menuGroups" :key="`group-`+g.name"
              class="list-group-item d-flex justify-content-between align-items-start border-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <h5><a data-toggle="modal" data-target="#menuGroupModal"
                       :href="`#${g.menuGroupId}-${g.name.split(' ')[0].toLowerCase()}`">{{ g.name }}</a></h5>
              </div>
            </div>
          </li>
        </ul>
        <button type="button" class="btn btn-block btn-dark ml-4 mr-4">Add New</button>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="menuGroupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn btn-dark">Okay</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {MenuGroup} from "@/types";

export default Vue.extend({
  name: 'MenuGroupAction',
  props: {
    menuGroups: {
      type: Array as () => Array<MenuGroup>,
      required: true
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #2c3e50;
}
</style>
