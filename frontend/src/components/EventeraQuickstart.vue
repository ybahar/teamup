<template>
  <section class="filter-container">
    <h1>Explore events</h1>
    <div class="search-container flex row space-between">
      <input class="search-filter-input" v-model="filterBy.txt" type="text" placeholder="Try: Fireworks display" />
      <button class="search-eventeras" @click="emitSearch">Explore</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: ""
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




