<template>
  <section class="filter-container flex space-around column">
    <h1>Find unique events and like-minded people around you</h1>
    <!-- <div class="search-container flex row space-between"> -->
      <input class="search-filter-input" v-model="filterBy.txt" type="text" placeholder="Try: Fireworks display" />
    <!-- </div> -->
      <button class="search-eventeras" @click="emitSearch">Explore</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
            txt: '',
            category: 'General',
            almostFull: false,
            startingAt: 0,
            showClosed: false,
        },
    };
  },  
  methods: {
    emitSearch() {
      if (!this.filterBy.txt) return
      this.$emit("searchEventeras", this.filterBy);
    },
    // emitBuild() {
    //   this.$emit("buildEventera", this.newEventera);
    // }
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraQuickstart.scss">
</style>




