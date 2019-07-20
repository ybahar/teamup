<template>
  <section class="details-container" @click="closeChat" v-if="eventera">
    <section class="gallery-contianer">
      <div class="img-container-one">
        <img class="gallery-img" src="../imgs/sport-default.jpg"/>
      </div>
      <div class="img-container-two">
        <img class="gallery-img" src="../imgs/Football.jpg"/>
      </div>
      <div class="img-container-three">
        <img class="gallery-img" src="../imgs/Basketball.jpg"/>
      </div>
    </section>
    <section class="desc-container max-width">
      <div class="text-container flex flex-center space-around">
        <h1>{{eventera.name}}</h1>
        <img v-if="eventera.creator.profileImgUrl" 
        :src="`../${eventera.creator.profileImgUrl}`" width="65px" height="65px">
        <img v-else src="../imgs/user.png" width="65px" height="65px">
      </div>
      <div class="eventera-status flex flex-center space-around">
        <h2 class="members">{{eventera.members.length}} / {{eventera.maxMembers}}</h2>
        <button class="join-btn" @click="joinEventera">Join</button>
      </div>
      <div class="members-list flex column space-around">
        <h1>Members list</h1>
        <ul>
          <li v-for="(member,index) in eventera.members" :key="index" class="member-item">{{member.name}}</li>
        </ul>
      </div>
      <div class="eventera-creator-text flex column">
        <h2>Looking for: 10 players to play football</h2>
        <h3>About me: former proffessional player</h3>
        <p>Our goal is to create the best event possible of playing football</p>
      </div>
      <span class="chat-icon" @click.stop="openChat"></span>
      <div class="chat-container flex column space-between" @click.stop :class="{chat: isChat}">
        <h1>members chat</h1>
        <input type="text" class="chat-input">
      </div>
    </section>
  </section>
</template>

<script>
import EventeraImages from '@/components/EventeraImages'
import EventeraMap from '@/components/EventeraMap';
export default {
  data() {
    return {
      isChat: false,
      eventera: null,
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
    closeChat() {
      this.isChat = false;
    },
    openChat() {
      this.isChat = !this.isChat
    },
    joinEventera() {
      //TODO : GET USER FROM STORE
      let user = this.$store.getters.loggedInUser
      if(user._id){
        this.$store.dispatch({type:'joinEventera',_id:this.eventera._id})
      }
            
}
  },
  components:{
    EventeraImages,
    EventeraMap
  }
};
</script>

<style lang="scss" scoped src="@/styles/views/_EventeraDetails.scss"></style>
