<template>
    <!-- Footer -->
    <footer class="bg-light font-small pt-4 bg-dark">
        <div class="container text-center text-md-left">
            <div class="row">
                <div class="col-md-4">
                    <h5 class="text-uppercase text-center">Contact Us</h5>
                    <ul class="list-unstyled text-center">
                        <li>
                            <a href="https://dev.wiredmartians.com" target="_blank">dev.wiredmartians.com</a>
                            / <a href="mailto:solomzi@whatsamenu.co.za">solomzi@whatsamenu.co.za</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4">
                    <h5 class="text-uppercase text-center">Add Your Restaurant</h5>
                    <ul class="list-unstyled text-center">
                        <li>
                            <a target="_blank" href="https://dashboard.whatsamenu.co.za">WhatsAMenu Dashboard</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4">
                    <h5 class="text-uppercase text-center">For Developers</h5>
                    <ul class="list-unstyled text-center">
                        <li>
                            <a href="https://dashboard.whatsamenu.co.za" target="_blank">Get Started</a>
                            /
                            <a href="https://github.com/wiredmartian/whatsamenu-api-doc" target="_blank">API Docs</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Footer Links -->
        <hr class="clearfix w-100" />
        <!-- Copyright -->
        <div class="footer-copyright text-center py-3">
            <routerLink to="/privacy-policy">Privacy Policy </routerLink> // © {{ year }} copyright: <a href="/">
                whatsamenu.co.za</a> //
            version-{{ version }} <br />
            <a href="https://www.instagram.com/whatsamenu/" target="_blank">
                <i class="bi bi-instagram fa-2x"></i>
            </a>
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
            year: new Date(Date.now()).getFullYear(),
            version: process.env.VUE_APP_VERSION
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
