<template>
    <div class="create-api-key">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
                <div class="col-md-6 col-sm-12">
                    <div class="mt-5 mb-5 d-block text-center">
                        <h1 class="font-weight-bolder">Get API Key</h1>
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
                            <input v-model="apiKeyName" name="apiKeyName" type="text" class="form-control"
                                placeholder="API Key Name (Optional)" />
                        </div>
                        <div class="col-md-12">
                            <div class="text-center">
                                <p class="p-2">{{ plainTextKey }}</p>
                                <button v-on:click="createApiKey" v-if="!loading" type="submit"
                                    class="btn btn-dark text-uppercase w-50 mt-2 mb-2">
                                    Create Key
                                </button>
                                <spinner v-else />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- List API Keys -->
            <div class="row justify-content-md-center pt-4">
                <div class="col-md-6 col-sm-12">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Alias</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="key of listApiKeys" :key="key.keyAlias">
                                <th scope="row">{{ key.keyAlias }}</th>
                                <td>{{ key.name }}</td>
                                <td>{{ key.status }}</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-dark btn-sm">Edit</button>
                                        <button type="button" class="btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- End List API Keys -->
        </div>
    </div>
</template>

<script lang="ts">
import { apiAdapter } from "@/api/adapter"
import { APIKey } from "@/types"
import Vue from "vue"

export default Vue.extend({
    components: {
        spinner: () => import("@/components/ui/Spinner.vue")
    },
    data() {
        return {
            serverError: "",
            loading: false,
            apiKeyName: "",
            plainTextKey: "",
            listApiKeys: [] as APIKey[]

        }
    },
    mounted() {
        this.getApiKeys()
    },
    methods: {
        async createApiKey() {
            try {
                this.loading = true
                const response = await apiAdapter.post(
                    "/auth/api-keys",
                    { name: this.apiKeyName }
                )
                if (response.status === 200) {
                    this.plainTextKey = response.data.apiKey
                    // refresh list
                    this.getApiKeys()
                }
                this.loading = false
            } catch (err) {
                console.log(err)
                this.loading = false
            }
        },
        async getApiKeys() {
            try {
                const response = await apiAdapter.get<APIKey[]>(
                    "/auth/api-keys",
                )
                if (response.status === 200) {
                    this.listApiKeys = response.data
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
})
</script>
