<template>
  <section class="app-header">
    <button @click="openHeader" class="collapsible">
      <div class="logo-container">
        <span class="logo-icon">🅴🆅🅴🅽🆃🅴🆁🅰 </span>
        <span class="logo-text">Constructing events &#x1F6E0</span>
      </div>

      <input @click.stop class="search-events" type="text" v-model="filterBy.txt" @input="emitInput" placeholder="Search events" />
      <div class="user-img-container">
        <img src="../imgs/user.png" height="65" width="65" />
      </div>
    </button>
    <div class="content" :class="{open: isOpen}" v-if="isOpen">
      <ul class="item-container">
        <li class="content-item"><img src="../imgs/worker.gif"></li>
        <li class="content-item"><a href="">Popular Events</a></li>
        <li class="content-item"><LoggedUser/></li>
      </ul>
    </div>
  </section>
</template>


<script>
import LoggedUser from "@/components/user/LoggedUser.vue";
export default {
  data() {
    return {
      isOpen: false,
      filterBy:{txt:''}
    };
  },

  methods: {
    openHeader() {
      this.isOpen = !this.isOpen;
    },
    setInput() {
       this.$emit('searchEvent', this.filterBy)
    }
  },
  components: {
    LoggedUser
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraHeader.scss">
</style>
