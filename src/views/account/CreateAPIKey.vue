<template>
    <div class="create-api-key">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
                <div class="col-md-6 col-sm-12">
                    <div class="mt-5 mb-5 d-block text-center">
                        <h1 class="font-weight-bolder">{{ title }}</h1>
                        <p class="lead">You can now create your own API key</p>
                    </div>
                    <p v-if="serverError" class="alert alert-danger">
                        {{ serverError }}
                    </p>
                    <div class="row">
                        <div class="col-sm-12">
                            <p class="alert alert-info col-md-12">
                                - You will only see your API Key once, please
                                make sure you copy it.
                            </p>
                        </div>
                        <div class="col-md-12">
                            <input v-model="apiKey" type="text" class="form-control" disabled />
                        </div>
                        <div class="col-md-12">
                            <div class="text-center">
                                <button v-on:click="createApiKey" v-if="!loading" type="submit"
                                    class="btn btn-dark text-uppercase w-50 mt-4">
                                    Create Key
                                </button>
                                <spinner v-else />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { apiAdapter } from "@/api/adapter"
import Vue from "vue"

export default Vue.extend({
    components: {
        spinner: () => import("@/components/ui/Spinner.vue")
    },
    data() {
        return {
            title: "Get API Key",
            serverError: "",
            loading: false,
            apiKey: ""
        }
    },
    methods: {
        async createApiKey() {
            try {
                this.loading = true
                const response = await apiAdapter.putOrPost(
                    "/auth/api-keys",
                    "POST",
                    {}
                )
                if (response.status === 200) {
                    this.apiKey = response.data.apiKey
                }
                this.loading = false
            } catch (err) {
                console.log(err)
                this.loading = false
            }
        }
    }
})
</script>
