<template>
    <div class="create-api-key">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
                <div class="col-md-6 col-sm-12">
                    <div class="mt-5 mb-5 d-block text-center">
                        <h1 class="font-weight-bolder">Get API Key</h1>
                        <p class="lead">You can now create your own API key</p>
                    </div>
                    <p v-if="errorMessage" class="alert alert-danger">
                        {{ errorMessage }}
                    </p>
                    <div v-if="infoMessage" class="alert alert-info alert-dismissible">
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        {{ infoMessage }}
                    </div>
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
                                        <button type="button" class="btn btn-danger btn-sm" data-toggle="modal"
                                            data-target="#deleteApiKeyConfirm"
                                            v-on:click="setSelectedKey(key)">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- End List API Keys -->

            <!-- Confirm Delete Modal -->

            <div class="modal fade" id="deleteApiKeyConfirm" tabindex="-1" aria-labelledby="deleteApiKeyConfirm"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Confirm API Key deletion</h5>
                            <button type="button" ref="deleteApiKeyModal" class="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete API key "{{ selectedKey.name }}"? <br />
                            <small>
                                <code>Key Alias: {{ selectedKey.keyAlias }}</code>
                            </small>
                        </div>
                        <div class="modal-footer">
                            <button :disabled="deleting" type="button" class="btn btn-secondary"
                                data-dismiss="modal">Cancel</button>
                            <spinner v-if="deleting" />
                            <button v-else type="button" class="btn btn-danger"
                                v-on:click="deleteApiKey(selectedKey.keyAlias)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End Confirm Delete Modal -->

        </div>
    </div>
</template>

<script lang="ts">
import { apiAdapter } from "@/api/adapter"
import { handleHttpError } from "@/helpers/helper"
import { APIKey } from "@/types"
import Vue from "vue"

export default Vue.extend({
    components: {
        spinner: () => import("@/components/ui/Spinner.vue")
    },
    data() {
        return {
            errorMessage: "",
            infoMessage: "",
            loading: false,
            deleting: false,
            apiKeyName: "",
            plainTextKey: "",
            listApiKeys: [] as APIKey[],
            selectedKey: {} as APIKey
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
                this.plainTextKey = response.data.apiKey
                // refresh list
                this.getApiKeys()
            } catch (err) {
                const responseErr = handleHttpError(err)
                if (responseErr) {
                    this.errorMessage = responseErr.error
                } else {
                    console.error(err)
                    this.errorMessage = "Unknown error has occurred, please try again later"
                }
            }
            this.loading = false
        },
        async getApiKeys() {
            try {
                const response = await apiAdapter.get<APIKey[]>(
                    "/auth/api-keys",
                )
                this.listApiKeys = response.data
            } catch (err) {
                console.error(err)
            }
        },
        async deleteApiKey(keyAlias: string) {
            try {
                this.deleting = true
                const response = await apiAdapter.delete<{ message: string }>(
                    `/auth/api-keys/${keyAlias}`,
                )
                this.infoMessage = response.data.message
                this.getApiKeys()
                    ; (this.$refs?.deleteApiKeyModal as HTMLElement)?.click() // close modal
            } catch (err) {
                const responseErr = handleHttpError(err)
                if (responseErr) {
                    this.errorMessage = responseErr.error
                } else {
                    console.error(err)
                    this.errorMessage = "Unknown error has occurred, please try again later"
                }
            }
            this.deleting = false
        },

        // State functions
        setSelectedKey(key: APIKey) {
            this.selectedKey = key
        }
    }
})
</script>
