
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div @click.stop class="modal-container">
          <div class="btn-quit" @click="$emit('close')">
            <span>X</span>
          </div>
          <!-- <button class="modal-default-button" @click="$emit('close')">X</button> -->
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>
          <div class="modal-body" ref="modalBody">
            <slot name="body">default body</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">default footer</slot>
          </div>
        </div>
      </div>
      <div style="display: none" @keydown.esc="$emit('close')"></div>
    </div>
  </transition>
</template>

<script>
// TODO: 
// j: currently the modal just pops without a small animation
// with the current rendering - v-if - we can't implement an animation upon rendering
// need to check vue animations before hand
// mb check yaron's ppt 
import eventBus, { ALERT_SUCCESS } from "@/EventBus";
export default {
  methods: {
    close(e) {
      if (e.keyCode === 27) this.$emit("close");
    }
  },
  created() {
    document.addEventListener("keyup", this.close);
  },
  destroyed() {
    document.removeEventListener("keyup", this.close);
  },
  mounted() {
    // just mounted() isn't enough.
    this.$nextTick(() => {
      const firstInputEl = this.$refs.modalBody.querySelector("input")
      if(firstInputEl) firstInputEl.focus()
    });
  }
};
</script>

<style>
.btn-quit {
  box-shadow: 0 0 2px black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  /* margin: 5px; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  color: buttontext;
  display: block;
  /* height: 16px;
  width: 16px; */
  display: block;
  position: absolute;
  left: 10px;
  top: 10px;
}
.btn-quit > * {
  position: relative;
  top: 10px;
  /* left: 2px; */
  line-height: 20px;
  font-size: 20px;
}

.modal-mask {
  color: black;
  position: fixed;
  z-index: 4999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 300px;
  /* height: 580px; */
  margin: 0px auto;
  padding: 15px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  z-index: 9999;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin-top: 20px;
}

.modal-default-button {
  float: right;
  position: relative;
  top: 0;
  right: 0;
  /* top: 10px;
  right: 10px; */
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
