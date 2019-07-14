<template>
<section>
    <eventera-list :eventeras="eventeras"></eventera-list>
    <eventera-images></eventera-images>
    </section>    
</template>

<script>
import eventeraList from '@/components/EventeraList'
import eventeraImages from '@/components/EventeraImages'
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
      eventeraImages
    },
    created(){
      this.$store.dispatch({type:'loadEventeras'})
    }
}
</script>
