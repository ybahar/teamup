<template>
  <div id="app">
    <eventera-header></eventera-header>
    <router-view/>
    <notifications group="alerts" position="bottom right" />
  </div>
</template>

<script>
import EventeraHeader from '@/components/EventeraHeader'
export default {
components:{
  EventeraHeader 
}  
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
