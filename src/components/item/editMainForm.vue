<template>
<div id="root">
  <b-row>
    <b-col cols="12" offset=0>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Immobile Main" name="first">
          <el-card class="box-card">
            <b-row>
              <b-col cols="10">
                <div v-if="!getItem.data"></div>
                <div v-else>
                  <b-form class="needs-validation" id="validated-form">
                    <div class="form-group">
                      <div class="row">
                        <label for="nome" class="col-2">Nome Immobile</label>
                        <div class="col-9">
                          <b-input 
                            id="nome"
                            name="nome"
                            class="form-control"
                            placeholder="Nome Immobile" 
                            :value="getItem.data[0].nome"
                            @input="updateFieldState('nome', $event)"
                            required
                          >
                          </b-input>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <label for="textarea" class="col-2">Descr Immobile</label>
                        <div class="col-9">
                          <b-form-textarea
                            id="textarea"
                            name="descrizione"                                    
                            placeholder="Descrizione Immobile"
                            rows="3"
                            max-rows="6"
                            :value="getItem.data[0].descrizione"
                            @input="updateFieldState('descrizione', $event)"
                            required
                          ></b-form-textarea>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <label for="id" class="col-2">Contratto</label>
                        <div class="col-2">
                          <b-form-select 
                            id="contratto"
                            name="id_contratto"
                            :value="getItem.data[0].id_contratto"
                            @change="updateFieldState('id_contratto', $event)"
                            required
                          >
                            <option 
                              disabled
                              :value="getItem.data[0].id_contratto">{{getItem.data[0].contratto}}
                            </option>
                            <option
                              v-for="(item, index) in contratti.data"
                              :key="index"
                              :value="item.id"                              
                            >{{item.contratto}}</option>
                          </b-form-select>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <label for="id" class="col-2">Tipo Immobile</label>
                        <div class="col-2">
                          <b-form-select 
                            id="tipologia"
                            name="id_tipologia"
                            :value="getItem.data[0].id_tipologia"
                            @change="updateFieldState('id_tipologia', $event)"
                            required
                          >
                            <option
                              disabled
                              :value="getItem.data[0].id_tipologia">{{getItem.data[0].tipo_immobile}}
                            </option>
                            <option
                              v-for="(item, index) in tipologia.data" 
                              :key="index"
                              :value="item.id"
                            >{{item.tipo_immobile}}</option>
                          </b-form-select>
                        </div>
                      </div>
                    </div>
                  </b-form>
                </div>
              </b-col>
            </b-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Immobile Sub" name="second">
          <el-card class="box-card">
            <b-row>
              <b-col cols="10">
                <div v-if="!getSubItem.data || !getPriceItem.data"></div>
                <div v-else>
                  <b-form class="needs-validation" id="validated-form">
                    <div class="form-group">
                      <div class="row">
                        <!-----WORKING HERE -->
                        <label for="citta" class="col-2">Sel. Città</label>                                
                        <div class="col-2">
                          <b-form-select 
                            v-model="selectedCity"
                            name="selectedCity" 
                            @change="filterZones(selectedCity)"
                            required
                          >
                            <option
                              disabled
                              :value="getSubItem.data[0].citta"
                            >{{ getSubItem.data[0].citta }}</option>
                            <option v-for="(item, index) in citta" :key="index">{{item}}</option>
                          </b-form-select>
                        </div>                               
                        <div class="col-2">
                          <b-form-select
                            name="id_zona"
                            :value="getItem.data[0].id_zona"                            
                            v-if="selectedCity != -1"
                            @input="updateFieldState('id_zona', $event)"
                            required
                          >
                            <option
                              disabled
                              :value="getSubItem.data[0].zone"
                            >{{ getSubItem.data[0].zone }}</option>
                            <option v-for="(item, index) in zones" :key="index" :value="item.id">{{item.zone}}</option>
                          </b-form-select>
                          </div>
                      </div>                           
                      <hr>
                      <div class="row">
                        <label for="mq" class="col-2">Mq</label>                                
                        <div class="col-1">
                          <b-input 
                            id="mq"
                            name="mq"
                            placeholder="Mq" 
                            :value="getSubItem.data[0].mq"
                            @change="updateFieldState('mq', $event)"
                            required
                          ></b-input>
                        </div>
                        <label for="stanze" class="col-1 offset-1">Stanze</label>
                        <div class="col-2">
                          <b-input 
                            id="stanze"
                            name="stanze"
                            type="number" 
                            placeholder="Stanze" 
                            :value="getSubItem.data[0].stanze"
                            @change="updateFieldState('stanze', $event)"
                            required
                          ></b-input>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <label for="bagni" class="col-2">Bagni</label>
                        <div class="col-1">
                          <b-input 
                            id="bagni"
                            name="bagni"
                            type="number"
                            placeholder="Bagni"
                            :value="getSubItem.data[0].bagni"
                            @change="updateFieldState('bagni', $event)"
                            required
                          ></b-input>
                        </div>
                        <label for="prezzo" class="col-1 offset-1">Prezzo</label>
                        <div class="col-2">
                          <b-input 
                            id="prezzo"
                            name="prezzo" 
                            placeholder="Prezzo" 
                            :value="getPriceItem.data.prezzo"
                            @change="updateFieldState('prezzo', $event)"
                            required
                          ></b-input>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <label for="prezzo_prec" class="col-2">Prezzo Ribassato</label>                                
                        <div class="col-1">
                          <b-input 
                            id="prezzo_prec" 
                            placeholder="Stanze" 
                            :value="getPriceItem.data.prezzo_prec"
                            @change="updateFieldState('prezzo_prec', $event)"
                            prezzo
                          ></b-input>
                        </div>
                        <label for="expences" class="col-1 offset-1">Spese Acc</label>                                
                        <div class="col-2">
                          <b-input 
                            id="expences"
                            placeholder="Stanze"
                            name=""
                            :value="getPriceItem.data.spese_accessorie"
                            @change="updateFieldState('spese_accessorie', $event)"
                          ></b-input>
                        </div>
                      </div>
                      <hr>
                    </div>
                    <hr>
                  </b-form>
                </div>
              </b-col>
            </b-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Dettagli Immobile" name="third">
          <el-card class="box-card">
            <b-row>
              <b-col cols="8">
                <div v-if="!getDetailItem.data"></div>
                <div v-else>
                  <b-form class="needs-validation" id="validated-form">
                      <div class="form-group">
                        <div class="row">
                          <label for="numero_locali" class="col-2">Numero Totale Locali</label>                                
                          <div class="col-3">
                            <b-input id="numero_locali" type="number" placeholder="Stanze" v-model="getDetailItem.data[0].numero_locali"></b-input>
                          </div>
                          <label for="anno" class="col-2 offset-1">Anno Costruzione</label>
                          <div class="col-3">
                            <b-form-select 
                              id="anno"
                              name="id_anno"
                              :value="getDetailItem.data[0].id_anno"
                              @change="updateFieldState('id_anno', $event)"
                              required
                            >
                              <!-- {{ showAll ? 'Show All' : 'Sho All' }} -->
                              <option v-if="anno"
                                disabled
                                :value="getDetailItem.data[0].id_anno == anno.data.id ? anno.data.anno: null">{{anno.data.anno}}
                              </option>
                              <option 
                                v-for="(item, index) in anno.data" 
                                :key="index"
                                :value="item.id"
                              >{{item.anno}}</option>
                            </b-form-select>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <!-- moved year here -->
                          <label for="condizioni" class="col-2">Condizioni</label>
                          <div class="col-3">
                            <b-form-select 
                              id="condizioni"
                              name="id_stato_immobile"
                              :value="getDetailItem.data[0].id_stato_immobile"
                              @change="updateFieldState('id_stato_immobile', $event)"
                              required
                            >
                              <option 
                                disabled
                                :value="getDetailItem.data[0].id_stato_immobile == condizioni.data.id ? condizioni.data.condizione: null">{{condizioni.data.condizione}}
                              </option>
                              <option 
                                v-for="(item, index) in condizioni.data" 
                                :key="index"
                                :value="item.id"
                              >{{item.condizione}}</option>
                            </b-form-select>
                          </div>
                          <label for="arredamento" class="col-2 offset-1">Arredato</label>
                          <div class="col-4">
                            <b-form-select 
                              id="arredamento"
                              name="id_arred"
                              :value="getDetailItem.data[0].id_arred"
                              @change="updateFieldState('id_arred', $event)"
                              required
                            >
                              <option 
                                disabled
                                :value="getDetailItem.data[0].id_arred == arredamento.data.id ? arredamento.data.arredamento : null">{{arredamento.data.arredamento}}
                              </option>
                              <option 
                                v-for="(item, index) in arredamento.data" 
                                :key="index"
                                :value="item.id"
                              >{{item.arredato}}</option>
                            </b-form-select>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <label for="riscaldamento" class="col-2">Riscaldamento</label>
                          <div class="col-3">
                            <b-form-select 
                              id="riscaldamento"
                              name="id_riscaldamento"                            
                              :value="getDetailItem.data[0].id_riscaldamento"
                              @change="updateFieldState('id_riscaldamento', $event)"
                              required
                            >
                              <option 
                                disabled
                                :value="getDetailItem.data[0].id_riscaldamento == riscaldamento.data.id ? riscaldamento.data.riscaldamento: null">{{riscaldamento.data.riscaldamento}}
                              </option>                             
                              <option 
                                v-for="(item, index) in riscaldamento.data" 
                                :key="index"
                                :value="item.id"
                              >{{item.riscaldamento}}</option>
                            </b-form-select>
                          </div>
                          <label for="classe_energetica" class="col-2 offset-1">Classe Energetica</label>
                          <div class="col-4">
                            <b-form-select 
                              id="select"
                              name="id_classe_energetica"
                              :value="getDetailItem.data[0].id_classe_energetica"
                              @change="updateFieldState('id_classe_energetica', $event)"
                              required
                            >
                              <option
                                disabled
                                :value="getDetailItem.data[0].id_classe_energetica == classe_energetica.data.id ? classe_energetica.data.id_classe : null">{{classe_energetica.data.id_classe}}
                              </option>
                              <option 
                                v-for="(item, index) in classe_energetica.data" 
                                :key="index"
                                :value="item.id"
                              >{{item.nome_classe}}</option>
                            </b-form-select>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <label for="ascensore" class="col-2">Ascensore</label>
                          <div class="col-2">
                            <el-switch
                              :value="getDetailItem.data[0].ascensore"
                              @change="updateFieldState('ascensore', $event)"
                              inactive-value="0"
                              active-value="1"                              
                            ></el-switch>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <label for="postp-auto" class="col-2">Posto Auto</label>
                          <div class="col-2">
                            <el-switch 
                              :value="getDetailItem.data[0].posto_auto"
                              @change="updateFieldState('posto_auto', $event)"
                              inactive-value="0"
                              active-value="1"
                            ></el-switch>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <label for="box-auto" class="col-2">Box Auto</label>
                          <div class="col-2">
                            <el-switch 
                              :value="getDetailItem.data[0].box_auto"
                              @change="updateFieldState('box_auto', $event)"
                              inactive-value="0"
                              active-value="1"
                            ></el-switch>
                          </div>
                          <label for="box_auto_mq" class="col-2">Box Mq</label>
                          <div class="col-2">
                            <b-input id="box_auto_mq" 
                              v-model="getDetailItem.data[0].box_auto_mq"
                              :value="getDetailItem.data[0].box_auto_mq"
                              @input="updateFieldState('box_auto_mq', $event)"
                            ></b-input>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <label for="giardino" class="col-2">Giardino</label>
                          <div class="col-2">
                            <el-switch 
                              :value="getDetailItem.data[0].giardino"
                              @change="updateFieldState('giardino', $event)"
                              inactive-value="0"
                              active-value="1"
                            ></el-switch>
                          </div>
                          <label for="giardino_mq" class="col-2">Giardino mq</label>
                          <div class="col-2">
                            <b-input id="giardino_mq" 
                              placeholder="Giardino Mq"
                              :value="getDetailItem.data[0].giardino_mq"
                              @change="updateFieldState('giardino_mq', $event)"
                            ></b-input>
                          </div>
                        </div>
                        <hr>
                    </div>                            
                  </b-form>
                </div>
              </b-col>
            </b-row>            
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </b-col>
  </b-row>
  <div class="row">
    <div class="col-2 offset-2">
      <b-button @click="updateData()" variant="primary" btn-block>&nbsp;&nbsp;Salva&nbsp;&nbsp;</b-button>   
    </div>
    <div class="col-2">
      <b-button @click="confirmLeave()" variant="primary" btn-block>&nbsp;&nbsp;Finito&nbsp;&nbsp;</b-button>   
    </div>
      <b-col class="col-2">
        <b-button @click="editImg()" variant="primary">Immagini</b-button>
      </b-col>
      <div class="col-2">
        <b-button @click="deleteEstate()" variant="danger" btn-block>Cancella</b-button>   
      </div>
  </div>
</div>

</template>

<script>
import funcs from '../../lib/js/funcs.js'
import myR from '../../lib/js/funcsRamda.js'

import { mapGetters } from 'vuex'

export default {
  name: 'editMainForm',
  data() {
    return {
      zones: [],
      selectedCity:-1,
      selectedOption:'',
      activeName: 'first'
    }
  },
  created: function () {
    let _id = this.$route.params.id
    this.$store.subscribe((mutation) => {
      if(mutation.type == 'data_store/_updateFieldState') {
        let payload = {}
        //if(mutation.payload.with == 'building-sub-form') {}
        console.log('mutation type')
        if(mutation.payload.name == 'id_contratto') {
          //console.log('mutation payload!')
          payload = this.mutObj('item', 'contratto', myR.getTableValue(this.contratti.data, mutation.payload.value))
          this.$store.commit('data_store/_updateFieldState', payload)
        } else if (mutation.payload.name == 'id_tipologia') {
            payload = this.mutObj('item', 'tipo_immobile', myR.getTableValue(this.tipologia.data, mutation.payload.value))
            this.$store.commit('data_store/_updateFieldState', payload)
        }
      }
    })
  },
  mounted: function() {
    
  },
  computed: {
    ...mapGetters({
      /* data store getters */
      getItem: 'data_store/getItem',
      getSubItem: 'data_store/getSubItem',
      getDetailItem: 'data_store/getDetailItem',
      getPriceItem: 'data_store/getPriceItem',
      /*sub tables getters */
      contratti: 'tables_store/tblContr',
      stato: 'tables_store/tblStato',
      tipologia: 'tables_store/tblTipo',
      sub_estate: 'data_store/getSubItem',
      anno: 'tables_store/tblAnno',
      arredamento: 'tables_store/tblArred',
      classe_energetica: 'tables_store/tblClassEnerg',
      condizioni: 'tables_store/tblCond',
      riscaldamento: 'tables_store/tblRisc',
      zone: 'tables_store/tblZone',
    }),
    citta() {
      return this.filterCities()
    }
  },
  mounted: function() {  
    //this.generate_form()
    //this.filterCities()
    console.log('find last action')
    
  },
  updated() {
    console.log("updated")
  },  
  methods: {
    filterCities: function() {
      console.log('filtering cities')
      return myR.filterCities(this.zone.data)
    },
    filterZones: function(citta) {
      return this.zones = myR.filterZones(this.zone.data, citta)
      //console.log(myR.filterZones(this.zone.data, citta))
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    selectZone:function() {
      this.selectedOption = ''
    },
    select: function(event){ 
      let targetId = event.currentTarget.id
      //console.log(targetId)
      alert(targetId)
    },
    mutObj: function(_state, val, _value) {
      return {
        state: _state,
        name: val,
        value: _value
      }  
    },
    async updateData () {
      let id = this.$route.params.id
      let reduce_main_data = myR.omit(['contratto', 'data_modifica', 'data_pubblicazione', 'status', 'tipo_immobile'], this.getItem.data[0])
      let main_data = funcs.updateData(reduce_main_data, 'update_main_estate', id)
      let sub_data = funcs.updateData(this.getSubItem.data[0], 'update_sub_estate', id)
      let price_data = funcs.updateData(this.getPriceItem.data, 'update_price_estate', id)
      let reduce_detail_data = myR.omit(['arredato', 'condizione', 'riscaldamento'], this.getDetailItem.data[0])
      let detail_data = funcs.updateData(reduce_detail_data, 'update_detail_estate', id)
      
      await Promise.all([main_data, sub_data, price_data, detail_data])
      this.$root.$emit('edit-status', 'saved')
      //funcs.updateData(main_data, 'update_main_estate', id)
      //update_detail_estate
      //update_price_estate
      //update_sub_estate
      //update_status
      //update_date_mod
    },
    updateFieldState(val, event) {
      let payload = {}
      switch(val) {
        case 'nome':
        case 'descrizione':
        case 'id_contratto':
          //console.log(myR.getTableValue(this.contratti.data, event))
        case 'id_tipologia':
          //Object.assign(payload, {state: 'item', name: val, value: event})
          this.$root.$emit('edit-status', 'not-saved')
          payload = this.mutObj('item', val, event)
          return this.$store.commit('data_store/_updateFieldState', payload)
        break
        case 'id_zona':
        case 'stanze':
        case 'mq':
        case 'bagni':
          //Object.assign(payload, {state: 'sub_item', name: val, value: event})
          this.$root.$emit('edit-status', 'not-saved')
          payload = this.mutObj('sub_item', val, event)
          return this.$store.commit('data_store/_updateFieldState', payload)
        break
        case 'prezzo':
        case 'prezzo_prec':
        case 'spese_accessorie':
          //Object.assign(payload, {state: 'prices', name: val, value: event})
          this.$root.$emit('edit-status', 'not-saved')
          payload = this.mutObj('prices', val, event)
          return this.$store.commit('data_store/_updateFieldState', payload)
        break
        case 'id_anno':
        case 'id_stato_immobile':
        case 'id_arred':
        case 'id_riscaldamento':
        case 'id_classe_energetica':
        case 'ascensore':
        case 'posto_auto':
        case 'box_auto':
        case 'box_auto_mq':
        case 'giardino':
        case 'giardino_mq':
          //Object.assign(payload, {state: 'detail_item', name: val, value: event})
          this.$root.$emit('edit-status', 'not-saved')
          payload = this.mutObj('detail_item', val, event)
          return this.$store.commit('data_store/_updateFieldState', payload)
        break
      }
    },
    /*
    this.$store.commit('data_store/updateMessage', val)
    ...mapMutations(['data_store/addEstateMain']),
    */
  }    
}
</script>


                

