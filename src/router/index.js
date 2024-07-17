import Vue from 'vue'
import Router from 'vue-router'
import Callback from '../components/authentication/Callback.vue'

/* login */

//import noPage from '../views/test/noPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/admin/',
  routes: [
    /* login */
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },    
    { 
      path: '/', 
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../components/home/compHome.vue')      
    },
    { 
      path: '/home', 
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "home" */ '../components/home/compHome.vue')      
    },
    { 
      path: '/edit-item/:id',
      name: 'Modifica Immobile', 
      component: () => import(/* webpackChunkName: "home" */ '../components/item/compEditItem.vue')
    },
    { 
      path: '/edit-img/:id',
      name: 'Modifica Immagini', 
      component: () => import(/* webpackChunkName: "home" */ '../components/dropbox/dropBoxSelector.vue')
    },
    { 
      path: '/insert/:step',
      name: 'Inserimento Immobile', 
      component: () => import(/* webpackChunkName: "home" */ '../components/item/compFormInsert.vue')
    },
    { 
      path: '/manage/:type',
      name: 'Gestione Sito', 
      component: () => import(/* webpackChunkName: "home" */ '../components/manage/compManageSite.vue')
    },    
    { 
      path: '/view-item/:id',
      name: 'Dettagli Immobile', 
      component: () => import(/* webpackChunkName: "home" */ '../components/item/compViewItem.vue')
    }       
  ]
})
// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if(to.name == 'callback') { // check if "to"-route is "callback" and allow access
    //console.log('here')
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    //console.log('user authenticated')
    next()
  } else { // trigger auth0's login.
  console.log('user not authenticated')
    router.app.$auth.login()
  }
})

export default router

