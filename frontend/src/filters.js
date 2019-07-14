import Vue from 'vue';

Vue.filter('capitalize', value => {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});