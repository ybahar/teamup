<template>
  <div class="home">
    <header>
      <!-- this header tag sould be a component, and in it put LoggedUser -->
      <Homepage/>
      
    </header>
  </div>
</template>

<script>
// @ is an alias to /src

import Homepage from "../views/Hompage";

export default {
  name: "home",
  components: {
    Homepage
  }
};
</script>
