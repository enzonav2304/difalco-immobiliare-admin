import Axios from 'axios'
import rateLimit from 'axios-rate-limit'
import funcs from '../../lib/js/funcs.js'

const base_url = 'https://www.difalcoimmobiliare.it/api'
const url = base_url + '/index.php/is_controller/'

/*
sets max 2 requests per 1 second, other will be delayed
note maxRPS is a shorthand for perMilliseconds: 1000, and it takes precedence
if specified both with maxRequests and perMilliseconds
const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })
http.getMaxRPS() // 2
http.get('https://example.com/api/v1/users.json?page=1') // will perform immediately
http.get('https://example.com/api/v1/users.json?page=2') // will perform immediately
http.get('https://example.com/api/v1/users.json?page=3') // will perform after 1 second from the first one
// options hot-reloading also available
http.setMaxRPS(3)
http.getMaxRPS() // 3
http.setRateLimitOptions({ maxRequests: 6, perMilliseconds: 150 }) // same options as constructor
*/

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
    anno: [],
    arredamento: [],
    classe_energetica: [],
    condizioni: [],
    contratti: [],
    riscaldamento: [],
    stato: [],
    tipo: [],
    zone: []
  },
  getters: {
    tblAnno: state => state.anno,
    tblArred: state => state.arredamento,
    tblClassEnerg: state => state.classe_energetica,
    tblCond: state => state.condizioni,
    tblContr: state => state.contratti,
    tblRisc: state => state.riscaldamento,
    tblStato: state => state.stato,
    tblTipo: state => state.tipo,
    tblZone: state => state.zone
  },
  mutations: {
    _setTable(state, payload) {
      state[payload.property] = payload.with
    }
  },
  actions: {  
    storeSubItemTables ({ commit, dispatch }) {
      let api_contratti = url + 'table_contracts'
      let api_stato = url + '/table_status'
      let api_tipo = url + '/table_typology'
      let api_zone = url + '/table_location'

      const request_contratti = http.get(api_contratti)
      const request_stato = http.get(api_stato)
      const request_tipo = http.get(api_tipo)
      const request_location = http.get(api_zone)

      Axios.
        all([
        request_contratti,
        request_stato,
        request_tipo,
        request_location
      ])
      .then(
        Axios.spread((...data) => {
          commit('_setTable', funcs.mutObj('contratti', data[0]))
          commit('_setTable', funcs.mutObj('stato', data[1]))
          commit('_setTable', funcs.mutObj('tipo', data[2]))
          commit('_setTable', funcs.mutObj('zone', data[3]))
          //commit('mutate', funcs.mutObj('loaded_sub_tbl', true))
        })).catch(errors => {
          dispatch('setErrors', { errors })
          console.log(errors.stack)
          //dispatch('setActiveTablesError')
          //funcs.sendErrorNotification()
        })
    },
    storeDetailItemTables ({ commit, dispatch }) {
      let api_anno = url + '/table_years'
      let api_arredamento = url + '/table_furnitures'
      let api_classe_energetica = url + '/table_energetic_class'
      let api_condizioni = url + '/table_conditions'
      let api_riscaldamento = url + '/table_heating'

      const request_anno = http.get(api_anno)
      const request_arredamento = http.get(api_arredamento)
      const request_classe_energetica = http.get(api_classe_energetica)
      const request_condizioni = http.get(api_condizioni)
      const request_riscaldamento = http.get(api_riscaldamento)

      Axios.
        all([
          request_anno,
          request_arredamento,
          request_classe_energetica,
          request_condizioni,
          request_riscaldamento
        ])
        .then(
          Axios.spread((...data) => {
            commit('_setTable', funcs.mutObj('anno', data[0]))
            commit('_setTable', funcs.mutObj('arredamento', data[1]))
            commit('_setTable', funcs.mutObj('classe_energetica', data[2]))
            commit('_setTable', funcs.mutObj('condizioni', data[3]))
            commit('_setTable', funcs.mutObj('riscaldamento', data[4]))
            //commit('mutate', funcs.mutObj('loaded_details_tbl', true))
            
        })).catch(errors => {
          //dispatch('setErrors', { errors })
          //funcs.sendErrorNotification()
        })
      }
    }   
}