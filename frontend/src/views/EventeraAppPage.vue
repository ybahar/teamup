<template>
  <section>
    <eventera-filter></eventera-filter>
      <eventera-list
        :eventeraByCategory="eventerasByCategory"
        v-for="eventerasByCategory in eventerasByCategories"
        :key="eventerasByCategory.category"
      />
  </section>
</template>

<script>
import eventeraList from "@/components/EventeraList";
import eventeraFilter from '@/components/EventeraFilter.vue';

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
    eventeraFilter,
  }
};
</script>

<style scoped>

</style>

