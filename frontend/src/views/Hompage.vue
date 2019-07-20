<template>
  <section class="home-container flex">
    <div class="bg-container"></div>
    <EventeraQuickstart @buildEventera="buildEventera" @searchEventeras="searchEventeras"/>
    <section class="carousel-container">
      <span>{{due}}</span>
      <carousel
        v-if="dueEventeras.length"
        :per-page="1"
        :mouse-drag="true"
        :autoplay="true"
        :loop="true"
        :paginationEnabled="false"
        :speed="1000"
      >
        <slide class="carousel-slide flex column flex-center" @slideclick="handleClick" data-name="1">
          <h4 class="time-formatter">Basketball 5x5 - right now</h4>
          <img src="../imgs/Basketball.jpg" />
        </slide>
        <slide class="carousel-slide flex column flex-center" @slideclick="handleClick" data-name="2">
          <h4 class="time-formatter">Sand, Sun & Fruits - 15 minutes ago</h4>
          <img src="../imgs/beach-friends.png" />
        </slide>
        <slide class="carousel-slide flex column flex-center" @slideclick="handleClick" data-name="3" >
          <h4 class="time-formatter">Dinner and Talk - 2 hours ago</h4>
          <img src="../imgs/date.png" />
        </slide>
        <slide class="carousel-slide flex column flex-center" @slideclick="handleClick" data-name="4" >
          <h4 class="time-formatter">Watch: Drive-in - 12 hours ago</h4>
          <img src="../imgs/Drive-in.jpg" />
        </slide>
        <slide class="carousel-slide flex column flex-center" @slideclick="handleClick" data-name="5" >
          <h4 class="time-formatter">Live show - 3 days ago</h4>
          <img src="../imgs/Music.jpg" />
        </slide>
        <slide class="carousel-slide flex column flex-center" title="6"  @slideclick="handleClick"  data-name="6" >
          <!-- <h4 class="time-formatter">{{dueEventeras[5].name}}-{{(dueEventeras[5].expireAt - dueEventeras[5].createdAt) | timeAgo}}</h4> -->
          <h4 class="time-formatter">Study Group - A week ago</h4>
          <img src="../imgs/StudyGroup.jpg" />
        </slide>
        <slide class="carousel-slide flex column flex-center" title="6"  @slideclick="handleClick"  data-name="7" >
          <h4 class="time-formatter">Lovely English Tutor - Two weeks ago</h4>
          <img src="../imgs/tutor.jpg" />
        </slide>
      </carousel>
    </section>
  </section>
</template>

<script>
import EventeraQuickstart from '../components/EventeraQuickstart'
export default {
  data() {
    return {
      dueEventeras: []
    };
  },
  computed: {
    due() {
      this.dueEventeras = this.$store.getters.eventerasForDisplay;
    }
  },
  methods: {
    loadEventeras() {
      this.$store.dispatch({ type: "loadEventeras" });
    },
    handleClick(dataset) {
      console.log("inside click on slide:", dataset.name);
    },
    searchEventeras(filterBy) {
      this.$store.commit("setFilter", filterBy);
      this.$router.push('/eventera')
    },
    buildEventera(newEventera) {
      this.$store.commit("buildEventera", newEventera);
      this.$router.push('/eventera/edit')
    }
  },
  created() {
    this.loadEventeras()
  },
  components: {
    EventeraQuickstart
  }
};
</script>

<style lang="scss" scoped src="../styles/views/_Homepage.scss">
</style>


