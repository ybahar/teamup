<template>
  <section>
    <eventera-header></eventera-header>
    <eventera-list
      :eventeraByCategory="eventerasByCategory"
      v-for="eventerasByCategory in eventerasByCategories"
      :key="eventerasByCategory.category"
    />
  </section>
</template>

<script>
import eventeraList from "@/components/EventeraList";
import eventeraHeader from "@/components/EventeraHeader";

export default {
  name: "EventeraApp",
  created() {
    this.$store.dispatch({ type: "loadEventeras" });
  },
  computed: {
    eventerasByCategories() {
      return this.$store.getters.eventerasByCategories;
    }
  },
  components: {
    eventeraList,
    eventeraHeader
  }
};
</script>

<style scoped>

</style>

