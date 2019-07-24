<template>
  <div id="app">
    <eventera-header></eventera-header>
    <router-view/>
    <notifications group="alerts" position="bottom right" />
    <section v-if="isLoading" class="loading-container">
      <img src="@/imgs/loader.svg">
    </section>
  </div>
</template>

<script>
import EventeraHeader from '@/components/EventeraHeader'
export default {
components:{
  EventeraHeader 
},
computed:{
  isLoading(){
    return this.$store.getters.isLoading
  }
}, 
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
