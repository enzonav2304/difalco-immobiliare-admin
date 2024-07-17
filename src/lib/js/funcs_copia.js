/* init */

import store from '../../store/index.js'
import myR from './funcsRamda.js'
import { bus } from '../../main'

const main_store = store.state.main_store
const myGetters = store.getters
const getBoardById = store.getters['main_store/new_tasks/getBoardById']

let base_url = 'https://www.difalcoimmobiliare.it/api'
let url = base_url + '/index.php/is_controller'

export default {
  foo: function () { 
    console.log('foo')
  },
  /* fetch data function */
  fetchDetailItemTables: function() {
    store.dispatch('tables_store/storeDetailItemTables')
  },
  fetchId: function(_url) {
    //const my_url = url + '/last_id'
    //console.log(_url)
    console.log('funcs fetch id')
    return store.dispatch('data_store/storeLastId', this.objUrl(_url))
  },
  fetchImages: function(id) {
    console.log('call fetchImages')
    store.dispatch('data_store/storeImages', {'id': id})
  },
  fetchItemAll: function(payload) {
    bus.$emit('test')
    console.log('funcs fetchItemTable -> call id: ' + payload.id)
    store.dispatch('data_store/storeItemAll', payload)
  },
  fetchMainTable: function(_url) {
    //store.commit('mutate', this.mutObj('status', 'fetching'))
    store.dispatch('data_store/storeMainData', this.objUrl(_url))
    //store.commit('mutate', this.mutObj('status', 'idle'))  
  },
  fetchNumRows: function(_url) {
    return store.dispatch('storeNumRows', this.objUrl(_url))
  },
  
  fetchSubItemTables: function() {
    console.log('funcs fetchSubItemTables -> call')
    store.dispatch('tables_store/storeSubItemTables')
  },  
  /* insert data function */
  async insertDataNew(data, action) {
    let payload = {}
    payload.data = data
    //console.log(data)
    payload.action = action
    console.log('funcs control')
    return store.dispatch('data_store/postData', payload)
  },
  insertData: function(data){    
    return store.dispatch('postMainData', data)
  },
  insertImages: function(data){    
    return store.dispatch('data_store/postImages', data)
  },
  /* updatet data function */  
  updateDateMod: function(id) {
    return store.dispatch('updateDateMod', id)
  },
  updateDetailData: function(data, id) {
    //console.log(data)
    return store.dispatch('updateDetailData', {data, id})
  },
  updateData: function(_data, _url, _id) {
    let payload = {}
    Object.assign(payload, {data: _data, url: _url, id: _id})
    console.log(payload)
    return store.dispatch('data_store/updateDataNew', payload)
  },
  updateMainData: function(data, id) {
    //console.log(data)
    return store.dispatch('updateMainData', {data, id})
  },
  updatePriceData: function(data, id) {
    console.log(id)
    return store.dispatch('updatePriceData', {data, id})
  },
  updateSubData: function(data, id) {
    console.log(id)
    return store.dispatch('updateSubData', {data, id})
  },  
  updateStatus: function(_id, _id_status) {
    console.log('function')
    console.log(_id + ' '  + _id_status)
    let payload = {id: _id, id_status: _id_status}
    return store.dispatch('updateStatus', payload)
  },
  /* others/testing functions */
  resetItemData: function() {
    store.commit('data_store/_setItemsState', this.mutObj('items', []))
    console.log('empty main table')
    this.fetchMainTable('estates_main')
    console.log('fetch main table')
  }, 
  resetMainData: function(query) {
    store.commit('_setItemsState', this.mutObj('item', []))
    store.commit('_setItemsState', this.mutObj('sub_item', []))
    store.commit('_setItemsState', this.mutObj('detail_item', []))
    store.commit('_setItemsState', this.mutObj('prices', []))
    console.log('empty item data tables')    
  },

  /* old functions */
  delImage: function(_url) {
    console.log(url)
    store.dispatch('deleteImage', {url: _url})
    //store.dispatch('deleteImage', {this.objId(payload)})    
  },
  deleteRecord: function (id) {
    console.log('delete function')
    let payload = this.objId(id)
    store.dispatch('deleteMainRecord', payload)
    store.dispatch('deletePriceRecord', payload)
    store.dispatch('deleteImagesRecord', payload)
    this.sendNotification('warning', 'Immobile cancellato con successo')
  },  

  /* helpers functions  */ 

  stringObject: function (string, start, end) {
    let y = string.indexOf(start)
    let t = string.lastIndexOf(end)
    let str = string.slice(y, t)
    return str
  },
  splitArray: function() {
    Array.prototype.chunk = function(size) {
      let result = []
      while(this.length) {
        result.push(this.splice(0, size))
      }
      return result
    }
  },
  helperObject: function(obj){
    try {
      for(let s = 0; s < obj.length; s++) {
        console.log('array style')
      }
    } catch(e) {
      for(let t in obj) {
        console.log('object style')
      }
    } finally {
      console.log(typeof obj) 
    } 
  },
  randomId: function() {
    let x = null
    return x = Math.random()
  },
  modalObj: function(_type, _main_msg, _succ_msg, _catch_msg) {
    return {
      type: _type,
      msg: _main_msg,
      succ_msg: _succ_msg,
      catch_msg: _catch_msg
    }
  },
  notifyObj: function(_type, _msg) {
    return {
      type: _type,
      msg: _msg
    }
  },
  mutMsg: function(prop, type_msg, msg) {
    return {
      property: prop,
      type: type_msg,
      with: msg
    }
  },
  mutObj: function(prop, value, boardId, taskId) {
    if(arguments[2] && arguments[3]) {
      return {
        property: prop,
        with: value,
        id_board: boardId,
        id_task: taskId
      }
    } else {
      return {
        property: prop,
        with: value
      }
    }    
  },
  numRecords: function() {
    return myR.lengthObj(myGetters.getItems)
  },
  objId: function(id) {
    return {'id': id}
  },
  objUrl: function(_url) {
    return {'url': url + '/' + _url}
  },
  reloadApp: function() {
    //alert('refreshing')
    console.log('empting data...')
    store.dispatch('setEmptyMainTable')
    console.log('app empty')
    //console.log('fetching data data...')
    //this.fetchMainTable('estates_main')
  } 
  
}