<template>
  <section class="user-profile-section max-width">
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
import alertService from "@/services/AlertService";
export default {
  async created() {
    try {
      const { id } = this.$route.params;
      await this.$store.dispatch({ type: "loadCurrUser", id });
      if (!this.user) throw new Error("no user");
    } catch (err) {
      alertService.err("Page not found", ":(");
      this.$router.push("/");
    }
  },
  computed: {
    user() {
      return this.$store.getters.currUser;
    }
  }
};
</script>


<style lang="scss" scoped>
.user-profile-section {
  margin: 0 auto;
}
</style>
