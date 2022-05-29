<template>
  <div v-if="showSpinner" class="row page-container">
    <div class="h-100 row align-items-center m-auto">
      <div class="col">
          <app-spinner/>
      </div>
    </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "PageLoadSpinner",
  props: {
    showSpinner: {
      type: Boolean,
      required: true
    }
  },
  components: {
    AppSpinner: () => import("@/components/ui/Spinner.vue")
  }
}
</script>

<style scoped>
.page-container {
  height: 80vh;
}
</style>
