<template>
  <section v-if="eventeraByCategory" class="eventera-list-container">
    <h1>{{ eventeraByCategory.category | capitalize }}</h1>
    <!-- <ul class="eventera-list"> -->
    <carousel :per-page="5" class="eventera-list">
      <!-- TODO: fix carousel -->
      <eventera-preview
        v-for="eventera in eventeraByCategory.eventeras"
        :key="eventera._id"
        :eventera="eventera"
      ></eventera-preview>
    </carousel>
    <!-- </ul> -->
    <hr />
  </section>
</template>

<script>
import EventeraPreview from "@/components/EventeraPreview";
export default {
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

