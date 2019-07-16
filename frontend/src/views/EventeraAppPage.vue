<template>
  <section>
      <eventera-list
        :eventeraByCategory="eventerasByCategory"
        v-for="eventerasByCategory in eventerasByCategories"
        :key="eventerasByCategory.category"
      />
  </section>
</template>

<script>
import eventeraList from "@/components/EventeraList";

export default {
  name: "EventeraApp",
  created() {
    // loading Eventeras at Homepage for producing the top 6
    // this.$store.dispatch({ type: "loadEventeras" });
  },
  computed: {
    eventerasByCategories() {
      return this.$store.getters.eventerasByCategories;
    }
  },
  components: {
    eventeraList,
  }
};
</script>

<style scoped>

</style>

