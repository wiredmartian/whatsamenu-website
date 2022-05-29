<template>
  <div class="row mt-5">
    <div class="col-sm-12">
      <h3 class="text-center mb-5">Ingredients</h3>
      <div class="row align-items-center mb-3">
        <div class="col-md-3 mb-3" v-for="item of ingredients" :key="item.name"
             data-toggle="modal" data-target="#exampleModalLong">
          <figure class="figure">
            <img src="https://www.mcdonalds.co.za/media/products/big-mac/McDonalds-Image-Resize.psdBig-mac.png"
                 class="figure-img img-fluid rounded"
                 alt="A generic square placeholder image with rounded corners in a figure.">
            <figcaption class="figure-caption text-center">
              <p class="lead">{{ item.name }}
              <span class="badge badge-dark rounded-pill" @click="wikiLookup(item.name)">?</span>
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle" v-if="wikiData.query">{{ wikiData.query.pages[0].title || "No Data"}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="isLoading">
              <app-spinner/>
            </div>
            <div v-else>
              <div v-if="noWikiData">
                <p class="lead text-center">No results were found</p>
              </div>
              <div v-else>
                 <img v-if="wikiData.query" class="img-fluid" :src="wikiData.query.pages[0].thumbnail.source"/>
                <p class="lead mt-2" v-if="wikiData.query">{{ wikiData.query.pages[0].terms.description[0] }}</p>
              </div>
            </div>
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
import Vue from 'vue'
import {DISAMBIGUATION_PAGE, MenuItemIngredient, WikipediaQueryResponse} from "@/types/types";

export default Vue.extend({
  name: "MenuItemIngredients",
  components: {
    AppSpinner: () => import("@/components/ui/Spinner.vue")
  },
  data() {
    return {
      wikiData: {} as WikipediaQueryResponse,
      isLoading: false,
      noWikiData: false
    }
  },
  props: {
    ingredients: {
      type: Array as () => Array<MenuItemIngredient>,
      required: true
    },
  },
  methods: {
    async wikiLookup(searchTerm: string) {
      this.isLoading = true;
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&&origin=*&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles=${searchTerm}`)
      const data: WikipediaQueryResponse = await response.json()

      this.isLoading = false

      if ((data && data.query.pages[0].missing) || (data && data.query.pages[0].terms.description[0] === DISAMBIGUATION_PAGE)) {
        this.noWikiData = true
      } else {
        this.wikiData = data
        this.noWikiData = false
      }
      console.log(this.wikiData)
    }
  }
})
</script>

<style scoped>
  .badge {
    cursor: pointer;
  }
</style>
