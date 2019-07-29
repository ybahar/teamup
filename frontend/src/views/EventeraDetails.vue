<template>
  <section class="details-container" @click="closeChat" v-if="eventera">
    <VueModal @close="handleModalClose" v-if="profileUserId && profileUser">
      <h1 slot="header">{{ profileUser.name}}</h1>
      <div slot="body">
        <div class="profile-modal-body">
          <img :src="profileUser.profileImgUrl | imgSrc" />
        </div>
      </div>
      <div slot="footer"></div>
    </VueModal>
    <div class="bg-details-container"></div>
    <section class="gallery-contianer">
      <div class="img-container-one">
        <img class="gallery-img" :src="imgs[0] | imgSrc" />
      </div>
      <div class="img-container-two">
        <img class="gallery-img" :src="imgs[1] | imgSrc" />
      </div>
      <div class="img-container-three">
        <img class="gallery-img" :src="imgs[2] | imgSrc" />
      </div>
    </section>
    <section class="desc-container max-width">
      <div class="text-container flex flex-center space-around">
        <h1>{{eventera.name}}</h1>
        <img v-if="eventera.creator.profileImgUrl" :src="creatorImg" width="65px" height="65px" />
        <!-- <img v-else src="../imgs/user.png" width="65px" height="65px" /> all users have pictures -->
      </div>
      <div class="eventera-status flex flex-center space-around">
        <h2 class="members">{{eventera.members.length}} / {{eventera.maxMembers}}</h2>
        <button class="join-btn" @click="eventeraControls">{{controlBtnTxt}}</button>
      </div>
      <div class="members-list flex column space-around">
        <h1>Members list</h1>
        <ul>
          <li
            v-for="(member,index) in eventera.members"
            :key="index"
            class="member-item flex space-between"
          >
          <span :class="{'disabled-clap':loggedUser && loggedUser._id === member._id}"
            class="clap-icon" @click.stop="clap(member._id)">
            <img  src="@/imgs/clap-icon.svg" >
            {{member.mvpVoteCount}}
          </span>
            {{member.name}}
            <img
              @click="loadUserProfile(member._id)"
              :src="member.profileImgUrl | imgSrc"
              alt="member"
            />
          </li>
        </ul>
      </div>
      <div class="eventera-creator-text flex column">
        <h1>Date: {{ new Date(eventera.expireAt) | moment("dddd, MMMM Do YYYY, h:mm a") }}</h1>
         <h3>Location: {{eventera.loc.streetName}} {{eventera.loc.city}}</h3>
        <p>{{eventera.description}}</p>
      </div>
      <eventera-chat></eventera-chat>
    </section>
  </section>
</template>

<script>
import EventeraImages from "@/components/EventeraImages";
import EventeraMap from "@/components/EventeraMap";
import EventeraChat from "@/components/EventeraChat";
import eventBus, { OPEN_LOGIN } from "@/EventBus";
import alertService from "@/services/AlertService";
import VueModal from "@/components/general/VueModal";
export default {
  data() {
    return {
      isChat: false,
      eventera: null,
      profileUserId: ""
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
    this.profileUserId = "";
  },
  computed: {
    loggedUser(){
      
      return this.$store.getters.loggedUser;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isOpen() {
      return (
        Date.now() < this.eventera.expireAt &&
        this.eventera.members.length < this.eventera.maxMembers
      );
    },
    userType() {
      let user = this.$store.getters.loggedUser;
      let eventera = this.eventera;
      if (!user) return "guest";
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
        case "creator":
          return "Edit";
          break;
        case "member":
          return "Leave";
          break;
        default:
          if (this.isOpen) {
            return "Join";
          } else return "Closed";
          break;
      }
    },
    profileUser() {
      return this.$store.getters.currUser;
    },
    imgs() {
      let urls = this.eventera.imgUrls.map(url => {
        return url;
      });
      while (urls.length < 3) {
        urls.push(urls[0]);
      }
      return urls;
    },
    creatorImg() {
      let url = this.eventera.creator.profileImgUrl;
      if (!url.includes("http")) url = "../" + url;
      return url;
    }
  },
  methods: {
    // todo: fix incosistency with 'currUser' and 'userProfile'
    handleModalClose() {
      this.profileUserId = "";
    },
    loadUserProfile(userId) {
      this.profileUserId = userId;
      this.$store.dispatch({ type: "loadCurrUser", id: this.profileUserId });
    },
    closeChat() {
      this.isChat = false;
    },
    openChat() {
      this.isChat = !this.isChat;
    },
    async eventeraControls() {
      // let user = this.$store.getters.loggedUser;
      let userType = this.userType;
      let eventera;
      console.log(userType);
      switch (userType) {
        case "guest":
          eventBus.$emit(OPEN_LOGIN);
          alertService.err(
            "Not logged in",
            "Please login in order to join eventeras"
          );
          break;
        case "creator":
          let url = `/eventera/edit/${this.eventera._id}`;
          this.$router.push(url);
          break;
        case "member":
          eventera = await this.$store.dispatch({
            type: "leaveEventera",
            _id: this.eventera._id
          });
          this.eventera = eventera;
          break;
        case "user":
          if (this.isOpen) {
            eventera = await this.$store.dispatch({
              type: "joinEventera",
              _id: this.eventera._id
            });
          } else
            alertService.err(
              "This EventEra is closed",
              "Please select another eventera to join"
            );
          this.eventera = eventera;
          break;
      }
    },
    clap(_id){
      if(this.userType !== 'creator' && this.userType !== 'member' ) {
        return alertService.err('Must be a member to clap', 'Join the event to clap on your teammates preformence')
      } 
      if(this.loggedUser._id === _id) return alertService.warn('Cant clap  yourself', 'We know your awosme tough :)')
      this.$store.dispatch('clap',{eventeraId:this.eventera._id , userId:_id})
      let user = this.eventera.members.find(member => member._id === _id);
      user.mvpVoteCount++;
    },
  },
  components: {
    EventeraImages,
    EventeraMap,
    EventeraChat,
    VueModal
  }
};
</script>

<style lang="scss" scoped src="@/styles/views/_EventeraDetails.scss"></style>
