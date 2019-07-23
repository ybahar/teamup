<template>
  <section class="landing-container">
    <section class="home-container flex">
      <div class="bg-container"></div>
      <EventeraQuickstart @searchEventeras="searchEventeras" />
    </section>
    <h1 class="list-header-home">Categories:</h1>
    <Eventera-list
      :eventeraByCategory="eventerasByCategory"
      v-for="eventerasByCategory in eventerasByCategories"
      :key="eventerasByCategory.category"
    />

    <!-- <a
      href="https://www.facebook.com/sharer/sharer.php?u=https://eventera.herokuapp.com/"
      title="Share on Facebook"
      target="_blank"
    >
      <img alt="Share on Facebook" src="../imgs/social img/Facebook.png" />
    </a> -->
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


