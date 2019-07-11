<template>
  <section>
    <h1>Profile Page</h1>
    <div>
        
    </div>
    {{ user }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        _id: "u101",
        name: "Salom Anderson",
        email: "gallridge1d@smh.com.au",
        phone: "747-910-1663",
        loc: {
          geo: {
            lat: 40.7559095,
            lng: -0.3371889
          },
          address: "1092 Saint Paul Circle",
          city: "Teruel"
        }
      }
    };
  },
  computed: {}
};
</script>


<style lang="scss" scoped>
$mlr: #ddd;
section {
  color: $mlr;
}
</style>
