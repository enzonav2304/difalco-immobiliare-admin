<template>
<div id="root">
  <b-row>
    <b-col cols="12" offset=0>
      <b-row>
        <b-col cols="8">
          <div v-if="!item.data"></div>
          <div v-else>
            <b-card>
              <!--
              <template #header>
                <h4 class="mb-0">{{ item.data[0].nome }}</h4>
              </template>
              -->
              <!--<b-card-footer>{{ item.data[0].tipo_immobile }}</b-card-footer>-->
              <b-card-body>
                <b-card-title>{{ item.data[0].tipo_immobile }}</b-card-title>
                <!--<b-card-sub-title class="mb-2">{{ item.data[0].contratto }}</b-card-sub-title>-->              
                <b-list-group flush>                  
                  <b-list-group-item><b>Nome Immobile: </b>{{ item.data[0].nome }}</b-list-group-item>
                  <b-list-group-item><b>Contratto: </b>{{ item.data[0].contratto }}</b-list-group-item>
                  <b-list-group-item><b>Data Pubblicazione: </b>{{ item.data[0].data_pubblicazione }}</b-list-group-item>
                  <b-list-group-item><b>Data Modifica: </b>{{ item.data[0].data_modifica }}</b-list-group-item>
                  <b-list-group-item><b>Stato Immobile: </b>{{ item.data[0].status }}</b-list-group-item>
                </b-list-group>
              </b-card-body>
              <b-card-body>
                <slider />                  
              </b-card-body>
              <b-card-body>
                <b-card-text>{{ item.data[0].descrizione }}</b-card-text>  
              </b-card-body>
              <b-card-footer></b-card-footer>
                <b-list-group flush>
                  <b-list-group-item><b>Bagni: </b>{{ item_sub.data[0].bagni }}</b-list-group-item>
                  <b-list-group-item><b>Stanze: </b>{{ item_sub.data[0].stanze }}</b-list-group-item>
                  <b-list-group-item><b>Superfice: </b>{{ item_sub.data[0].mq }}</b-list-group-item>
                  <b-list-group-item><b>Citta: </b>{{ item_sub.data[0].citta }}</b-list-group-item>
                  <b-list-group-item><b>Zona: </b>{{ item_sub.data[0].zone }}</b-list-group-item>
                  <b-list-group-item><b>Prezzo: </b>{{ item_price.data.prezzo }}</b-list-group-item>
                  <b-list-group-item><b>Prezzo Ribassato: </b>{{ item_price.data.prezzo_prec }}</b-list-group-item>
                  <b-list-group-item><b>Spese Condominiali: </b>{{ item_price.data.spese_accessorie }}</b-list-group-item>
                </b-list-group>
              <b-card-footer></b-card-footer>
                <b-list-group flush>
                  <b-list-group-item><b>Anno Costruzione: </b>{{ item_detail.data[0].id_anno == 0 ? 'Non disponibile' : item_detail.data[0].anno }}</b-list-group-item>
                  <b-list-group-item><b>Totale Locali: </b>{{ item_detail.data[0].numero_locali }}</b-list-group-item>
                  <b-list-group-item><b>Arredato: </b>{{ item_detail.data[0].arredato }}</b-list-group-item>
                  <b-list-group-item><b>Classe Energetica: </b>{{ item_detail.data[0].id_classe }}</b-list-group-item>
                  <b-list-group-item><b>Riscaldamento: </b>{{ item_detail.data[0].riscaldamento }}</b-list-group-item>
                  <b-list-group-item><b>Condizioni Immobile: </b>{{ item_detail.data[0].condizione }}</b-list-group-item>
                  <b-list-group-item v-if="item_detail.data[0].ascensore == 1"><b>Ascensore: </b>Si</b></b-list-group-item>
                  <b-list-group-item v-else><b>Ascensore: </b>No</b-list-group-item>
                  <b-list-group-item v-if="item_detail.data[0].posto_auto == 1"><b>Posto Auto: </b>Si</b-list-group-item>
                  <b-list-group-item v-else><b>Posto Auto: </b>No</b-list-group-item>
                  <b-list-group-item v-if="item_detail.data[0].box_auto == 1"><b>Box Auto: </b>Si</b></b-list-group-item>
                  <b-list-group-item v-else><b>Box Auto: </b>No</b-list-group-item>
                  <b-list-group-item><b>Box Auto Mq: </b>{{ item_detail.data[0].box_auto_mq }}</b-list-group-item>
                  <b-list-group-item v-if="item_detail.data[0].giardino == 1"><b>Giardino: </b>Si</b></b-list-group-item>
                  <b-list-group-item v-else><b>Giardino: </b>No</b-list-group-item>
                  <b-list-group-item><b>Mq Giardino: </b>{{ item_detail.data[0].giardino_mq }}</b-list-group-item>
                </b-list-group>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  <hr>
  <b-row>
    <b-col cols="1" offset="1">
      <b-button @click="addNew" variant="primary">Aggiungi</b-button>
    </b-col>
    <b-col cols="1">
      <!--<b-button @click="goEdit(item.id_immobile, 'edit-item')" variant="primary">Modifica</b-button>-->
      <b-button @click="setComponent('edit-item')" variant="primary">Modifica</b-button>      
    </b-col>
    <b-col cols="1">
      <b-button @click="setComponent('edit-img')" variant="primary">Immagini</b-button>
    </b-col>
    <b-col cols="1">
      <b-button @click="modal_delete(item.id_immobile)" variant="danger">Cancella</b-button>
    </b-col>
  </b-row>
  
</div>
</template>

<script>
//setComponent('edit-item', item.id_immobile)
//setComponent: function (path, id) {
//this.$router.push(path + '/' + id)
//}, 
import slider from './slider.vue'
import funcs from '../../lib/js/funcs.js'
import myR from '../../lib/js/funcsRamda.js'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'renderItemTable',
  components: {
    slider
  },
  data: function() {
    return {
      activeName: 'first'
    }
  },
  computed: {
    ...mapGetters({
      item: 'data_store/getItem',
      item_sub: 'data_store/getSubItem',
      item_price: 'data_store/getPriceItem',
      item_detail: 'data_store/getDetailItem',
      get_images: 'data_store/getImages'
    })
  },
  created: function() {
    //funcs.testNewTask(this.id)
  },
  mounted: function() {
    console.log('renderItemTable -> mounted')
    //funcs.fetchItemAll(funcs.objId(this.id))
  },
  updated() {
    console.log("updated")
  },
  methods: {
    addNew: function() {
      this.$router.push('/insert/1')
    },
    deleteItem: function(id) {},
    setComponent: function (path, id) {
      this.$router.push('/' + path + '/' + this.$route.params.id)
    },
    editImg: function(id_) {
      //this.$router.push({name: 'img-component', params: {id: id_}})
      this.$router.push('edit-img/' + _id)
    },
    handleClick(tab, event) {
        //console.log(tab, event);
    },
    modal_delete: function() {
      let payload = funcs.modalObj(
        'warning', 
        'Vuoi veramente cancellare immonbile?', 
        'Cancellazione avvenuta con successo', 
        'Cancellazione annullata'
      )
      this.$root.$emit('modal', payload)
    }

  }
}
</script>