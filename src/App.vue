<template>
    <div id="app">
        <app-navbar />
        <div class="mb-5 mt-5">
            <router-view />
        </div>
        <app-footer />
    </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    components: {
        AppFooter: () => import("@/components/ui/Footer.vue"),
        AppNavbar: () => import("@/components/ui/Navbar.vue")
    },
    name: "App"
})
</script>

<style>
html {
    scroll-behavior: smooth;
}

#app {
    font-family: "Ubuntu Condensed", sans-serif;
    font-weight: 300 !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 300;
}

a,
a:hover {
    color: #2c3e50;
    text-decoration: none;
}

/* Some hacky theming for now **/
.bg-dark {
    background-color: #292929 !important;
}

.btn-dark {
    background-color: #292929 !important;
    border-color: #292929 !important;
    color: #ffffff;
}

.btn-dark:hover {
    background-color: #151515 !important;
    border-color: #151515 !important;
    color: #ffffff;
}

.btn-rounded {
    border-radius: 2.5rem !important;
}

.font-weight-bolder {
    font-weight: 500 !important;
}
</style>
