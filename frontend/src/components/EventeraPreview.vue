<template>
  <slide>
    <section class="eventera-preview flex column flex-center">
      <h2>{{eventera.name}}</h2>
      <p>
        <span>{{ eventera.expireAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
      </p>
      <p>{{eventera.loc.address}},{{eventera.loc.city}}</p>
      <router-link class="btn" tag="div" :to="detailsUrl">Details</router-link>
    </section>
  </slide>
</template>

<script>
export default {
  props: {
    eventera: Object
  },
  computed: {
    detailsUrl() {
      return `/eventera/${this.eventera._id}`;
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraPreview.scss">
</style>
