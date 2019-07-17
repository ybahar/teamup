<template>
  <section class="user-location">
    <div class="main-header">
      <h2>Address</h2>
      <h3>Make finding Eventeras easier</h3>
    </div>
    <div class="main-body">
      <form @submit.prevent>
        <input
          type="text"
          v-model="address"
          @input="getAddressPosition"
          placeholder="try 'Sweden Stockholm'"
        />
        <button class="btn-action" @click="getUserLocation">Use my location</button>
        <GmapMap :center="mapCenter" :zoom="7" map-type-id="terrain" id="g-map">
          <GmapMarker :position="mapCenter" />
        </GmapMap>
        <button class="btn-action">Save</button>
      </form>
    </div>
  </section>
</template>


<script>
import locService from "@/services/loc/LocService.js";
import { setTimeout, clearTimeout } from "timers";
let debounceTimeout;
export default {
  name: "UserLocation",
  async created() {
    this.address = "";
  },
  data() {
    return {
      address: "",
      geo: {
        lat: 0,
        lng: 0
      }
    };
  },
  computed: {
    loc() {
      return this.$store.getters.loc;
    },
    mapCenter() {
      if (this.geo)
        if (this.geo.lat && this.geo.lng)
          return { lat: this.geo.lat, lng: this.geo.lng };
      return { lat: 59.3293, lng: 18.0686 };
    }
  },
  methods: {
    async getUserLocation() {
      const { coords } = await locService.getUserPosition();
      const { latitude, longitude } = coords;
      this.geo = { lat: latitude, lng: longitude };
    },
    getAddressPosition() {
      try {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
          const { lat, lng } = await locService.getAddressPosition(
            this.address
          );
          this.geo = { lat, lng };
        }, 500);
      } catch (err) {
        console.log("had issues with finding getAddressPosition", err);
      }
    },
    save() {
      this.$store.dispatch({ type: "updateLocation", geo: this.geo });
      this.$store.getters.geo
    }
  }
};
</script>

<style lang="scss" scoped>
// all the components are gonna look a lot alike
@import "@/styles/views/user/user-main.scss";
</style>
