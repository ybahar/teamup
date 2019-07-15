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
        <label id="add-img-label">Add image
            <input class="add-img-input" type="file" ref="myImage" @change="setImageUrl">
        </label>
    </section>
</template>

<script>
// 📁
export default {
    data() {
        return {
            mainImg: null
        }
    },

    methods: {
        setMainImg(ev) {
            this.mainImg = ev.srcElement.src
        },
        setImageUrl() {
            let imageFile = this.$refs.myImage.files;

            let url = (function makeUrl(image) {
                let [picture] = image
                return URL.createObjectURL(picture)
            })(imageFile)

            this.newNote.img = url

        },
    }
}
</script>

<style lang="scss" scoped src="../styles/components/_EventeraImages.scss">

</style>


