<template>
  <section class="filter-container flex space-around column">
    <h1>Unique events and people to be explored</h1>
      <input @keydown.enter="emitSearch" class="search-filter-input" v-model="filterBy.txt" type="text" placeholder="Try: Fireworks display" />
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
    }
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraQuickstart.scss">
</style>




