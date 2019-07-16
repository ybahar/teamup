<template>
  <section class="carousel-container">
    <carousel
      :per-page="3"
      :mouse-drag="true"
      :autoplay="false"
      :loop="true"
      :paginationEnabled="false"
    >
      <slide class="carousel-slide" @slideclick="handleClick" data-name="SLS">
          <img src="../imgs/SLS.jpg" />
        <div class="img-container">
          <p>Event is {{howManyLeft}}</p>
        </div>
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="ducati">
          <img src="../imgs/Ducati_Streetfighter.jpg" />
        <div class="img-container">
          <p>Go to Event</p>
        </div>
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="jeep">
          <img src="../imgs/jeep.jpg" />
        <div class="img-container">
          <p>Go to Event</p>
        </div>
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="bentley">
          <img src="../imgs/Bentley.jpg" />
        <div class="img-container">
          <p>Go to Event</p>
        </div>
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="honda">
          <img src="../imgs/Honda.jpg" />
        <div class="img-container">
          <p>Go to Event</p>
        </div>
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="jeep">
          <img src="../imgs/lamb.jpg" />
        <div class="img-container">
          <p>Go to Event</p>
        </div>
      </slide>
    </carousel>
  </section>
</template>

<script>
// 🇫​🇮​🇳​🇩​ 🇾​🇴​🇺​🇷​ 🇪​🇻​🇪​🇳​🇹​🇪​🇷​🇦​
// 𝙁𝙞𝙣𝙙 𝙮𝙤𝙪𝙧 𝙀𝙫𝙚𝙣𝙩𝙚𝙧𝙖
export default {
  data() {
    return {};
  },
  computed: {
    howManyLeft() {
      return eventera.
    }
  },
  methods: {
    handleClick(dataset) {
      console.log("inside click on slide:", dataset.name);
      //
    }
  }
};
</script>

<style lang="scss" scoped src="../styles/views/_Homepage.scss">
</style>


