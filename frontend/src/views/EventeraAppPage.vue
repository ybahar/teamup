<template>
<section>
    <eventera-filter></eventera-filter>
  <section v-if="isCategorySelected">
    <eventera-category :eventeras="eventerasForDisplay" :category="selectedCategory"></eventera-category>
    </section>
    <section v-else>
      <eventera-list 
        :eventeraByCategory="eventerasByCategory"
        v-for="eventerasByCategory in eventerasByCategories"
        :key="eventerasByCategory.category"
      />
  </section>
</section>
</template>

<script>
import eventeraList from "@/components/EventeraList";
import eventeraCategory from "@/components/EventeraCategory";
import eventeraFilter from '@/components/EventeraFilter.vue';

export default {
  name: "EventeraApp",
  created() {
    this.$store.dispatch({ type: "loadEventeras" });
  },
  computed: {
    eventerasByCategories() {
      return this.$store.getters.eventerasByCategories;
    },
    selectedCategory(){
       return this.$store.getters.selectedCategory
    },
    isCategorySelected(){
      return (this.selectedCategory !== 'General');
    },
    eventerasForDisplay(){
      return this.$store.getters.eventerasForDisplay;
    }
  },
  components: {
    eventeraList,
    eventeraFilter,
    eventeraCategory
  }
};
</script>

<style scoped>

</style>

