<template>
  <div class="home">
    <header>
    <EventeraHeader/>
      <!-- this header tag sould be a component, and in it put LoggedUser -->
      <Homepage/>
      
    </header>
  </div>
</template>

<script>
// @ is an alias to /src

import EventeraHeader from "../components/EventeraHeader";
import Homepage from "../views/Hompage";

export default {
  name: "home",
  components: {
    EventeraHeader,
    Homepage
  }
};
</script>
