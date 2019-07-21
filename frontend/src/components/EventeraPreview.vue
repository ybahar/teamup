<template>
  <router-link tag="div" :to="detailsUrl">
    <section class="eventera-preview flex column">
      <img :src="eventera.imgUrls[0]" alt />
      <div class="secondary">
        <span>{{eventera.categories[0] | capitalize }}</span>&nbsp
        <span v-if="distance">{{ distance | meterToKM }}</span>
      </div>
      <h2>{{eventera.name}}</h2>
    </section>
  </router-link>
</template>

<script>
import { getDistance } from "geolib";
export default {
  props: {
    eventera: Object
  },
  computed: {
    detailsUrl() {
      return `/eventera/${this.eventera._id}`;
    },
    distance() {
      if(!this.$store.getters.loggedUser || !this.$store.getters.loggedUser.loc){
        return ''
      }
      const {loc} = this.$store.getters.loggedUser
      const {geo} = loc;
        const eventeraGeo = this.eventera.loc.geo;
        if (!eventeraGeo) return "";
        return getDistance(eventeraGeo, geo);
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraPreview.scss">
</style>
