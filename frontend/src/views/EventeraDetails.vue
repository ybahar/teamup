<template>
  <section class="details-page-container">
    <section class="eventera-details-container" v-if="eventera">
      <section class="eventera-title-contianer eventera-join-container">
        <h1>{{eventera.name}}</h1>
        <button @click="joinEventera" :disabled="!isOpen">{{joinBtnTxt}}</button>
      </section>
      <section class="eventera-general-details-container">
        <section>
          <p>{{eventera.members.length}} / {{eventera.maxMembers}}</p>
          <p>{{eventera.expireAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
          <p>{{eventera.loc.address}}, {{eventera.loc.city}}</p>
          <section class="category-list">
            <p>
              Category :
              <span
                v-for="(category, idx) in eventera.categories"
                :key="category"
              >{{(idx)?',':''}} {{category}}</span>
            </p>
          </section>
        </section>
        <div class="map">MAP HERE</div>
      </section>
      <section class="details-segment">
        <section class="eventera-member-list">
          <section>
            <h2>Eventera Members</h2>
          </section>
          <section v-for="member in eventera.members" :key="member._id.$oid">
            <h3>
              {{member.name}}
              <button>👍</button>
            </h3>
          </section>
        </section>
        <section class="pic-cmp">pic cmp here</section>
      </section>
    </section>
    <section class="suggestion-list"><h4>Suggestions</h4></section>
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
      return (
        Date.now() < this.eventera.expireAt &&
        this.eventera.members.length < this.eventera.maxMembers
      );
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
