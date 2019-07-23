<template>
  <section v-if="eventeraByCategory" class="eventera-list-container max-width">
    <div class="bg-container-list" :class="home"></div>
    <h1 class="category-header">{{ eventeraByCategory.category | capitalize }}</h1>
    <ul class="eventera-list">
      <eventera-preview
        v-for="eventera in eventeraByCategory.eventeras.slice(0,4)"
        :key="eventera._id"
        :eventera="eventera"
      ></eventera-preview>
    </ul>
    
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
    home() {
      let isHome = true;
      if (this.$route.path !== "/") {
          isHome = false
      }
      return { home: isHome }
    }
  },
  props: {
    eventeraByCategory: Object
  },
  components: {
    EventeraPreview
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraList.scss">
</style>

