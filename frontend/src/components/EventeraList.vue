<template>
    <section v-if="eventeras">
         <eventera-preview v-for="eventera in eventeras" :key="eventera._id" 
         :eventera="eventera"></eventera-preview>
     </section>
</template>

<script>
import eventeraPreview from '@/components/EventeraPreview'
export default {
    props:{
        eventeras : {
            validator(eventeras){
                console.log('is Array:', eventeras ,Array.isArray(eventeras) )
                return Array.isArray(eventeras)
            }
        }
    },
    components:{
        eventeraPreview,
    },
}
</script>
