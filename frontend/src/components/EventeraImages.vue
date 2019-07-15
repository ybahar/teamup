<template>
  <section class="images-container flex column">
    <div class="full-image flex flex-center">
      <img v-if="mainImg" :src="mainImg" />
      <h3 v-else>Choose an image</h3>
    </div>
    <div class="image-list flex row">
        <img @click="setMainImg" v-if="imageUrls[0]" :src="imageUrls[0]" />
      <!-- <div class="image-preview-container">
        <p class="image-command second">Remove</p>
      </div> -->
        <img @click="setMainImg" v-if="imageUrls[1]" :src="imageUrls[1]" />
      <!-- <div class="image-preview-container">
        <p class="image-command second">Remove</p>
      </div> -->
        <img @click="setMainImg" v-if="imageUrls[2]" :src="imageUrls[2]" />
      <!-- <div class="image-preview-container">
        <p class="image-command third">Remove</p>
      </div> -->
        <img @click="setMainImg" v-if="imageUrls[3]" :src="imageUrls[3]" />
      <!-- <div class="image-preview-container">
        <p class="image-command fourth">Remove</p>
      </div> -->
    </div>
    <label id="add-img-label">
      Add image
      <input class="add-img-input" type="file" ref="myImage" @change="setImageUrl" />
    </label>
  </section>
</template>

<script>
// 📁
export default {
  data() {
    return {
      mainImg: null,
      imageUrls: []
    };
  },

  methods: {
    setMainImg(ev) {
      this.mainImg = ev.srcElement.src;
    },
    setImageUrl() {
      let imageFile = this.$refs.myImage.files;

      let url = (function makeUrl(image) {
        let [picture] = image;
        return URL.createObjectURL(picture);
      })(imageFile);

      this.imageUrls.push(url);
    }
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraImages.scss">
</style>


