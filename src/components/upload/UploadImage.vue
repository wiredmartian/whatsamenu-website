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
          <div
            class="col-sm-12 col-lg-4"
            v-for="(item, i) in selectedFiles"
            :key="i"
          >
            <div class="card mt-4">
              <div class="card-img">
                <img :src="item" class="img-fluid" alt=""/>
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
import { apiAdapter } from "@/api/adapter";
import vue from "vue";
export default vue.extend({
    name: "UploadImage",
  components: { spinner: () => import("@/components/ui/Spinner.vue") },
  props: {
    enityType: {
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
      selectedFiles: [] as string[],
      uploadFiles: []
    };
  },
  methods: {
    async uploadImage() {
      try {
        this.isLoading = true;
        const id = this.$route.params.id;
        const fd = new FormData();
        fd.append("entityType", this.enityType);
        fd.append("entityId", this.entityId)
        for (let f = 0; f < this.uploadFiles.length; f++) {
          fd.append("fileData", this.uploadFiles[f]);
        }
        const response = await apiAdapter.putOrPost<FormData, {data: string}>(`/upload`, "PUT", fd);
        console.log(response.data)
        if (response.data) {
          await this.$router.push(`/product/${id}`);
        }
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
        const files = event.target.files;
        this.uploadFiles = files;
        for (let f = 0; f < files.length; f++) {
          this.selectedFiles.push(window.URL.createObjectURL(files[f]));
        }
      }
    }
  }
});
</script>

<style scoped></style>