<template>
  <div class="row">
    <div class="col-sm-12 text-center mt-5">
      <h4 class="display-4">{{ this.prettyMessage }}</h4>
      <p class="lead">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "NotFound",
  data() {
    return {
      prettyMessage: ""
    }
  },
  created() {
    switch (this.requestStatus) {
      case 400:
        this.prettyMessage = "400: Bad Request"
        break;
      case 404:
        this.prettyMessage = "404: Not Found"
        break;
      case 401:
        this.prettyMessage = "401: Unauthorized to resource"
        break;
      default:
        this.prettyMessage = "An error unknown error has occurred"
    }
  },
  props: {
    errorMessage: {
      type: String,
      required: true
    },
    requestStatus: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
