<template>
<div class="card mb-4">
    <div class="card-body">
        <div class="container">
            <!-- Horizonatal Form -->
            <div class="row">
                <div class="col">
                    <b-form class="needs-validation" id="validated-form">
                        <div class="form-group">
                            <!--
                            <div class="row">
                                <label for="numero_locali" class="col-2">Numero Totale Locali</label>                                
                                <div class="col-1">
                                    <b-input id="numero_locali" type="number" placeholder="Stanze" v-model="add_data.numero_locali"></b-input>
                                </div>
                            </div>
                            -->
                            <hr>
                            <div class="row">
                                <label for="anno" class="col-2">Anno Costruzione</label>                                
                                <div class="col-2">
                                    <!--
                                    <b-form-select 
                                        id="anno"
                                        name="id_anno"
                                        v-model="newDetailModel.id_anno"
                                        required
                                    >
                                    -->
                                    <b-form-select 
                                        id="anno"
                                        name="id_anno"
                                        v-model="add_data.id_anno"
                                    >
                                        <option 
                                            :value="add_data.id_anno == 0 ? add_data.id_anno: 0">Non disponibile
                                        </option>
                                        <option 
                                            v-for="(item, index) in anno.data" 
                                            :key="index"
                                            :value="item.id"
                                        >{{item.anno}}</option>
                                        <!-- {{ showAll ? 'Show All' : 'Sho All' }} -->
                                    </b-form-select>
                                    <!--
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.id_anno" 
                                        v-text="validationErrors.id_anno">
                                    </span>
                                    -->
                                </div>
                                <label for="condizioni" class="col-2">Condizioni</label>                                
                                <div class="col-2">
                                    <b-form-select 
                                        id="condizioni"
                                        name="id_stato_immobile"                                   
                                        v-model="add_data.id_stato_immobile"
                                        required
                                    >
                                        <option 
                                            v-for="(item, index) in condizioni.data" 
                                            :key="index"
                                            :value="item.id"
                                        >{{item.condizione}}</option>
                                        <!-- {{ showAll ? 'Show All' : 'Sho All' }} -->
                                    </b-form-select>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.id_stato_immobile" 
                                        v-text="validationErrors.id_stato_immobile">
                                    </span>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <label for="riscaldamento" class="col-2">Riscaldamento</label>                                
                                <div class="col-2">
                                    <b-form-select 
                                        id="riscaldamento"
                                        name="id_riscaldamento"                            
                                        v-model="add_data.id_riscaldamento"
                                        required
                                    >
                                        <option 
                                            v-for="(item, index) in riscaldamento.data" 
                                            :key="index"
                                            :value="item.id"
                                        >{{item.riscaldamento}}</option>
                                        <!-- {{ showAll ? 'Show All' : 'Sho All' }} -->
                                    </b-form-select>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.id_riscaldamento" 
                                        v-text="validationErrors.id_riscaldamento">
                                    </span>
                                </div>
                                <label for="classe_energetica" class="col-2">Classe Energetica</label>                                
                                <div class="col-2">
                                    <b-form-select 
                                        id="select"
                                        name="id_classe_energetica"                                  
                                        v-model="add_data.id_classe_energetica"
                                        required
                                    >
                                        <option 
                                            v-for="(item, index) in classe_energetica.data" 
                                            :key="index"
                                            :value="item.id"
                                        >{{item.nome_classe}}</option>
                                        <!-- {{ showAll ? 'Show All' : 'Sho All' }} -->
                                    </b-form-select>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.id_classe_energetica" 
                                        v-text="validationErrors.id_classe_energetica">
                                    </span>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <label for="arredamento" class="col-2">Arredato</label>                                
                                <div class="col-2">
                                    <b-form-select 
                                        id="arredamento"
                                        name="id_arred"                               
                                        v-model="add_data.id_arred"
                                        required
                                    >
                                        <option 
                                            v-for="(item, index) in arredamento.data" 
                                            :key="index"
                                            :value="item.id"
                                        >{{item.arredato}}</option>
                                        <!-- {{ showAll ? 'Show All' : 'Sho All' }} -->
                                    </b-form-select>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.id_arred" 
                                        v-text="validationErrors.id_arred">
                                    </span>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="custom-control custom-switch col-2 offset-2">
                                        <input type="checkbox" class="custom-control-input" id="ascensore"  @click="select($event)" v-model="add_data.ascensore">
                                        <label class="custom-control-label" for="ascensore">Ascensore</label>
                                </div>
                            </div>
                            <div class="row">

                            </div>
                            <hr>
                            <div class="row">
                                 <div class="custom-control custom-switch col-2 offset-2">
                                    <input type="checkbox" class="custom-control-input" id="posto_auto" @click="select($event)" v-model="add_data.posto_auto">
                                    <label class="custom-control-label" for="posto_auto">Posto Auto</label>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="custom-control custom-switch col-2 offset-2">
                                    <input type="checkbox" class="custom-control-input" id="box_auto"  @click="select($event)" v-model="add_data.box_auto">
                                    <label class="custom-control-label" for="box_auto">Box Auto</label>
                                </div>
                                <label for="numero_locali" class="col-2">Box Mq</label>                                
                                <div class="col-1">
                                    <b-input id="numero_locali" v-model="add_data.box_auto_mq"></b-input>
                                </div> 
                            </div>
                            <hr>
                            <div class="row">                            
                                <div class="custom-control custom-switch col-2 offset-2">
                                    <input type="checkbox" class="custom-control-input" id="giardino" @click="select($event)" v-model="add_data.giardino">
                                    <label class="custom-control-label" for="giardino">Giardino</label>
                                </div>
                                <label for="giardino_mq" class="col-2">Giardino Mq</label>                                
                                <div class="col-1">
                                    <b-input id="giardino_mq" placeholder="Stanze" v-model="add_data.giardino_mq"></b-input>
                                </div>  
                            </div>
                            <hr>
                            <hr>
                            <div class="row">
                                <div class="col-2">
                                    <b-button @click="updateDetailData()" variant="primary">Inserisci</b-button>   
                                </div>
                            </div>
                        </div>                            
                    </b-form>
                </div>
            </div>
        </div>    
    </div>
</div>
</template>

<script>
import funcs from '../../lib/js/funcs.js'
import val from '../../lib/js/form-validation.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    name: 'compFormUpdateDetail',    
    data() {
        return {
            add_data: {
                /* v-model */
                id_immobile: null,
                id_anno: 0,
                id_stato_immobile: null,
                id_arred: null,
                id_classe_energetica: null,
                id_riscaldamento: null,
                numero_locali: 0,
                ascensore: true,
                posto_auto: true,
                box_auto: true,
                box_auto_mq: 0,
                giardino: true,
                giardino_mq: 0
            },
            validationErrors: {
                /* id_anno: null, */
                id_stato_immobile: null,
                id_riscaldamento: null,
                id_classe_energetica: null,
                id_arred: null
            }
        }
    },
    computed: {        
        ...mapGetters({
            anno: 'tables_store/tblAnno',
            arredamento: 'tables_store/tblArred',
            classe_energetica: 'tables_store/tblClassEnerg',
            condizioni: 'tables_store/tblCond',
            riscaldamento: 'tables_store/tblRisc'
        })
    },
    created: function() {
        return this.add_data.id_immobile = this.$store.state.data_store.id[0].id
    },
    methods: {        
        updateDetailData: function(newModel) {
            //console.log('update detail wizard')
            if(val.validateForm(this.validationErrors)) {                
                funcs.insertDataNew(this.add_data, 'add_estate_detail')
                console.log('added detail record')
                console.log('going view page')
                setTimeout(() => {
                    this.$router.push('/view-item/' + this.add_data.id_immobile) 
                }, 800)
                
            }
        },
        select: function(event){ 
            let targetId = event.currentTarget.id
            console.log(targetId)
            //alert(targetId)
        }
    }
}
</script>
<style>
/*.row {
    padding: 0 5px 0 5px;
}
.box .inner {
    background-color: #fff;
}
*/
</style>