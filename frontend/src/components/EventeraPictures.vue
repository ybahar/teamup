<template>
  <section class="eventera-pictures-container">
   <section class="full-picture">
   <img :src="selectedImgUrl">
   </section>
   <section class="picture-thumbnail">
       <img v-for="url in pictureUrls" :src="url" class="thumbnail" :key="url" @click="selectImg(url)">
   </section>
  </section>
</template>

<script>
export default {
    data(){
        return {
            selectedImgUrl:''
        }
    },
    props:{
        pictureUrls: Array,
    },
    methods:{
        selectImg(url){
            this.selectedImgUrl = url
        }
    },
    created(){
        this.selectImg(this.pictureUrls[0]);
    }
}
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraPictures.scss"></style>
