<template>
  <section>
    <div class="main-header">
      <h2>Public Profile</h2>
      <h3>Add information about yourself</h3>
    </div>
    <div class="main-body">
      <form @submit.prevent>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone" />
        <button>Save</button>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  created() {
    console.log("hi there");
  }
};
</script>

<style lang="scss" scoped>
// all the components are gonna look a lot alike
@import "@/styles/views/user/user-main.scss";

</style>

