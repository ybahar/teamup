<template>
  <section class="carousel-container">
    <carousel
      :per-page="1"
      :mouse-drag="true"
      :autoplay="true"
      :loop="true"
      :paginationEnabled="false"
    >
      <slide class="carousel-slide" @slideclick="handleClick" data-name="SLS">
        <p class="jumbo">
          🇫​🇮​🇳​🇩​ 🇾​🇴​🇺​🇷​ 🇪​🇻​🇪​🇳​🇹​
        </p>
        <img src="../imgs/SLS.jpg" />
        <button class="btn-action">Sport Events</button>
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="P1">
        <p class="jumbo">
          🇫​🇮​🇳​🇩​ 🇾​🇴​🇺​🇷​ 🇪​🇻​🇪​🇳​🇹​ 
        </p>
        <img src="../imgs/P1.jpg" />
        <button class="btn-action">Music</button>
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="jeep">
        <p class="jumbo">
          🇫​🇮​🇳​🇩​ 🇾​🇴​🇺​🇷​ 🇪​🇻​🇪​🇳​🇹​
        </p>
        <img src="../imgs/jeep.jpg" />
        <button class="btn-action">Bizzare Events</button>
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


