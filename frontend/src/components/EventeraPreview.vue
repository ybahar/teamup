<template>
  <router-link tag="div" :to="detailsUrl">
    <section class="eventera-preview flex column">
      <img :src="eventera.imgUrls[0]" alt width="250px" height="170px"/>
      <div class="secondary">
        <span>{{eventera.categories[0] | capitalize }}</span>&nbsp
        <span v-if="distance">{{ distance | meterToKM }}</span>
      </div>
      <h2>{{eventera.name}}</h2>
      <div class="secondary">
        <div>{{ eventera.expireAt | timeAgo }}</div>
        <div>{{ spacesRemain }}</div>
      </div>
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
      if (
        !this.$store.getters.loggedUser ||
        !this.$store.getters.loggedUser.loc
      ) {
        return "";
      }
      const { loc } = this.$store.getters.loggedUser;
      const { geo } = loc;
      const eventeraGeo = this.eventera.loc.geo;
      if (!eventeraGeo) return "";
      return getDistance(eventeraGeo, geo);
    },
    spacesRemain() {
      const spacesRemain =
        this.eventera.maxMembers - this.eventera.members.length;
      if (!spacesRemain) return "No spaces remain";
      return `${spacesRemain} Spaces remain`;
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraPreview.scss">
</style>
