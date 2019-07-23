<template>
    <section class="eventera-list-container max-width">
      <div class="bg-container"></div>
    <h1>{{category | capitalize }}</h1>

    <section class="eventera-list">
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


<style lang="scss" scoped src="@/styles/components/_EventeraList.scss">
</style>


