<template>
  <div class="row mt-5">
    <div class="col-sm-12">
      <h3 class="text-center mb-5">Ingredients</h3>
      <div class="row align-items-center mb-3">
        <div class="col-md-3 mb-3" v-for="item of ingredients" :key="item.name" @click="wikiLookup(item.name)"
             data-toggle="modal" data-target="#exampleModalLong">
          <figure class="figure">
            <img src="https://www.mcdonalds.co.za/media/products/big-mac/McDonalds-Image-Resize.psdBig-mac.png"
                 class="figure-img img-fluid rounded"
                 alt="A generic square placeholder image with rounded corners in a figure.">
            <figcaption class="figure-caption text-center">
              <p class="lead">{{ item.name }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{ modal.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ modal.extract }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {MenuItemIngredient} from "@/types/types";
import {$axios} from "@/api/common";
import axios from "axios";

export default Vue.extend({
  name: "MenuItemIngredients",
  data() {
    return {
      modal: {
        title: "",
        extract: ""
      }
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
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro&explaintext&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch='${searchTerm} food'`)
      const data = await response.json()
      for (let i in data.query.pages) {
        this.modal.title = searchTerm
        this.modal.extract = data.query.pages[i].extract
      }
    }
  }
})
</script>

<style scoped>

</style>
