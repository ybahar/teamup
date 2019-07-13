<template>
  <section>
    <div class="login-box">
      <div v-if="user._id">
        Welcome,
        <router-link to="/user/">{{ user.username }}</router-link>
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <div v-if="status">
          <div class="quit" @click="clear">X</div>
          <h3>{{ status }}</h3>
          <form @submit.prevent="execSubmit">
            <span v-if="err" class="danger">{{err}}</span>
            <input v-model="credentials.username" type="text" placeholder="Username" />
            <input v-model="credentials.password" type="password" placeholder="Password" />
            <hr />
            <button>{{status}}</button>
          </form>
        </div>
        <div v-else>
          Welcome guest,
          <div class="bottom">
            <button @click="status='signup'">Sign Up</button>
            <button @click="status='login'">Login</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const LOGGED_USER_STORAGE_KEY = "loggedUser";
import userService from "@/services/UserService";
import { storageService } from "@/services/StorageService.js";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      user: { _id: "", username: "" },
      credentials: {
        username: "",
        password: ""
      },
      err: "",
      // status
      //  '' - for no status
      //  'login' - after pressing login
      //  'signup' - after pressing signup
      status: ""
    };
  },
  created() {
    console.log("checking localStorage for user");
    let user = storageService.load(LOGGED_USER_STORAGE_KEY);
    if (user) {
      this.user._id = user._id;
      this.user.username = user.username;
    } else {
      console.log("no user found :(");
    }
  },
  methods: {
    clear() {
      this.clearErr();
      this.clearCredentials();
      this.status = "";
    },
    async login() {
      try {
        let user = await userService.login(this.credentials);
        this.user._id = user._id;
        this.user.username = user.username;
        storageService.store(LOGGED_USER_STORAGE_KEY, this.user);
        this.clearCredentials();
      } catch (err) {
        this.err = err.message;
        setTimeout(this.clearErr, 6000);
      }
    },
    logout() {
      storageService.remove(LOGGED_USER_STORAGE_KEY);
      this.status = "";
      this.clearUser();
    },
    async signup() {
      try {
        let user = await userService.signup(this.credentials);
        this.user._id = user._id;
        this.user.username = user.username;
        storageService.store(LOGGED_USER_STORAGE_KEY, this.user);
        this.clearCredentials();
      } catch (err) {
        this.err = err.message;
        setTimeout(this.clearErr, 6000);
      }
    },
    storeUser() {
      // TODO: continue
      // this.$store.commit({ type: "setLoggedUser", user: this.user });
    },
    clearCredentials() {
      this.credentials.username = "";
      this.credentials.password = "";
    },
    clearUser() {
      this.user.username = "";
      this.user._id = "";
    },
    clearErr() {
      this.err = "";
    },
    execSubmit(status) {
      // executes login / status methods
      this[this.status]();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  position: fixed;
  background-color: $clr1;
  top: 10px;
  right: 10px;
  padding: 20px;
  width: 300px;
  height: 200px;
  border: 1px solid rgba(0.5, 0.5, 0.5, 0.3);
}
.login-box * {
  margin: 5px;
}
a {
  color: inherit;
  text-decoration: inherit;
}
.bottom {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
}
.quit {
  position: absolute;
  padding: 3px;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>
