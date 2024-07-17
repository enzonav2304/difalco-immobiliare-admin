
import Axios from 'axios'
import rateLimit from 'axios-rate-limit'
import funcs from '../../lib/js/funcs.js'

import { bus } from '../../main'

let base_url = 'https://www.difalcoimmobiliare.it/api'
let url = base_url + '/index.php/is_controller'



export default {
  namespaced: true,
  state: {
    id: null,
    isFetching: false,
    images: [],
    item: [],
    items: [],
    sub_item: [],
    detail_item: [],
    prices: [],
    num_rows: null,
    //item_loaded: false,
    filtered_items: []
  },
  
 
  actions: {    
    
    /* store  functions */
    storeImages({commit, dispatch}, payload) {
      const id = payload.id 
      console.log(id)
      //'view_images/' + 
      //num_rows_imgs/4
      Axios
        .get(url  + '/num_rows_imgs/' + id)
        .then(response => {
          const data = response.data
          if(data > 0) {
            console.log('imgs exists')            
          }
        })
        .catch(errors => {
          //console.log('imgs not found')
        })
        /*
        Axios
        .get(url  + '/view_images/' + id)
        .then(response => {
          const data = response.data
          commit('_setItemsState', funcs.mutObj('images', data))
        })
        */
    },
    
    storeLastId({commit}, payload) {//last_id
      const url = payload.url      
      Axios        
        .get(url)
        .then(response => {
          const data = response.data
          console.log('fetch id')
          commit('_setItemsState', funcs.mutObj('id', data[0].id))  
        })
        .catch(errors => {
          //funcs.sendNotification('error', errors)
        })      
    },
    storeMainData({commit}, payload){
      const url = payload.url
      //commit('mutate', funcs.mutObj('status', 'fetching'))
      Axios       
        .get(url)
        .then(response => {
          const data = response.data
          commit('_setItemsState', funcs.mutObj('items', data))
          console.log('Main table caricata con succcesso')
          //bus.$emit('notify', funcs.notifyObj('success', 'Operazione eseguita con successo'))
        })
        .catch(errors => {
          bus.$emit('notify', funcs.notifyObj('error', "Si è verificato un'errore"))
          console.log(errors)
          //commit('mutate', funcs.mutObj('status', 'error'))
        })      
    },
    storeNumRows({commit, dispatch}, payload) {      
      const url = payload.url
      Axios        
        .get(url)
        .then(response => {
          const data = response.data
          if(data === 0) {
            console.log('check db status -> num records 0')
            //commit('mutate', funcs.mutObj('empty_db', true))
            //funcs.sendNotification('warning', 'Nessun immobile inserito!') 
          } else {
            console.log('check db status -> num records > 0')
            //commit('mutate', funcs.mutObj('empty_db', false))
          }
          //commit('_setItemsState', funcs.mutObj('num_rows', data))                           
        })
        .catch(errors => {
          funcs.sendNotification('error', errors)
        })
    },
    
    
  }  
}
