<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
      </div>
      <div class="badge badge-info mt-3">Under development</div>
      <div class="text-muted mt-2">&copy;whatsamenu.co.za 2021 - {{year}} | powered by wiredmartians</div>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: "AppFooter",
  data() {
    return {
      year: new Date(Date.now()).getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  line-height: 40px;
  background-color: #f5f5f5;
  text-align: center;
  margin-top:auto;
}
</style>
