<template>
<section>
    <eventera-list :eventeras="eventeras"></eventera-list>
    <eventera-images></eventera-images>
    <eventera-map></eventera-map>
    </section>    
</template>

<script>
import eventeraList from '@/components/EventeraList'
import eventeraImages from '@/components/EventeraImages'
import eventeraMap from '../components/EventeraMap'

export default {
    data(){
        return {
        }
    },
    computed:{
        eventeras(){
            return this.$store.getters.eventerasForDisplay;
        },
    },
    components:{
      eventeraList,
      eventeraImages,
      eventeraMap
    },
    created(){
      this.$store.dispatch({type:'loadEventeras'})
    }
}
</script>
