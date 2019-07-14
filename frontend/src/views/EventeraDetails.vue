<template>
  <section class="eventera-details" v-if="eventera">
    <section class="flex-column">
      <section class="eventera-title-contianer">
        <h1>{{eventera.name}}</h1>
        <button @click="joinEventera" :disabled="!isOpen">{{joinBtnTxt}}</button>
        <p>Eventera date : {{eventera.expireAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
        <section class="category-list">
          <p> Category : 
            <span 
            v-for="(category, idx) in eventera.categories"
            :key="category"
          >{{(idx)?',':''}} {{category}}</span>
            </p>
        </section>
      </section>
      <section class="eventera-loc-container">
        <p>{{eventera.loc.address}}, {{eventera.loc.city}}</p>
      </section>
    </section>
    <section class="eventera-member-list">
      <section v-for="member in eventera.members" :key="member._id.$oid">
        <h3>{{member.name}}</h3>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      eventera: null
    };
  },
  async created() {
    let _id = this.$route.params.id;
    let eventera = await this.$store.dispatch({ type: "getEventeraById", _id });
    this.eventera = eventera;
  },
  computed: {
    isOpen() {
      return Date.now() < this.eventera.expireAt;
    },
    joinBtnTxt() {
      return this.isOpen ? "Join" : "Closed";
    }
  },
  methods: {
    joinEventera() {
      console.log("Need store user data , Function currently is noted  ");
      //TODO : GET USER FROM STORE 
      //         let member = {
      //     _id : user._id,
      //     name : user.name,
      //     role: null,
      //     mvpVoteCount:0
      // }
      // this.eventera.members.push(member)
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/views/_EventeraDetails.scss"></style>
