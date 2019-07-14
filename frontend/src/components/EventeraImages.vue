<template>
    <section class="images-container flex column">
        <div  class="full-image flex flex-center">
            <img v-if="mainImg" :src="mainImg"/>
            <h3 v-else>Choose an image</h3>
        </div>
        <div class="image-list flex row">
            <img @click="setMainImg" src="../imgs/sam1.png"/>
            <img @click="setMainImg" src="../imgs/SLS.jpg"/>
            <img @click="setMainImg" src="../imgs/sam3.jpg"/>
            <img @click="setMainImg" src="../imgs/sam4.jpg"/>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            mainImg: null
        }
    },

    methods: {
        setMainImg(ev) {
            this.mainImg = ev.srcElement.src
        }
    }
}
</script>

<style lang="scss" scoped src="../styles/components/_EventeraImages.scss">

</style>


