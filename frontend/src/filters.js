import Vue from 'vue';
import moment from 'moment'

Vue.filter('capitalize', value => {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('timeAgo', ms => {
    return moment(ms).fromNow()
});