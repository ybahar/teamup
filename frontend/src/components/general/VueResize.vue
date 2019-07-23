<template>
  <span style="display: none;"></span>
</template>
<script>
const WINDOW_RESIZE = "resize";
export default {
  props: {
    ranges: Array
  },
  methods: {
    checkSize({ target }) {
      const { innerWidth } = target;
      let nameToEmit = "";
      this.ranges.some(range => {
        if (innerWidth > range.min && innerWidth < range.max) {
          nameToEmit = range.name;
        }
      });
      this.$emit(WINDOW_RESIZE, nameToEmit);
    }
  },
  created() {
    window.addEventListener("resize", this.checkSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkSize);
  }
};
</script>