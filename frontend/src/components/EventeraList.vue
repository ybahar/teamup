<template>
  <section v-if="eventeraByCategory && !isLoading" class="eventera-list-container max-width">
    <div class="bg-container-list"></div>
    <h1 class="category-header">{{ eventeraByCategory.category | capitalize }}</h1>
    <ul class="eventera-list">
      <eventera-preview
        v-for="eventera in eventeraByCategory.eventeras.slice(0,4)"
        :key="eventera._id"
        :eventera="eventera"
      ></eventera-preview>
    </ul>
    
    <button @click="emitCategory" class="show-more-btn">Show more</button>
  </section>
</template>

<script>
import EventeraPreview from "@/components/EventeraPreview";
export default {
  data() {
    return {
    }
  },
  computed: {
    isLoading(){
      return this.$store.getters.isLoading
    }
  },
  props: {
    eventeraByCategory: Object
  },
  methods: {
    emitCategory() {
      this.$emit('showMore', this.eventeraByCategory.category);
    }
  },
  components: {
    EventeraPreview
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraList.scss">
</style>

