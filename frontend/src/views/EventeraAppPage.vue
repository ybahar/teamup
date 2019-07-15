<template>
<section>
    <eventera-list :eventeras="eventeras"></eventera-list>
    </section>    
</template>

<script>
import eventeraList from '@/components/EventeraList'


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
    },
    created(){
      this.$store.dispatch({type:'loadEventeras'})
    }
}
</script>
