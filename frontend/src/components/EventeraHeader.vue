<template>
  <header class="app-header flex-center space-between">
    <div class="header flex flex-center space-between">
      <div class="logo-container" @click="goToHome">
        <img class="logo-icon" src="../imgs/ee-logo.svg" />
      </div>
      <nav class="nav-container flex flex-center space-between">
        <router-link class="router-categories" to="/eventera">Explore</router-link>
        <button class="link-build">Plan event</button>
        <router-link class="router-about" to="/about">Help</router-link>
        <div class="user-greeting" v-if="loggedUser && loggedUser._id">
          <img
            v-if="loggedUser.profileImgUrl"
            :src="loggedUser.profileImgUrl"
            height="65"
            width="65"
          />
          Hello, {{ loggedUser.name }}
          <router-link to="/user">Profile page</router-link>
          <button @click="logout" class="link-logout">Logout</button>
        </div>
        <div v-else>
          <button class="link-login" @click="showLoginForm">Log in</button>
          <button class="link-signup" @click="showSignupForm">Sign up</button>
        </div>
      </nav>
    </div>
    <VueModal @close="hideForms" @click.native="hideForms" v-if="isLoginForm || isSignupForm">
      <h1 slot="header" v-if="isSignupForm">Signup</h1>
      <h1 slot="header" v-else>Login</h1>
      <div slot="body">
        <form @submit.prevent="signup" v-if="isSignupForm">
          <input
            type="username"
            v-model="formInput.username"
            required
            autocomplete
            placeholder="Username"
          />
          <input
            type="password"
            v-model="formInput.password"
            required
            autocomplete
            placeholder="Password"
          />
          <input type="text" v-model="formInput.name" required placeholder="Full Name" />
          <div slot="footer">
            <button class="btn-action">Sign up</button>
          </div>
        </form>
        <form @submit.prevent="login" v-else>
          <input
            type="username"
            v-model="formInput.username"
            required
            autocomplete
            placeholder="Username"
          />
          <input
            type="password"
            v-model="formInput.password"
            required
            autocomplete
            placeholder="Password"
          />
          <div slot="footer">
            <button class="btn-action">Login</button>
          </div>
        </form>
      </div>
    </VueModal>
  </header>
</template>

<script>
import VueModal from "@/components/general/VueModal";
import userService from "@/services/UserService";
export default {
  created() {
    this.$store.dispatch({ type: "loadLoggedUser" });
  },
  data() {
    return {
      isUserLogged: false,
      isLoginForm: false,
      isSignupForm: false,
      formInput: {
        username: "",
        password: "",
        name: ""
      },
      errMsg: ""
    };
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    clearFormInput() {
      this.formInput = {
        username: "",
        password: "",
        name: ""
      };
    },
    clearErr() {
      this.errMsg = "";
    },
    async login() {
      try {
        const credentials = {
          username: this.formInput.username,
          password: this.formInput.password
        };
        await userService.login(credentials);
        this.$store.dispatch({ type: "loadLoggedUser" });
        this.clearFormInput();
        this.hideForms();
      } catch (err) {
        this.errMsg = err.message;
        setTimeout(this.clearErr, 5 * 1000);
      }
    },
    async signup() {
      try {
        const credentials = {
          username: this.formInput.username,
          password: this.formInput.password,
          name: this.formInput.name
        };
        await userService.signup(credentials);
        this.$store.dispatch({ type: "loadLoggedUser" });
        this.clearFormInput();
        this.hideForms();
      } catch (err) {
        this.errMsg = err.message;
        setTimeout(this.clearErr, 6000);
      }
    },
    logout() {
      userService.logout();
      if (this.$route.path.includes("/user")) this.$router.push("/");
      this.$store.commit({ type: "setLoggedUser", user: { _id: "" } });
    },
    goToHome() {
      this.$router.push("/");
    },
    showLoginForm() {
      this.isSignupForm = false;
      this.isLoginForm = true;
    },
    showSignupForm() {
      this.isLoginForm = false;
      this.isSignupForm = true;
    },
    hideForms() {
      this.isLoginForm = false;
      this.isSignupForm = false;
      this.clearFormInput();
    }
  },
  components: {
    VueModal
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraHeader.scss">
</style>

