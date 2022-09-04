<template>
  <!-- Footer -->
<footer class="bg-light font-small pt-4">

<!-- Footer Links -->
<div class="container text-center text-md-left">

  <!-- Grid row -->
  <div class="row">

    <!-- Grid column -->
    <div class="col-md-6 mt-md-0 mt-3">

      <!-- Content -->
      <h5 class="text-uppercase">Upload your menu</h5>
      <p>To get started, sign up to WhatsAMenu at <a href="https://portal.whatsamenu.co.za">portal.whatsamenu.co.za</a>, or contact us.
        It's as easy as that</p>

    </div>
    <!-- Grid column -->

    <hr class="clearfix w-100 d-md-none pb-3">

    <!-- Grid column -->
    <div class="col-md-6 mb-md-0 mb-3">

      <!-- Links -->
      <h5 class="text-uppercase">Contact Us</h5>

      <ul class="list-unstyled">
        <li>
          <a href="#!">mars@wiredmartians.co.za</a>
        </li>
        <li>
          <a href="#!">+27 71 786 2455</a>
        </li>
      </ul>

    </div>
    <!-- Grid column -->

  </div>
  <!-- Grid row -->

</div>
<!-- Footer Links -->

<!-- Copyright -->
<div class="footer-copyright text-center py-3">© 2021 - {{year}} Copyright:
  <a href="/"> whatsamenu.co.za</a>
</div>
<!-- Copyright -->

</footer>
<!-- Footer -->
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
