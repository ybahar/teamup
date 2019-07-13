<template>
  <section class="eventera-edit">
    <form @submit.prevent="saveEventera">
      <input type="text" v-model="eventera.name" placeholder="Title" />
      <input type="text" v-model="eventera.loc.address" placeholder="Address"/>
      <input type="text" v-model="eventera.loc.city" placeholder="City" />
      <label> Event date and time
      <input type="date" v-model="expireDate"  />
      <input type="time" v-model="expireTime"  />
      </label>
      <button @click.prevent="getLocation">Use my current location</button>
      <input type="text" v-model="categoryList" placeholder="Categories , saparated by ',''" />
      <button type="submit">Save</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      eventera: {
        name: "",
        loc: {
          geo: {
            lat: null,
            lng: null
          },
          city: "",
          address: ""
        }
      },
      categoryList: "",
      expireTime : '',
      expireDate : '',
    }
  },
  methods: {
    getLocation() {
        if (!navigator || !navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(this.setGeo,err => console.warn(err),
        { enableHighAccuracy: true });
    },
    setGeo({ coords }) {
      this.eventera.loc.geo.lat = coords.latitude;
      this.eventera.loc.geo.lng = coords.longitude;
    },
    saveEventera() {
      this.eventera.categories = this.categoryList.split(",");
      this.eventera.expireAt = new Date(this.expireDate+ ':' + this.expireTime).getTime();
      this.$store.dispatch('saveEventera',this.eventera)
    },
    setTimes(date){
      //format time and date strings to confirm to input rules 
      this.expireTime =  date.toLocaleTimeString('he-il').split(':')
      .map(t => {
        if(+t< 10) return '0' + t
        else return t}).join(':')
      this.expireDate =  date.toLocaleDateString('he-il').split('.').reverse()
        .map(t => {
        if(+t< 10) return '0' + t
        else return t}).join('-')
      
    }
  },
  async created() {
    if (this.$route.params.id) {
      let _id = this.$route.params.id
      let eventera = await this.$store.dispatch({type:'getEventeraById',_id});
      this.eventera = eventera;
      this.categoryList = eventera.categories.join(",");
      let expirationDate = new Date(eventera.expireAt)
      this.setTimes(expirationDate)
      
    }
  }
};
</script>

<style lang="scss" scoped src='@/styles/views/_EventeraEdit.scss'> </style>
