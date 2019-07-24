<template>
  <section class="landing-container">
    <section class="home-container flex">
      <div class="bg-container"></div>
      <EventeraQuickstart @searchEventeras="searchEventeras" />
    </section>
    <h1 class="list-header-home">Find your event:</h1>
    <Eventera-list
      @showMore="setFilterCategory"
      :eventeraByCategory="eventerasByCategory"
      v-for="eventerasByCategory in eventerasByCategories"
      :key="eventerasByCategory.category"
    />

  </section>
</template>

<script>
import EventeraList from "@/components/EventeraList";
import EventeraPreview from "@/components/EventeraPreview";
import EventeraQuickstart from "../components/EventeraQuickstart";
export default {
  data() {
    return {};
  },
  computed: {
    eventerasByCategories() {
      return this.$store.getters.eventerasByCategories;
    }
  },
  methods: {
    loadEventeras() {
      this.$store.dispatch({ type: "loadEventeras" });
    },
    handleClick(dataset) {
      console.log("inside click on slide:", dataset.name);
    },
    searchEventeras(filterBy) {
      this.$store.dispatch({ type: "setFilter", filterBy });
      this.$router.push("/eventera");
    },
     setFilterCategory(category) {
      this.$store.commit('setFilterCategory', category)
       this.$router.push('/eventera')
    }
  },
  created() {
    this.loadEventeras();
  },
  components: {
    EventeraQuickstart,
    EventeraList,
    EventeraPreview
  }
};
</script>

<style lang="scss" scoped src="../styles/views/_Homepage.scss">
</style>


