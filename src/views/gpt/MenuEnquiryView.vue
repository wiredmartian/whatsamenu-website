<template>
    <enquire-menu/>
</template>
  
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    components: {
        enquireMenu: () => import("@/components/gpt/MenuEnqure.vue"),
    },
})
</script>
 
  