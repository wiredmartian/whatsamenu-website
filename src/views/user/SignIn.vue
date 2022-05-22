<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-sm-12">
        <div class="mt-5 mb-5 d-block text-center">
          <h2 class="font-weight-bolder">Sign In</h2>
        </div>
        <form @submit.prevent="signIn" :model="model">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="model.email" type="email" class="form-control" id="exampleInputEmail1"
                   aria-describedby="emailHelp"
                   placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="model.password" type="password" class="form-control" id="exampleInputPassword1"
                   placeholder="Password">
          </div>
          <button type="submit" class="btn btn-block btn-dark">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {SignInUserRequest} from "@/types/types";
import Vue from "vue";
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  name: "SignIn",
  data() {
    return {
      model: {} as SignInUserRequest
    }
  },
  methods: {
    async signIn() {
      try {
        const response = await apiAdapter.putOrPost<SignInUserRequest, { token: string }>("/user/sign-in", "POST", this.model)
        if (response.status === 200 && response.data) {
          sessionStorage.setItem("menu_access_token", response.data.token)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style scoped>

</style>
