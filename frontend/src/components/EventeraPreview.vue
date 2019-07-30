<template>
  <router-link tag="div" :to="detailsUrl">
    <section class="eventera-preview flex column space-around">
      <img class="prev-image" :src="eventera.imgUrls[0] | imgSrc" alt width="350px" height="240px" />
      <div class="secondary">
        <span>{{eventera.categories[0] | capitalize }}</span>
        <span v-if="distance">{{ distance | meterToKM }}</span>
      </div>
      <h2>{{eventera.name}}</h2>
      <div class="secondary">
        <div>{{ eventera.expireAt | timeAgo }}</div>
        <div>{{ spacesRemain }}</div>
      </div>
      <div class="carousel" @click.stop>
        <carousel
          :per-page="4"
          :mouse-drag="true"
          :autoplay="false"
          :loop="false"
          :paginationEnabled="false"
          :speed="8000"
        >
          <slide
            data-name="1"
            v-for="user in eventera.members"
            :key="user._id"
            class="carousel-slide"
          >
            <img v-if="user.profileImgUrl" class="user-img-carousel" :src="user.profileImgUrl | imgSrc" />
          </slide>
        </carousel>
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
      let res = `${spacesRemain} Spaces Remain`; // Default
      if (!spacesRemain) res = `No spaces remain`;
      if (spacesRemain === 1) res = "Last spot remaining";
      
      return `${res} (out of ${this.eventera.maxMembers})`;
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraPreview.scss">
</style>
