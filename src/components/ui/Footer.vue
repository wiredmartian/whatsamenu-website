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
                            <a
                                href="https://dev.wiredmartians.com"
                                target="_blank"
                                >dev.wiredmartians.com</a
                            >
                            / solomzi.jikani@gmail.com
                        </li>
                    </ul>
                </div>

                <div class="col-md-6">
                    <!-- Links -->
                    <h5 class="text-uppercase text-center">For Developers</h5>

                    <ul class="list-unstyled text-center">
                        <li>
                            <routerLink to="/get-started"
                                >Get Started</routerLink
                            >
                            /
                            <a
                                href="https://github.com/wiredmartian/whatsamenu-api-doc"
                                target="_blank"
                                >API Docs</a
                            >
                        </li>
                    </ul>
                </div>

                <!-- Grid column -->
            </div>
            <!-- Grid row -->
        </div>
        <!-- Footer Links -->
        <hr class="clearfix w-100" />
        <!-- Copyright -->
        <div class="footer-copyright text-center py-3">
            © {{ year }} copyright: <a href="/"> whatsamenu.co.za</a> // v0.0.1
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
