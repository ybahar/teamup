<template>
  <section class="eventera-preview flex column">
    <img src="@/imgs/dummy-card.png" alt />
    <div class="secondary">
      <span>{{eventera.categories[0] | capitalize }}</span>
      <span v-if="distance">| {{distance}} away</span>
    </div>

    <h2>{{eventera.name}}</h2>
    {{eventera}}
    <!-- <p>
      <span>{{ eventera.expireAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
    </p>
    <p>{{eventera.loc.address}},{{eventera.loc.city}}</p>
    <router-link class="btn" tag="div" :to="detailsUrl">Details</router-link>-->
  </section>
</template>

<script>
export default {
  props: {
    eventera: Object
  },
  computed: {
    detailsUrl() {
      return `/eventera/${this.eventera._id}`;
    },
    distance() {
      const loc = this.$store.getters.loc;
      if (!loc) return "";
      return "0.5 km";
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraPreview.scss">
</style>
