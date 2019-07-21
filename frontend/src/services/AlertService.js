import Vue from 'vue';

// THIS SERVICE CAN BE MADE A BIT MORE MAINTAINABLE, 
// BUT I'M NOT MAKING A LIBRARY
// AN EXAMPLE - 
// w/ eventBus
// eventBus.$emit(ALERT_SUCCESS, 'a title', 'a msg')
// w/o eventBus
// this.$notify({
//   group: "alerts",
//   title: "Important message",
//   position: ["right","bottom"],
//   type: "error", // "success", "warn" are all the possibilities
//   text: "Hello user!"
// });

function success(title, msg) {
    Vue.notify({
        group: "alerts",
        title,
        position: ["right", "bottom"],
        type: "success", // "success", "warn" are all the possibilities
        text: msg
    })
}
function warn(title, msg) {
    Vue.notify({
        group: "alerts",
        title,
        position: ["right", "bottom"],
        type: "warn", // "success", "warn" are all the possibilities
        text: msg
    })
}
function err(title, msg) {
    Vue.notify({
        group: "alerts",
        title,
        position: ["right", "bottom"],
        type: "error", // "success", "warn" are all the possibilities
        text: msg
    })
}
// this.$notify({
//   group: "alerts",
//   title: "Important message",
//   position: ["right","bottom"],
//   type: "error", // "success", "warn" are all the possibilities
//   text: "Hello user!"
// });

export default {
    success,
    warn, err
}