<template>
    <section class="eventera-list-container max-width" v-if="!isLoading">
      <div v-if="newEventeraMap" class="load-container">
        <button @click.stop="loadEventeras">
          Load {{newEventeraMap}} new EventEras
        </button>
      </div>
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
  computed:{
    isLoading(){
      return this.$store.getters.isLoading
    },
    newEventeraMap(){
      return this.$store.getters.newEventeraMap[this.category.toLowerCase()]
    }
  },
  methods:{
    loadEventeras(){
      this.$store.dispatch('loadEventeras')
    }
  },
  created(){
  }
}
</script>


<style lang="scss" scoped src="@/styles/components/_EventeraList.scss">
</style>


