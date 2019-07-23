<template>
  <div class="hello">
       <section class="carousel-container">
      <!-- <span>{{due}}</span> -->
      <h1 class="carousel-header">Hottest Events:</h1>
      <carousel
        class="carousel"
        :per-page="3"
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
          <h4 class="time-formatter">Study Group - A week ago</h4>
          <img src="../imgs/StudyGroup.jpg" />
        </slide>
        <slide class="carousel-slide flex column flex-center" title="6"  @slideclick="handleClick"  data-name="7" >
          <h4 class="time-formatter">Lovely English Tutor - Two weeks ago</h4>
          <img src="../imgs/tutor.jpg" />
        </slide>
      </carousel>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
