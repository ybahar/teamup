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


<style lang="scss" scoped>
.main-box a {
  color: inherit;
  text-decoration: inherit;
  padding: 5px 0;
}
.main-box a:hover {
  background-color: #a1a7b3;
}

.main-box {
  margin: 0 auto;
  width: 80vw;
  background-color: #fff;
  border: 1px solid rgba(0.5, 0.5, 0.5, 0.3);
}
.side-bar {
  width: 300px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0.5, 0.5, 0.5, 0.3);
}
.profile-pic {
  margin: 0 auto;
  margin-bottom: 10px;
  width: 118px;
  height: 118px;
  font-size: rem(44px);
  color: #fff;
  border-radius: 50%;
  background: #ccc;
}
</style>
