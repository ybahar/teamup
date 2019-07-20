<template>
    <section>
    <h1>{{category | capitalize }}</h1>

    <section class="eventera-list-category">
      <eventera-preview
        v-for="eventera in eventeras"
        :key="eventera._id"
        :eventera="eventera"
      ></eventera-preview>
    </section>
    </section>
</template>

<script>
import EventeraPreview from "@/components/EventeraPreview";
export default {
     props: {
    eventeras: Array,
    category : String,
  },
  components: {
    EventeraPreview
  },
  created(){
      console.log(this.eventeras)
  }
}
</script>


<style lang="scss" scoped src="@/styles/components/_EventeraCategory.scss">
</style>


