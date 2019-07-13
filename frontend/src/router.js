import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EventeraEdit from './views/EventeraEdit.vue'
import UserDetails from '@/components/user/UserDetails.vue';
import UserBasics from '@/components/user/UserBasics.vue';
import LoggedUser from '@/components/user/LoggedUser.vue'
import EventeraApp from './views/EventeraAppPage.vue'


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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    // User Routes
    {
      path: '/user/',
      // name: 'profile',
      component: UserDetails,
      children: [
        {
          path: 'basics',
          // name: 'profile',
          component: UserBasics
        },
      ]
    }
  ]
})
