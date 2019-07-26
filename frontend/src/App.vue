<template>
  <div id="app">
    <eventera-header></eventera-header>
    <router-view/>
    <notifications group="alerts" position="bottom right" class="notfications"/>
    <section v-if="isLoading" class="loading-container" :class="loaderClass">
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
  },
  loaderClass(){
    let isHome = (this.$route.fullPath === '/');

    return {
      'homepage-loader' : isHome
    }
  }
}, 
created(){
  
}
}

</script>

<style lang="scss" src="@/styles/views/_App.scss">


</style>
