
import Axios from 'axios'
import rateLimit from 'axios-rate-limit'
import funcs from '../../lib/js/funcs.js'

import { bus } from '../../main'

let base_url = 'https://www.difalcoimmobiliare.it/api'
let url = base_url + '/index.php/is_controller'

const http = rateLimit(
  Axios.create(), { 
    maxRequests: 2, 
    perMilliseconds: 1000, 
    maxRPS: 2 
  }
)
http.setMaxRPS(4)

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
  getters: {
    getId: state => state.id,
    getItem: state => state.item,
    getSubItem: state => state.sub_item,
    getDetailItem: state => state.detail_item,
    getPriceItem: state => state.prices,
    getImages: state => state.images,
    getItems: state => state.items,    
    getNumRows: state => state.num_rows
  },
  mutations: {
    _updateFieldState(state, payload) {
      try {
        state[payload.state].data[0][payload.name] = payload.value
      } catch (e) {
        state.prices.data[payload.name] = payload.value
      }
    },
    _setItemsState(state, payload) {
      state[payload.property] = payload.with
    },
    _emptyMainTable(state) {
      state.items = null
    },
    _sortItemsAsc(state, sortKey) {      
      console.log('running sort mutation')
      let items = state.items
      items.sort((a, b) => {
          let compare = 0
          if (a[sortKey] > b[sortKey]) {
              compare = 1
          } else if (b[sortKey] > a[sortKey]) {
              compare = -1
          }
          return compare
      })      
      state.items = items
    }
  },
  actions: {    
    /*delete actions
    del_image/' + payload.url
    del_images_estate/' + payload.id
    del_estate/' + payload.id
    /del_price_estate/' + payload.id
    */
    deleteItem_old({commit}, payload) {
      console.log(payload)
      let sub_url = '/del_estate/' + payload.id
      console.log(payload)
      Axios
        .delete(url + sub_url)
        .then(
          bus.$emit('notify', funcs.notifyObj('success', 'Operazione eseguita con successo'))
        )
        .catch(errors => {
          bus.$emit('notify', funcs.notifyObj('error', "Si è verificato un'errore"))
          console.log(errors)
        })
    },
    deleteItem({commit}, payload) {
      /*delete actions
      del_image/' + payload.url
      del_images_estate/' + payload.id
      del_estate/' + payload.id
      /del_price_estate/' + payload.id
      */
      let sub_url = null      
      sub_url = '/' + payload.url + '/' + payload.id   
      Axios
        .delete(url + sub_url)
        .then(
          bus.$emit('notify', funcs.notifyObj('success', 'Operazione eseguita con successo'))
        )
        .catch(errors => {
          bus.$emit('notify', funcs.notifyObj('error', "Si è verificato un'errore nella cancellazione"))
          console.log(errors)
        })
    },

    /* post functions */
    postImages({commit, dispatch}, payload) {
      Axios
        .post(
          url + '/add_images',
          payload
        )
        .then(response => {
          let message = response.data.message
          if(message === 'success') {
            console.log('Immagine inserita con successo')
          }
        })
        .catch(errors => {
          funcs.sendNotification('error', errors)  
        })

    },
    postData({commit, dispatch}, payload){
      //console.log(payload)      
      Axios
        .post(
          url + '/' + payload.action, 
          payload.data
        )
        .then(response => {
          let message = response.data.message
          if(message === 'success') {
            if(payload.action === 'add_estate') {
              console.log('store action: item inserted')
              funcs.fetchData('id', 'last_id', null)
            }
            bus.$emit('notify', funcs.notifyObj('success', 'Operazione eseguita con successo'))
          }
        })
        .catch(errors => {
          console.log('Errore nell inserimento dei dati')
        })
    },    
    storeData({commit}, payload){      
      //console.log(payload)
      let sub_url = null
      if(payload.id) {
        sub_url = '/' + payload.url + '/' + payload.id
      } else {
        sub_url = '/' + payload.url
      }
      Axios       
        .get(url + sub_url)
        .then(response => {
          const data = response.data
          commit('_setItemsState', funcs.mutObj(payload.state, data))
          console.log('Fetch dati eseguito con succcesso')
          //bus.$emit('notify', funcs.notifyObj('success', 'Operazione eseguita con successo'))
        })
        .catch(errors => {
          bus.$emit('notify', funcs.notifyObj('error', "Si è verificato un'errore"))
          console.log(errors)
          //commit('mutate', funcs.mutObj('status', 'error'))
        })      
    },    
    storeItemAll({dispatch, commit}, payload) {
      //commit('mutate', funcs.mutObj('status', 'fetching'))
      let api_main_table = url + '/view_estate_main/' + payload.id
      let api_sub_table = url + '/view_estate_sub/' + payload.id
      let api_price_table = url + '/estate_price/' + payload.id
      let api_detail_table = url + '/view_estate_detail/' + payload.id
      //let api_detail_table_rel = url + '/view_estate_detail_rel/' + payload.id

      const request_main_table = http.get(api_main_table)
      const request_sub_table = http.get(api_sub_table)
      const request_price_table = http.get(api_price_table)
      const request_detail_table = http.get(api_detail_table)
      
      Axios.
        all([
          request_main_table,
          request_sub_table,
          request_price_table,
          request_detail_table            
        ])
        .then(
          Axios.spread((...data) => {
            commit('_setItemsState', funcs.mutObj('item', data[0]))
            commit('_setItemsState', funcs.mutObj('sub_item', data[1]))
            commit('_setItemsState', funcs.mutObj('prices', data[2]))
            commit('_setItemsState', funcs.mutObj('detail_item', data[3]))
            //commit('mutate', funcs.mutObj('loaded_item', true))
            //commit('mutate', funcs.mutObj('loaded_sub_item', true))
            //commit('mutate', funcs.mutObj('loaded_detail_item', true))
          })
        ).catch(errors => {
          console.log(errors)
        })
      //commit('mutate', funcs.mutObj('status', 'idle'))
    },
    countAsyncObj({commit}, payload) {      
      let sub_url = null
      if(payload.id) {
        sub_url = '/' + payload.url + '/' + payload.id
      } else {
        sub_url = '/' + payload.url
      }
      Axios        
        .get(url + sub_url)      
        .then(response => {
          const data = response.data
          if(data === 0) {
            console.log('check async num obj')
            //commit('mutate', funcs.mutObj('empty_db', true))
            //funcs.sendNotification('warning', 'Nessun immobile inserito!') 
          } else {
            //console.log('check db status -> num records > 0')
            //commit('mutate', funcs.mutObj('empty_db', false))
          }
          //commit('_setItemsState', funcs.mutObj('num_rows', data))                           
        })
        .catch(errors => {
          //funcs.sendNotification('error', errors)
        })
    },
    /* update actions */  
    updateDataNew({commit, dispatch}, payload) {
      Axios
        .put(
          url + '/' + payload.url + '/' + payload.id,
          payload.data,
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log("Update Success")
            bus.$emit('notify', funcs.notifyObj('success', 'Operazione eseguita con successo')) 
            //funcs.sendNotification('success', 'Immobile Main modificato con successo') 
          }
        })
        .catch(errors => {
          console.log('update error') 
        })
    } 
    
  }  
}
