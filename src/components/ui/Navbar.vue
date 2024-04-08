<template>
    <div class="container-fluid bg-dark pl-0 pr-0 fixed-top">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <router-link class="navbar-brand" to="/">
                <img
                    src="../../../public/images/wm-logo-white.png"
                    alt="whatsamenu logo"
                    class="d-inline-block wm-logo"
                />
                WhatsAMenu
            </router-link>
        </nav>
    </div>
</template>

<script lang="ts">
export default {
    name: "AppNavbar"
}
</script>

<style scoped>
img.wm-logo {
    margin-right: 10px;
    width: 20px;
    height: auto;
    vertical-align: text-bottom;
}
</style>
