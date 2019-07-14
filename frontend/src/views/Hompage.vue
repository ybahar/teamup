<template>
  <section class="carousel-container">
    <carousel :per-page="1" :mouse-drag="true"
    :autoplay="false" :loop="true" :paginationEnabled="false">
      <slide class="carousel-slide" @slideclick="handleClick" data-name="SLS">
        <img src="../imgs/SLS.jpg" />
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="P1">
        <img src="../imgs/P1.jpg" />
      </slide>
      <slide class="carousel-slide" @slideclick="handleClick" data-name="jeep">
        <img src="../imgs/jeep.jpg"/>
      </slide>
    </carousel>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      handleClick(dataset){
          console.log('inside click on slide:', dataset.name);
          
      }
  }
};
</script>

<style lang="scss" scoped src="../styles/views/_Homepage.scss">
</style>


