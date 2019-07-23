<template>
  <section class="details-container" @click="closeChat" v-if="eventera">
    <section class="gallery-contianer">
      <div class="img-container-one">
        <img class="gallery-img" src="../imgs/sport-default.jpg" />
      </div>
      <div class="img-container-two">
        <img class="gallery-img" src="../imgs/Football.jpg" />
      </div>
      <div class="img-container-three">
        <img class="gallery-img" src="../imgs/Basketball.jpg" />
      </div>
    </section>
    <section class="desc-container max-width">
      <div class="text-container flex flex-center space-around">
        <h1>{{eventera.name}}</h1>
        <img
          v-if="eventera.creator.profileImgUrl"
          :src="`../${eventera.creator.profileImgUrl}`"
          width="65px"
          height="65px"
        />
        <img v-else src="../imgs/user.png" width="65px" height="65px" />
      </div>
      <div class="eventera-status flex flex-center space-around">
        <h2 class="members">{{eventera.members.length}} / {{eventera.maxMembers}}</h2>
        <button class="join-btn" @click="eventeraControls" :disabled="!isOpen">{{controlBtnTxt}}</button>
      </div>
      <div class="members-list flex column space-around">
        <h1>Members list</h1>
        <ul>
          <li
            v-for="(member,index) in eventera.members"
            :key="index"
            class="member-item"
          >{{member.name}}</li>
        </ul>
      </div>
      <div class="eventera-creator-text flex column">
        <h2>Looking for: 10 players to play football</h2>
        <h3>About me: former proffessional player</h3>
        <p>Our goal is to create the best event possible of playing football</p>
      </div>
      <eventera-chat></eventera-chat>
      <!-- <span class="chat-icon" @click.stop="openChat"></span>
      <div class="chat-container flex column space-between" @click.stop :class="{chat: isChat}">
        <h1>members chat</h1>
        <input type="text" class="chat-input">
      </div>-->
    </section>
  </section>
</template>

<script>
import EventeraImages from "@/components/EventeraImages";
import EventeraMap from "@/components/EventeraMap";
import EventeraChat from "@/components/EventeraChat";
import eventBus, { OPEN_LOGIN } from "@/EventBus";
import alertService from "@/services/AlertService";

export default {
  data() {
    return {
      isChat: false,
      eventera: null
    };
  },
  async created() {
    let _id = this.$route.params.id;
    let eventera = await this.$store.dispatch({ type: "getEventeraById", _id });
    this.eventera = eventera;
    this.$store.dispatch({ type: "joinEventeraChat", _id });
  },
  async destroyed() {
    let _id = this.$route.params.id;
    this.$store.dispatch({ type: "leaveEventeraChat", _id });
  },
  computed: {
    isOpen() {
      return (
        Date.now() < this.eventera.expireAt &&
        this.eventera.members.length < this.eventera.maxMembers
      );
    },
    userType() {
      let user = this.$store.getters.loggedUser;
      let eventera = this.eventera;
      if (!user || !user._id) return "guest";
      else {
        if (user._id === eventera.creator._id) return "creator";
        else {
          let member = eventera.members.find(member => member._id === user._id);
          if (member) return "member";
          else return "user";
        }
      }
    },
    controlBtnTxt() {
      let userType = this.userType;
      switch (userType) {
        case "guest":
          return "Login";
          break;
        case "creator":
          return "Edit";
          break;
        case "member":
          return "Leave";
          break;
        case "user":
          return "Join";
          break;
      }
    }
  },
  methods: {
    closeChat() {
      this.isChat = false;
    },
    openChat() {
      this.isChat = !this.isChat;
    },
    async eventeraControls() {
      let user = this.$store.getters.loggedUser;
      let userType = this.userType;
      let eventera;
      switch (userType) {
        case "guest":
        eventBus.$emit(OPEN_LOGIN);
        alertService.err(
          "Not logged in",
          "Please login in order to join eventeras")
          break;
        case "creator":
         let url = `/eventera/edit/${this.eventera._id}`
          break;
        case "member":
           eventera = await this.$store.dispatch({
           type: "leaveEventera",
           _id: this.eventera._id
          })
          this.eventera = eventera;
          break;
        case "user":
          console.log('user')
          eventera = await this.$store.dispatch({
          type: "joinEventera",
          _id: this.eventera._id
         })
         this.eventera = eventera;
          break;
    }
  },
  },
  components: {
    EventeraImages,
    EventeraMap,
    EventeraChat
  }

}
</script>

<style lang="scss" scoped src="@/styles/views/_EventeraDetails.scss"></style>
