import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import EventeraEdit from './views/EventeraEdit.vue'
import UserDetails from '@/components/user/UserDetails.vue';
import UserBasics from '@/components/user/UserBasics.vue';
import UserPicture from '@/components/user/UserPicture.vue';
import UserLocation from '@/components/user/UserLocation.vue';
import UserEventera from '@/components/user/UserEventera.vue';
import UserProfilePage from '@/components/user/UserProfilePage.vue';

// import LoggedUser from '@/components/user/LoggedUser.vue'
import EventeraApp from './views/EventeraAppPage.vue'
import EventeraDetails from './views/EventeraDetails.vue'
// import EventeraCategory from '@/components/EventeraCategory.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/eventera/',
      name: 'EventeraApp',
      component: EventeraApp,
    },
    {
      path: '/eventera/edit/:id?',
      name: 'editEventera',
      component: EventeraEdit,
    },
    {
      path: '/eventera/:id',
      name: 'EventeraDetails',
      component: EventeraDetails,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    // User Routes
    {
      path: '/user/',
      component: UserDetails,
      children: [
        { path: '/', component: UserBasics },
        { path: 'basics', component: UserBasics },
        { path: 'picture', component: UserPicture },
        { path: 'location', component: UserLocation },
        { path: 'eventera', component: UserEventera },

      ]
    },
    {
      path: '/user/:id', component: UserProfilePage
    },
    // { path: '*', component: PageNotFound } // TODO: needs implementing!
  ]
})
