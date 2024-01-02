<template>
    <div class="get-started">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
                <div class="col-md-6 col-sm-12">
                    <div class="mt-5 mb-5 d-block text-center">
                        <h1 class="font-weight-bolder">{{ title }}</h1>
                        <p class="lead">
                            To get started with Whatsamenu, you will need an API
                            key for authentication. Already have an account?
                            Click
                            <RouterLink
                                to="/login"
                                class="text-primary font-weight-bold"
                                >Login</RouterLink
                            >
                        </p>
                    </div>
                    <p v-if="serverError" class="alert alert-danger">
                        {{ serverError }}
                    </p>
                    <form
                        @submit.prevent="signUp"
                        :model="model"
                        novalidate="true"
                        v-on:blur="_validateForm"
                    >
                        <div class="form-group">
                            <label for="emailAddress">Email address</label>
                            <input
                                v-on:blur="_validateForm"
                                v-model="model.email"
                                type="email"
                                class="form-control"
                                id="emailAddress"
                                placeholder="hello@example.com"
                                required
                                autocomplete="off"
                            />
                            <small class="text-danger">{{
                                errors?.email
                            }}</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                v-on:blur="_validateForm"
                                v-model="model.password"
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Password"
                                required
                                autocomplete="off"
                            />
                            <small class="text-danger">{{
                                errors?.password
                            }}</small>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword"
                                >Confirm Password</label
                            >
                            <input
                                v-on:blur="_validateForm"
                                v-model="model.confirmPassword"
                                type="password"
                                class="form-control"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                autocomplete="off"
                            />
                            <small class="text-danger">{{
                                errors?.confirmPassword
                            }}</small>
                        </div>
                        <div class="text-center">
                            <button
                                v-if="!loading"
                                type="submit"
                                class="btn btn-dark mt-4 text-uppercase w-50"
                            >
                                Sign Up Now
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
import { SignUpUserRequest } from "@/types/types"
import Vue from "vue"
import { RouterLink } from "vue-router"

export default Vue.extend({
    components: {
        spinner: () => import("@/components/ui/Spinner.vue"),
        RouterLink
    },
    data() {
        return {
            errors: {} as Record<string, string>,
            serverError: "",
            loading: false,
            title: "Let's get started",
            model: {
                email: "",
                password: "",
                confirmPassword: ""
            } as SignUpUserRequest
        }
    },
    methods: {
        async signUp() {
            this._validateForm()
            if (Object.keys(this.errors).length > 0) {
                return
            }
            try {
                this.loading = true
                localStorage.removeItem("wm_auth_token")
                const response = await apiAdapter.post(
                    "/auth/sign-up",
                    this.model
                )
                this.loading = false
                if (response.status === 201) {
                    this.$router.push(`/login?email=${this.model.email}`)
                } else if (response.status === 400) {
                    this.serverError = `ERROR: ${response.data.error}`
                }
            } catch (e: any) {
                this.loading = false
                this.serverError = `ERROR: ${
                    e?.response?.data?.error ??
                    "Unknow error has occurred, please try again later"
                }`
            }
        },
        _validateForm() {
            this.errors = {}
            if (!this._validEmail(this.model.email)) {
                this.errors["email"] = "Email address is invalid"
            }
            if (!this._meetsPasswordPolicy(this.model.password)) {
                this.errors["password"] = "Password is too weak"
            }
            if (this.model.password !== this.model.confirmPassword) {
                this.errors["confirmPassword"] = "Passwords do not match"
            }
            if (!this.model.confirmPassword) {
                this.errors["confirmPassword"] = "Confirm password is required"
            }
            if (!this.model.password) {
                this.errors["password"] = "Password is required"
            }
            if (!this.model.email) {
                this.errors["email"] = "Email address is required"
            }
        },
        _validEmail: (email: string) => {
            var regex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(email)
        },
        _meetsPasswordPolicy: (password: string) => {
            const regex =
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{8,100}$/
            return regex.test(password)
        }
    }
})
</script>
