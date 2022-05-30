<template>
  <div class="row mt-5">
    <div class="col-sm-12" v-if="allergens.length > 0">
      <h3 class="text-center mb-5">Allergens</h3>

      <div class="accordion" id="allergenAccordian">
        <div v-for="item of allergens" :key="item.name" class="card border-0"
             @click="wikiLookupAllergen(item.name, item.allergenId)">
          <div class="card-header bg-dark" :id="`heading${item.allergenId}`">
            <h2 class="mb-0">
              <button class="btn btn-dark btn-block text-left collapsed" type="button" data-toggle="collapse"
                      :data-target="`#collapse${item.allergenId}`" aria-expanded="true"
                      :aria-controls="`collapse${item.allergenId}`">
                {{ item.name }}
              </button>
            </h2>
          </div>
          <div :id="`collapse${item.allergenId}`" class="collapse" :aria-labelledby="`heading${item.allergenId}`"
               data-parent="#allergenAccordian">
            <div class="card-body">
              <div v-if="isLoading">
                <app-spinner/>
              </div>
              <div v-else>
                {{ modal.extract }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {MenuItemAllergen} from "@/types/types";

export default Vue.extend({
  name: "MenuItemAllergensAccordian",
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
    async wikiLookupAllergen(searchTerm: string, id: string) {
      document.querySelector(`collapse${id}`)?.classList.add('show')
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
#allergenAccordian .card {
  margin-bottom: 1rem;
  border-radius: .5rem;
}

#allergenAccordian .btn-dark:hover, #allergenAccordian .btn-dark:focus, #allergenAccordian .btn-dark:active {
  color: #fff;
  background-color: #343a40 !important;
  border-color: #343a40;
  box-shadow: none;
}
</style>
