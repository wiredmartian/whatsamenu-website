<template>
    <div class="container h-100 header pl-4 pr-4">
        <div class="row align-items-center h-100">
            <div class="col-md-4">
                <div class="d-block">
                    <h1 class="font-weight-700">What's A Menu</h1>
                    <!-- vertically align text -->
                    <p class="lead align-self-center">
                        Get more from your Qr code menu with WhatsAMenu ("Whats a menu").
                        Provide a clear and concise menu to your customers for <b class="font-weight-bolder">FREE</b>.
                    </p>
                    <!-- Button group -->
                    <div class="btn-group mr-2" role="group">
                        <a href="https://dashboard.whatsamenu.co.za" target="_blank"
                            class="btn btn-lg btn-dark btn-rounded px-5">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <img src="../../../public/images//header-1.png" alt="whats a menu food header"
                    class="d-inline-block img-fluid" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "AppHeader",
    data() {
        return {
            year: new Date(Date.now()).getFullYear(),
            version: process.env.VUE_APP_VERSION
        }
    }
}
</script>

<style scoped>
.header {
    padding: 50px 0;
}

.header h1 {
    font-weight: 700;
    font-size: 5.5rem;
}
</style>