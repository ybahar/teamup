<template>
  <section class="details-container">
    <div class="gallery-contianer">
      <div class="img-container-one">
        <img class="gallery-img" src="../imgs/sport-default.jpg"/>
      </div>
      <div class="img-container-two">
        <img class="gallery-img" src="../imgs/Football.jpg"/>
      </div>
      <div class="img-container-three">
        <img class="gallery-img" src="../imgs/Basketball.jpg"/>
      </div>
    </div>
    <section class="desc-container">
      
    </section>
  </section>
</template>

<script>
import EventeraImages from '@/components/EventeraImages'
import EventeraMap from '@/components/EventeraMap';
export default {
  data() {
    return {
      eventera: null,
      fakeImgUrls:['https://www.versacourt.com/cmss_files/photogallery/structure/Residential_Multi-Sport_Game_Courts/image57815.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY7d9aeTD8P-FbLTIhPTHBDVIzE6Bn_ZSF0O4pjYYrlPYsmR0H',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShICMlIEuLvf7ofylql6XlAqarL9JAxFLZYyloKKqxaHkgMUgZ',
      ]
    };
  },
  async created() {
    let _id = this.$route.params.id;
    let eventera = await this.$store.dispatch({ type: "getEventeraById", _id });
    this.eventera = eventera;
  },
  computed: {
    isOpen() {
      return (
        Date.now() < this.eventera.expireAt &&
        this.eventera.members.length < this.eventera.maxMembers
      );
    },
    joinBtnTxt() {
      return this.isOpen ? "Join" : "Closed";
    }
  },
  methods: {
    joinEventera() {
      console.log("Need store user data , Function currently is noted  ");
      //TODO : GET USER FROM STORE
      //         let member = {
      //     _id : user._id,
      //     name : user.name,
      //     role: null,
      //     mvpVoteCount:0
      // }
      // this.eventera.members.push(member)
    }
  },
  components:{
    EventeraImages,
    EventeraMap
  }
};
</script>

<style lang="scss" scoped src="@/styles/views/_EventeraDetails.scss"></style>
