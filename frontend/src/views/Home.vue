<template>
  <div class="home">
    <header>
      <!-- this header tag sould be a component, and in it put LoggedUser -->
      <LoggedUser />
    </header>
  </div>
</template>

<script>
// @ is an alias to /src
import LoggedUser from "@/components/user/LoggedUser.vue";

export default {
  name: "home",
  components: {
    LoggedUser
  }
};
</script>
