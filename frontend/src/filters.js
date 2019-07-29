import Vue from 'vue';
import moment from 'moment'

Vue.filter('capitalize', value => {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1) + ' ';
});

Vue.filter('timeAgo', ms => {
    return moment(ms).fromNow()
});

Vue.filter('meterToKM', num => {
    const km = (num / 1000).toFixed(1);
    if (km < 1) return ' < 1km'
    if (km > 50) return ' > 50km'
    return `${km} km away`
});
Vue.filter('imgSrc', url => {
    if(url){
        if(url.includes('http')) return 'https' + url.subString(5) 
        else {
            return  process.env.BASE_URL + url
        }
    } else return '';
})

