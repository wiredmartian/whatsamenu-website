<template>
  <div class="container-fluid pl-0 pr-0 fixed-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">WhatsAMenu</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/sign-in">Sign In</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sign-up">Sign Up</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppNavbar"
}
</script>

<style scoped>

</style>
