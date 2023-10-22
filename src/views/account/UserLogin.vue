<template>
    <div class="user-login">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
                <div class="col-md-6 col-sm-12">
                    <div class="mt-5 mb-5 d-block text-center">
                        <h1 class="font-weight-bolder">{{ title }}</h1>
                        <p class="lead">To get started with Whatsamenu, sign in to create your keys</p>
                    </div>
                    <p v-if="serverError" class="alert alert-danger">{{ serverError }}</p>
                    <form @submit.prevent="signIn" :model="model" novalidate="true">
                        <div class="form-group">
                            <label for="emailAddress">Email address</label>
                            <input v-model="model.email" type="email" class="form-control" id="emailAddress"
                                placeholder="hello@example.com" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="model.password" type="password" class="form-control" id="password"
                                placeholder="Password" autocomplete="off">
                        </div>
                        <div class="text-center">
                            <button v-if="!loading" type="submit" class="btn btn-dark mt-4 text-uppercase w-50">Sign In</button>
                            <spinner v-else />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { apiAdapter } from "@/api/adapter"
import { Cookie } from "@/api/cookie"
import Vue from "vue"

export default Vue.extend({
    components: {
        "spinner": () => import("@/components/ui/Spinner.vue")
    },
    data() {
        return {
            errors: {} as Record<string, string>,
            serverError: "",
            loading: false,
            title: "Let's sign you in",
            model: {
                email: this.$route.query["email"] ?? "",
                password: "",
            }
        }
    },
    methods: {
        async signIn() {
            try {
                this.loading = true
                const response = await apiAdapter.putOrPost("/auth/sign-in", "POST", this.model)
                this.loading = false
                if (response.status === 200) {
                    Cookie.set("auth_token", response.data.token, 1)
                    this.$router.push({name: "api-keys"})
                } else if (response.status === 401) {
                    this.serverError = response.data.error
                }
            } catch (e: any) {
                this.loading = false
                this.serverError = `ERROR: ${e?.response?.data?.error ?? "Unknow error has occurred, please try again later"}`
            }
        },
    }
})
</script>

