<template>
  <section>
    <div class="main-box max-width-narrow">
      <div class="flex">
        <div class="side-bar">
          <div class="profile-pic flex flex-center">
            <img v-if="user.profileImgUrl" class="circle" :src="user.profileImgUrl" />
            <div v-else>{{nameInitials}}</div>
          </div>
          <h2>{{ user.name }}</h2>
          <router-link to="/user/basics">Basics</router-link>
          <router-link to="/user/picture">Profile Pictue</router-link>
          <router-link to="/user/location">Location</router-link>
          <router-link to="/user/eventera">My EventEras</router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <h1>Profile Page</h1>
    <div></div>
  </section>
</template>

<script>
import EventeraHeader from "@/components/EventeraHeader.vue";
export default {
  data() {
    return {
      user: {
        _id: "",
        name: "",
        profileImgUrl: ""
      }
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadLoggedUser" });
    const { _id, name, profileImgUrl } = this.$store.getters.loggedUser;

    if (!_id) this.$router.push("/");
    this.user = { _id, name, profileImgUrl };
  },
  computed: {
    nameInitials() {
      if (!this.user.name) return "";
      let words = this.user.name.split(" ");

      let initials = words.reduce((acc, word) => {
        return acc + word.charAt(0);
      }, "");
      return initials.slice(0, 3); // I don't want more than 3 initails.
    }
  },
  components: {
    EventeraHeader
  }
};
</script>


<style lang="scss" scoped src="@/styles/views/user/_UserDetails.scss"></style>
