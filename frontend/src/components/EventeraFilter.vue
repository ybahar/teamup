<template>
  <section class="eventera-filter max-width">
    <form class="filter-form flex row space-between max-width">
      <input class="search-name-input" type="text" placeholder="Eventera name" v-model="filterBy.txt" @input="setFilter"/>
      <select class="category-filter" v-model="filterBy.category" @change="setFilter">
        <option value="General"> Category: All</option>
        <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
      </select>
      <label>
        <input class="about-to-close check-box" type="checkbox" v-model="filterBy.almostFull" @change="setFilter" />
          <p class="full-filter">    
            Almost full
          </p>
      </label>
      <label>
        <input
          class="show-closed check-box"
          type="checkbox"
          v-model="filterBy.showClosed"
          @change="setFilter"
        />
          <p class="closed-filter">
            Closed
          </p>
      </label>
      <select class="time-filter" v-model="filterBy.startingAt" @change="setFilter">
        <option :value="timeValues.all">Time: All</option>
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
        },400);
    },
},
created(){
    let filterBy = this.$store.getters.filterBy
    this.filterBy =JSON.parse(JSON.stringify(filterBy))
}
}
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraFilter.scss">

</style>
