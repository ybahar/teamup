<template>
  <section class="user-picture">
    <div class="main-header">
      <h2>Profile Picture</h2>
      <h3>Let everyone know you</h3>
    </div>
    <div class="main-body">
      <form @submit.prevent="save">
        <label class="file-input-label">
          Update profile picture
          <input
            type="file"
            @change="handleUploadImage"
            style="display: none;"
          />
        </label>
        <button class="btn-action">Save</button>
      </form>
    </div>
  </section>
</template>

<script>
import alertService from '@/services/AlertService';
// v-model="eventera.name"

// @change="handleUploadImage"
export default {

  async created() {
    await this.$store.dispatch({ type: "loadLoggedUser" });
    const { profileImgUrl } = this.$store.getters.loggedUser;
    this.user = { profileImgUrl };
  },
  data() {
    return {
      user: {
        profileImgUrl: ""
      }
    };
  },
  methods: {
    async handleUploadImage(ev) {
      let fileObj = ev.target.files;
      let res = Object.keys(fileObj).map(key => {
        return [fileObj[key]];
      });
      const imgURLs = await this.$store.dispatch("uploadToCloud", res);
      this.user.profileImgUrl = imgURLs[0];
    },
    async save() {
      try {
        await this.$store.dispatch({
          type: "saveUserProfileImg",
          profileImgUrl: this.user.profileImgUrl
        });
        alertService.success("Saved Successfuly", "Profile Picture Saved");
      } catch (err) {
        alertService.err(
          "Something Didn't work",
          "Try again some other time :("
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// all the components are gonna look a lot alike
@import "@/styles/views/user/user-main.scss";
</style>