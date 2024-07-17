import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import myR from '../lib/js/funcsRamda.js'
import funcs from '../lib/js/funcs.js'

/* modules */
import dataStore from './modules/dataStore.js'
import tablesStore from './modules/tablesStore.js'


Vue.use(Vuex, axios)

export default new Vuex.Store({
  modules: {
    data_store: dataStore,
    tables_store: tablesStore
  },

  /* root state */

  state: {
    
  },
  /* getters */
  getters: {
    
  },
  /* mutations */
  mutations: {
    mutate(state, payload) {
      state.app_state[payload.property] = payload.with
    }
  },
  /* actions */
  actions: {
    
  }
})