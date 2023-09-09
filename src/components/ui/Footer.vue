<template>
  <!-- Footer -->
  <footer class="bg-light font-small pt-4 bg-dark">

    <!-- Footer Links -->
    <div class="container text-center text-md-left">

      <!-- Grid row -->
      <div class="row">

        <!-- Grid column -->
        <div class="col-md-6">

          <!-- Links -->
          <h5 class="text-uppercase text-center">Contact Us</h5>

          <ul class="list-unstyled text-center">
            <!--            <li>-->
            <!--              <a href="mailto:solomzi.jikani@gmail.com">solomzi.jikani@gmail.com</a>-->
            <!--            </li>-->
            <li>
              <a href="#!"></a>
            </li>
            <li>
              <a href="https://dev.wiredmartians.com" target="_blank">dev.wiredmartians.com</a>
            </li>
          </ul>

        </div>

        <div class="col-md-6">

          <!-- Links -->
          <h5 class="text-uppercase text-center">For Developers</h5>

          <ul class="list-unstyled text-center">
            <li>
              <a href="https://github.com/wiredmartian/whatsamenu-api-doc" target="_blank">API Documentation on Github</a>
            </li>
            <li>
              <div class="postman-run-button" data-postman-action="collection/fork" data-postman-visibility="public"
                data-postman-var-1="7238091-c337fbed-43fc-4a66-870c-3cfbdc1167e2"
                data-postman-collection-url="entityId=7238091-c337fbed-43fc-4a66-870c-3cfbdc1167e2&entityType=collection&workspaceId=f7aedb7c-b2ff-43da-b219-270fbd08a6e3">
              </div>
            </li>
          </ul>

        </div>

        <!-- Grid column -->

      </div>
      <!-- Grid row -->

    </div>
    <!-- Footer Links -->
    <hr class="clearfix w-100">
    <!-- Copyright -->
    <div class="footer-copyright text-center py-3">© {{ year }} copyright:
      <a href="/"> whatsamenu.co.za</a> // v0.1.1
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
footer {
  /*position: sticky;*/
  bottom: 0;
  width: 100%;
  line-height: 40px;
  text-align: center;
  margin-top: auto;
  color: #ffffff;
}

footer hr {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

footer p,
footer a {
  color: #ffffff;
}

footer a:hover {
  text-decoration: underline;
}
</style>
