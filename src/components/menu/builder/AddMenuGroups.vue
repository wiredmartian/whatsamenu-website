<template>
  <div class="row">
    <div class="col-md-3">
      <!--  Menu Groups  -->
      <div class="sidebar-section mt-5">
        <div class="sidebar-item sticky-top">
          <div class="sidebar-content">
            <ul class="list-group">
              <li v-for="g of menuGroups" :key="`group-`+g.name"
                  class="list-group-item d-flex justify-content-between align-items-start border-0">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">
                    <h5><a v-on:click="getMenuGroupMenuItems(g.menuGroupId, g.name)">{{ g.name }}</a></h5>
                  </div>
                </div>
              </li>
            </ul>
            <button type="button" data-toggle="modal" data-target="#menuGroupModal"
                    class="btn btn-block btn-dark ml-3 mr-3"><i class="bi bi-plus-square"></i> Menu Group
            </button>
          </div>
        </div>
        <!--  End Menu Groups  -->

        <!-- Modal -->
        <div class="modal fade" id="menuGroupModal" tabindex="-1" role="dialog" aria-labelledby="menuGroupTitle"
             aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="Add Menu Group/Sub-category">New menu group</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addMenuGroup" :model="model">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input name="name" v-model="model.name" class="form-control" id="name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="summary">Summary (Optional)</label>
                    <textarea name="summary" v-model="model.summary" class="form-control" id="summary"
                              rows="3"></textarea>
                  </div>
                  <button v-if="!isLoading" type="submit" class="btn btn-block btn-dark">Save Changes</button>
                  <loading-spinner v-else/>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- End Modal -->
      </div>
    </div>
    <div class="col-md-9 mt-5">
      <h4 v-if="selectedMenuGroup" class="display-4 mb-5">{{ selectedMenuGroup }}</h4>

      <div class="row">
        <div class="col-md-3 col-sm-6 mb-4" :key="item.name" v-for="item of menuItems">
          <menu-item-card :menu-item="item"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button type="button" data-toggle="modal" data-target="#menuItemModal"
                  class="btn btn-dark"><i class="bi bi-plus-square"></i> Menu Item
          </button>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="menuItemModal" tabindex="-1" role="dialog" aria-labelledby="menuItemModalTitle"
           aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="Add Menu Group/Sub-category">Add Menu Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <add-menu-item-form :menu-id="menuId"/>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal -->
    </div>
  </div>
</template>

<script lang="ts">
import {apiAdapter} from "@/api/adapter"
import {AddMenuGroupRequest, MenuGroup, MenuItem} from "@/types"
import Vue from "vue"

export default Vue.extend({
  name: "AddMenuGroup",
  components: {
    "loading-spinner": () => import("@/components/ui/Spinner.vue"),
    "menu-item-card": () => import("@/components/menu/builder/menu-item/MenuItemCard.vue"),
    "add-menu-item-form": () => import("@/components/menu/builder/menu-item/AddMenuItemForm.vue")
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
      selectedMenuGroup: "",
      menuGroups: [] as MenuGroup[],
      menuItems: [] as MenuItem[],
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
    },
    async getMenuGroupMenuItems(menuGroupId: number | string, menuGroup: string) {
      this.isLoading = true
      try {
        this.selectedMenuGroup = menuGroup
        const response = await apiAdapter.get<MenuItem[]>(`/menu-groups/${menuGroupId}/menu-items`)
        if (response.data) {
          this.menuItems = response.data
        }
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style scoped>

</style>
