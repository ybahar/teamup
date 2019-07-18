<template>
  <section class="user-location">
    <div class="main-header">
      <h2>Address</h2>
      <h3>Make finding Eventeras easier</h3>
    </div>
    <div class="main-body">
      <form @submit.prevent="save">
        <input
          type="text"
          v-model="loc.address"
          @input="getAddressPosition"
          placeholder="try 'Sweden Stockholm'"
        />
        <button type="button" class="btn-action" @click="getUserLocation">Use my location</button>
        <GmapMap :center="loc.geo" :zoom="7" map-type-id="terrain" id="g-map">
          <GmapMarker :position="loc.geo" />
        </GmapMap>
        <button class="btn-action">Save</button>
      </form>
    </div>
    {{ loc.geo }}
  </section>
</template>


<script>
import locService from "@/services/loc/LocService.js";
import { setTimeout, clearTimeout } from "timers";
let debounceTimeout;
export default {
  name: "UserLocation",
  async created() {
    // await this.$store.dispatch({type: 'loadLoggedUser'})
    if (!this.$store.getters.loggedUser._id) this.$router.push("/");
    const loc = await this.$store.getters.loc;
    this.loc = Object.assign({}, loc);
    if (!loc.geo || !loc.geo.lat || !loc.geo.lng) {
      const { lat, lng } = await locService.getAddressPosition(
        this.loc.address
      );
      this.loc.geo = { lat, lng };
    }
  },
  data() {
    return {
      loc: {
        address: "",
        geo: {
          lat: 0,
          lng: 0
        }
      }
    };
  },
  methods: {
    async getUserLocation() {
      const { coords } = await locService.getUserPosition();
      console.log("coords", coords);
      const { latitude, longitude } = coords;
      this.loc.geo = { lat: latitude, lng: longitude };
    },
    getAddressPosition() {
      try {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
          const { lat, lng } = await locService.getAddressPosition(
            this.loc.address
          );
          this.loc.geo = { lat, lng };
        }, 500);
      } catch (err) {
        console.log("had issues with finding getAddressPosition", err);
      }
    },
    save() {
      this.$store.dispatch({ type: "updateLocation", loc: this.loc });
      // this.$store.getters.geo
    }
  }
};
</script>

<style lang="scss" scoped>
// all the components are gonna look a lot alike
@import "@/styles/views/user/user-main.scss";
</style>
