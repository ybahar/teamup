<template>
  <section class="eventera-filter">
    <form>
      <input type="text" placeholder="Eventera name" v-model="filterBy.txt" @input="setFilter"/>
      <select class="category" v-model="filterBy.category" @change="setFilter">
        <option value="General">All</option>
        <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
      </select>
      <label>
        <input class="about-to-close check-box" type="checkbox" v-model="filterBy.almostFull" @change="setFilter" />
          <span>    
        Almost full
          </span>
      </label>
      <label>
        <input
          class="show-closed check-box"
          type="checkbox"
          v-model="filterBy.showClosed"
          @change="setFilter"
        />
          <span>
        Show closed eventeras
          </span>
      </label>
      <select class="time-search" v-model="filterBy.startingAt" @change="setFilter">
        <option :value="timeValues.all">All</option>
        <option :value="timeValues.soon">Starting soon</option>
        <option :value="timeValues.fewDays">In the next couple of days</option>
        <option :value="timeValues.week">Upcoming week</option>
      </select>
    </form>
  </section>
</template>

<script>
const hour = 1000 *60 *60
let debounceTimeout;
export default {
    data(){
      return {
          filterBy:{
            txt : '',
            category : 'General',
            almostFull: false ,
            startingAt: 0,
            showClosed:false,
          },
          timeValues : {
              all : 0,
              soon : hour * 8, //next 8 hours
              fewDays : hour * 48, // next 2 days, 
              week : hour * 168 // next 7 days, 
          }
      }
    },
    computed:{
      categories(){
          return this.$store.getters.categories
      }
    },
    methods:{
        setFilter(){
       if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
          let filterBy = JSON.parse(JSON.stringify(this.filterBy))
           await this.$store.dispatch({type:'setFilter',filterBy})
           this.$store.dispatch({type:'loadEventeras'})
        },500);
    },
}
}
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraFilter.scss">

</style>
