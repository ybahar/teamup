<template>
  <section class="filter-container">
    <h1>Explore events</h1>
    <div class="search-container flex column">
      <h5>What kind:</h5>
      <input class="search-filter-input" v-model="filterBy.txt" type="text" placeholder="Anything" />
      <button class="search-eventeras" @click="emitSearch">Explore</button>
    </div>
    <h3 class="headline-divider">or</h3>
    <h1>Build your own</h1>
    <div class="build-container flex column">
      <h5>Name it:</h5>
      <input class="search-filter-input" type="text" placeholder="Its changable" />
      <button class="build-eventeras">Build</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: ""
      }
    };
  },
  methods: {
    emitSearch() {
      if (!this.filterBy.txt) return
      this.$emit("searchEventeras", this.filterBy);
    }
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraQuickstart.scss">
</style>




