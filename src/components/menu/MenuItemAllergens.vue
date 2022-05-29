<template>
  <div class="row mt-5">
    <div class="col-sm-12">
      <h3 class="text-center mb-5">Allergens</h3>
      <div class="align-items-center mb-3">
        <ul class="list-group list-group-flush">
          <li v-for="item of allergens" :key="item.name" class="list-group-item border-0" data-toggle="modal"
              data-target="#allergenModal" @click="wikiLookupAllergen(item.name)">
            <p class="lead">> {{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="allergenModal" tabindex="-1" role="dialog" aria-labelledby="allergenModalTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="allergenModalTitle">{{ modal.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="isLoading">
              <app-spinner/>
            </div>
            <div v-else>
            {{ modal.extract }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-dismiss="modal">Okay</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {MenuItemAllergen} from "@/types/types";

export default Vue.extend({
  name: "MenuItemAllergens",
  components: {
    AppSpinner: () => import("@/components/ui/Spinner.vue")
  },
  data() {
    return {
      modal: {
        title: "",
        extract: ""
      },
      isLoading: false
    }
  },
  props: {
    allergens: {
      type: Array as () => Array<MenuItemAllergen>,
      required: true
    },
  },
  methods: {
    async wikiLookupAllergen(searchTerm: string) {
      this.isLoading = true
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro&explaintext&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch='${searchTerm} allergen'`)
      const data = await response.json()
      for (let i in data.query.pages) {
        this.modal.title = searchTerm
        this.modal.extract = data.query.pages[i].extract
      }
      this.isLoading = false
    }
  }
})

</script>

<style scoped>
  .list-group-item {
    cursor: pointer;
  }
</style>
