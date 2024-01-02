<template>
    <div class="user-login">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
                <div class="col-md-6 col-sm-12">
                    <div class="mt-5 mb-5 d-block text-center">
                        <h1 class="font-weight-bolder">{{ title }}</h1>
                        <p class="lead">
                            To get started with Whatsamenu, sign in to create
                            your keys. Don't have an account? Click
                            <RouterLink to="/get-started" class="text-primary font-weight-bold">Let's get started
                            </RouterLink>
                        </p>
                    </div>
                    <p v-if="serverError" class="alert alert-danger">
                        {{ serverError }}
                    </p>
                    <form @submit.prevent="signIn" :model="model" novalidate="true">
                        <div class="form-group">
                            <label for="emailAddress">Email address</label>
                            <input v-model="model.email" type="email" class="form-control" id="emailAddress"
                                placeholder="hello@example.com" autocomplete="off" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="model.password" type="password" class="form-control" id="password"
                                placeholder="Password" autocomplete="off" />
                        </div>
                        <div class="text-center">
                            <button v-if="!loading" type="submit" class="btn btn-dark mt-4 text-uppercase w-50">
                                Sign In
                            </button>
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
import { handleHttpError } from "@/helpers/helper"
import Vue from "vue"

export default Vue.extend({
    components: {
        spinner: () => import("@/components/ui/Spinner.vue")
    },
    data() {
        return {
            errors: {} as Record<string, string>,
            serverError: "",
            loading: false,
            title: "Let's sign you in",
            model: {
                email: this.$route.query["email"] ?? "",
                password: ""
            }
        }
    },
    methods: {
        async signIn() {
            try {
                if (!this.model.email || !this.model.password) return
                this.loading = true
                sessionStorage.removeItem("AUTH_TOKEN")
                const response = await apiAdapter.post(
                    "/auth/sign-in",
                    this.model
                )
                sessionStorage.setItem("AUTH_TOKEN", response.data.token)
                this.$router.push({ name: "api-keys" })
            } catch (e: any) {
                const response = handleHttpError(e)
                if (response) {
                    this.serverError = response.error
                } else {
                    this.serverError = "Unknown error has occurred, please try again"
                }

            }
            this.loading = false
        }
    }
})
</script>
