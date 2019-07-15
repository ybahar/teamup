<template>
  <section class="eventera-preview">
    <div>
      <h2>{{eventera.name}}</h2>
      <p>
        <span>{{ eventera.expireAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
      </p>
      <p>{{eventera.loc.address}},{{eventera.loc.city}}</p>
      <router-link :to="detailsUrl">Details</router-link>
    </div>
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
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraPreview.scss">
</style>
