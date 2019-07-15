<template>
  <section v-if="eventeraByCategory">
    <h1 >{{ eventeraByCategory.category | capitalize }}</h1>
    <ul class="eventera-list">
      <eventera-preview
        v-for="eventera in eventeraByCategory.eventeras"
        :key="eventera._id"
        :eventera="eventera"
      ></eventera-preview>
    </ul>
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

<style lang="scss" scoped src="@/styles/components/_EventeraList.scss"></style>

