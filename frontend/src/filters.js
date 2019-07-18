import Vue from 'vue';

Vue.filter('capitalize', value => {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter('meterToKM', num => {
    const km = (num / 1000).toFixed(1);
    if (km < 1) return '<1km'
    if (km > 50) return '>50km'
    return `${km}km away`
});

