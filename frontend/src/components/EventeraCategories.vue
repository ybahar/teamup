<template>
  <section>
    <EventeraList v-for="eventerasByCategory in eventerasByCategories" :key="eventerasByCategory" />
  </section>
</template>

<script>
import EventeraList from "@/components/EventeraList.vue";
import { randomBytes } from "crypto";

export default {
  async created() {
    this.$store.dispatch({type: "loadEventeras"});
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    eventerasByCategories() {
      console.log(
        "this.$store.getters.eventerasByCategories is",
        this.$store.getters.eventerasByCategories
      );
      return [[], [], []];
    }
  },
  components: {
    EventeraList
  }
};
</script>
