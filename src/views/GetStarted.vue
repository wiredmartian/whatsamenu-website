<template>
    <div class="get-started">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
                <div class="col-md-6 col-sm-12">
                    <div class="mt-5 mb-5 d-block text-center">
                        <h1 class="font-weight-bolder">{{ title }}</h1>
                        <p class="lead">To get started with Whatsamenu, you will need an API Key to authenticate again our API</p>
                    </div>
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error, i in errors" :key="i">{{ error }}</li>
                        </ul>
                    </p>
                    <form @submit.prevent="signUp" :model="model" novalidate="true">
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
                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input v-model="model.confirmPassword" type="password" class="form-control" id="confirmPassword"
                                placeholder="Confirm Password" autocomplete="off">
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-dark mt-4 text-uppercase w-50">Sign Up Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { apiAdapter } from '@/api/adapter'
import { SignUpUserRequest } from '@/types/types'
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            errors: [] as string[],
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
            this.errors = []
            try {
                const response = await apiAdapter.putOrPost<SignUpUserRequest, { data: string }>("/auth/sign-up", "POST", this.model)
                if (response.status === 200) {
                    console.log(response.data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        _validEmail: function (email: string) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        }
    }
})
</script>