<template>
  <div>
    <iframe
        height="300"
        width="100%"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        :src="`https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&amp;output=embed`"
    >
    </iframe>
    <br/>
    <small>
      <a
          href="https://maps.google.com/maps?q='+data.lat+','+data.lon+'&hl=en;z=14&amp;output=embed"
          style="color:#4b4b4b;text-align:left"
          target="_blank"
      >
        See map bigger
      </a>
    </small>
  </div>
</template>

<script lang="ts">
export default {
  name: "LocationMap",
  props: {
    latitude: {
      type: Number, required: true
    },
    longitude: {
      type: Number, required: true
    }
  }
}
</script>

<style scoped>

</style>
