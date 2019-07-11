<template>
  <section class="eventera-edit">
    <form @submit.prevent="saveEventera">
      <input type="text" v-model="eventera.name" placeholder="Title" />
      <input type="text" v-model="eventera.loc.address" placeholder="Address"/>
      <input type="text" v-model="eventera.loc.city" placeholder="City" />
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
      categoryList: ""
    };
  },
  methods: {
    getLocation() {
        if (!navigator || !navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(
            this.setGeo,
          err => console.warn(err),
          { enableHighAccuracy: true }
        );
    },
    setGeo({ coords }) {
        this.eventera.loc.geo.lat = coords.latitude;
      this.eventera.loc.geo.lng = coords.longitude;
    },
    saveEventera() {
      this.eventera.categories = this.categoryList.split(",");
      console.log('in save' ,this.eventera);
      // this.$store.dispatch('saveEventera')
    }
  },
  async created() {
    if (this.$route.params.id) {
      let eventera = await this.$store.dispatch(getEventeraByID);
      this.eventera = eventera;
      this.categoryList = eventera.categories.join(",");
    }
  }
};
</script>

<style lang="scss" scoped src='@/styles/views/_EventeraEdit.scss'> </style>
