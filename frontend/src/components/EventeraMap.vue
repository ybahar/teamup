<template>
  <section>
    <h2>Hey map</h2>
    <GmapMap
      :center="{lat:32.0749831, lng:34.9120554}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :position="{lat:32.0749831, lng:34.9120554}"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </section>
</template>

<script>
// lat = 32.0749831, lng = 34.9120554
// :key="index"
//         v-for="(m, index) in markers"
// import mapService from '../services/MapService'

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
  },
  created() {}
};
</script>


