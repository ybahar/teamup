<template>
<section>
    <eventera-header></eventera-header>
    <eventera-list :eventeras="eventeras"></eventera-list>
    </section>    
</template>

<script>
import eventeraList from '@/components/EventeraList'
import eventeraHeader from '@/components/EventeraHeader'
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
      eventeraHeader
    },
    created(){
      this.$store.dispatch({type:'loadEventeras'})
    }
}
</script>
