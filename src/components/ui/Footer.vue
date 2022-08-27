<template>
  <footer class="footer">
    <div class="container">
      <span class="text-muted">&copy;whatsamenu.co.za 2021 - {{year}} | powered by wiredmartians</span>
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
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
  text-align: center;
  margin-top:auto;
}
</style>
