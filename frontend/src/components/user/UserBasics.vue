<template>
  <section>
    <div class="main-header">
      <h2>Public Profile</h2>
      <h3>Add information about yourself</h3>
    </div>
    <div class="main-body">
      <form @submit.prevent="save">
        <input v-model="user.name" type="text" placeholder="Name" />
        <input v-model="user.email" type="email" placeholder="Email" />
        <input v-model="user.phone" type="tel" placeholder="Phone" />
        <button class="btn-action">Save</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: ""
      }
    };
  },
  async created() {
    await this.$store.dispatch({type:"loadLoggedUser"})
    const { name, email, phone } = this.$store.getters.loggedUser;
    this.user = { name, email, phone };
  },
  methods: {
    save() {      
      this.$store.dispatch({
        type: "saveUserBasics",
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// all the components are gonna look a lot alike
@import "@/styles/views/user/user-main.scss";
</style>

