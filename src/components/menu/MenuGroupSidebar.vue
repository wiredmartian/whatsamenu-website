<template>
  <div class="sidebar-section mt-4">
    <div class="sidebar-item sticky-top">
      <div class="sidebar-content">
        <ul class="list-group">
          <li v-for="g of menuGroups" :key="`group-`+g.name"
              class="list-group-item d-flex justify-content-between align-items-start border-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <h5><a :href="`#${g.id}-${g.name.split(' ')[0].toLowerCase()}`">{{ g.name }}</a></h5>
              </div>
            </div>
            <span class="badge badge-light rounded-pill">{{ g.length }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MenuGroupSidebar',
  props: {
    menuGroups: {
      type: Array as () => Array<Record<string, string | number | undefined>>,
      required: true
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #2c3e50;
}
</style>
