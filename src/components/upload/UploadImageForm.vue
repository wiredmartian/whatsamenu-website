<template>
  <form>
    <p v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</p>
    <label class="btn btn-light mt-2"
    >Select Image
      <input
          hidden
          type="file"
          name="fileData"
          id="fileData"
          @change="displayImages($event)"
      />
    </label>
    <div class="row mb-4">
      <div v-if="selectedFile" class="col-sm-12">
        <div class="card mt-2">
          <div class="card-img">
            <img :src="selectedFile" class="img-fluid" alt=""/>
          </div>
        </div>
      </div>
    </div>
    <spinner v-if="isLoading"/>
    <button
        @click="uploadImage"
        v-else
        type="submit"
        class="btn btn-block btn-dark"
    >
      Upload
    </button>
  </form>
</template>

<script lang="ts">
import {apiAdapter} from "@/api/adapter";
import vue from "vue";

export default vue.extend({
  name: "UploadImage",
  components: {spinner: () => import("@/components/ui/Spinner.vue")},
  props: {
    entityType: {
      type: String,
      required: true
    },
    entityId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      selectedFile: "",
      uploadFile: null as any
    };
  },
  methods: {
    async uploadImage() {
      try {
        this.isLoading = true;
        const fd = new FormData();
        console.log(this.$props)
        fd.append("entityType", this.entityType);
        fd.append("entityId", this.entityId)
        fd.append("fileData", this.uploadFile);
        const response = await apiAdapter.putOrPost<FormData, { data: string }>(`/upload`, "PUT", fd);
        console.log(response.data)
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        if ((e as any).response.data.message) {
          this.errorMessage = (e as any).response.data.message;
        } else {
          this.errorMessage = (e as any).message;
        }
      }
    },
    displayImages(event: any) {
      if (event.target.files != null && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.uploadFile = file;
        this.selectedFile = window.URL.createObjectURL(file)
      }
    }
  }
});
</script>

<style scoped></style>