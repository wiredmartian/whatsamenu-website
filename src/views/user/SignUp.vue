<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-sm-12">
        <div class="mt-5 mb-5 d-block text-center">
          <h2 class="font-weight-bolder">Sign Up</h2>
        </div>
        <form @submit.prevent="signIn" :model="model">
          <div class="form-group">
            <label for="emailAddress">Email address</label>
            <input v-model="model.email" type="email" class="form-control" id="emailAddress"
                   placeholder="hello@example.com">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="model.password" type="password" class="form-control" id="password"
                   placeholder="Password">
          </div>
          <button type="submit" class="btn btn-block btn-dark">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {SignUpUserRequest} from "@/types/types";
import Vue from "vue";
import {apiAdapter} from "@/api/adapter";

export default Vue.extend({
  name: "SignUp",
  data() {
    return {
      model: {} as SignUpUserRequest
    }
  },
  methods: {
    async signIn() {
      try {
        const response = await apiAdapter.putOrPost<SignUpUserRequest, { data: string }>("/user/sign-up", "POST", this.model)
        if (response.status === 200) {
          console.log(response.data)
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
