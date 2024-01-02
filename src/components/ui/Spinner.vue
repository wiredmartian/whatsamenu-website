<template>
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppSpinner"
}
</script>

<style scoped>
.spinner-border {
  width: 4rem;
  height: 4rem;
}
</style>
