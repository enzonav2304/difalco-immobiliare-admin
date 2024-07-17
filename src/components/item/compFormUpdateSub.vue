<template>
<div class="card mb-4">
    <!--div class="card-header"><i class="fas fa-table mr-1"></i>{{ nome_immobile }}</div>-->
    <div class="card-body">
        <div class="container">
            <!-- Horizonatal Form -->
            <hr>
            <div class="row">
                <div class="col">
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
                                        <option v-for="(item, index) in citta" :key="index">
                                            {{item}}
                                        </option>                                  
                                    </b-form-select>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.selectedCity" 
                                        v-text="validationErrors.selectedCity">
                                    </span>
                                </div>                               
                                <div class="col-2">
                                    <b-form-select
                                        name="id_zona"
                                        v-model="add_data.id_zona" 
                                        v-if="selectedCity != -1"
                                        required
                                    >
                                        <option v-for="(item, index) in zones" :key="index" :value="item.id">
                                            {{item.zone}}
                                        </option>
                                    </b-form-select>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.id_zona" 
                                        v-text="validationErrors.id_zona">
                                    </span>
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
                                        v-model="add_data.mq"
                                        required
                                    ></b-input>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.mq" 
                                        v-text="validationErrors.mq">
                                    </span>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <label for="stanze" class="col-2">Stanze</label>                                
                                <div class="col-1">
                                    <b-input 
                                        id="stanze"
                                        name="stanze"
                                        type="number" 
                                        placeholder="Stanze" 
                                        v-model="add_data.stanze"
                                        required
                                    ></b-input>
                                </div>
                                <label for="bagni" class="col-2 offset-1">Bagni</label>                                
                                <div class="col-1">
                                    <b-input 
                                        id="bagni"
                                        name="bagni"
                                        type="number"
                                        placeholder="Bagni" 
                                        v-model="add_data.bagni"
                                        required
                                    ></b-input>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <label for="prezzo" class="col-2">Prezzo</label>                                
                                <div class="col-2">
                                    <b-input 
                                        id="prezzo"
                                        name="prezzo" 
                                        placeholder="Prezzo" 
                                        v-model="add_data_price.prezzo"
                                        required
                                    ></b-input>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.prezzo" 
                                        v-text="validationErrors.prezzo">
                                    </span>
                                </div>
                                <label for="prezzo_prec" class="col-2">Prezzo Ribassato</label>                                
                                <div class="col-2">
                                    <b-input 
                                        id="prezzo_prec" 
                                        placeholder="Stanze" 
                                        v-model="add_data_price.prezzo_prec"
                                    ></b-input>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <label for="expences" class="col-2">Spese Accessorie</label>                                
                                <div class="col-2">
                                    <b-input 
                                        id="expences"
                                        placeholder="Stanze"
                                        name=""
                                        v-model="add_data_price.spese_accessorie"
                                    ></b-input>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-2">
                                    <b-button @click="updateSubData()" variant="primary">Inserisci</b-button>   
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
import myR from '../../lib/js/funcsRamda.js'

import { mapGetters } from 'vuex'

export default {
    name: 'compFormUpdateSub',    
    data() {
        return {
            zones: [],
            my_cities: [],
            selectedCity:-1,
            selectedOption:'',
            add_data: {
                /* v-model */
                id_citta: null,
                id_zona: null,
                mq: null,
                stanze: null,
                bagni: null             
            },
            add_data_price: {
                /* v-model */            
                prezzo: null,
                prezzo_prec: 0,
                spese_accessorie: 0            
            },
            validationErrors: {
                selectedCity: null,
                id_zona: null,
                mq: null,
                stanze: null,
                bagni: null,
                prezzo: 0
            }
        }
    },
    props: {
        id: {
            type: Array
        }
    },
    computed: {
        ...mapGetters({
            getLastId: 'data_store/getId',
            zone: 'tables_store/tblZone'
        }),
        citta: function() {
            return myR.filterCities(this.zone.data)            
        }
    },
    created: function() {
        console.log('step 2 component created')
    },
    mounted: function() {
        console.log('step 2 component mounted')
    },
    methods: {        
        updateSubData: function() {
            //console.log('update wizard')
            //add_estate_sub_post
            if(val.validateForm(this.validationErrors)) {
                Object.assign(this.add_data, {'id_immobile': this.id[0].id})
                Object.assign(this.add_data_price, {'id_immobile': this.id[0].id})
                funcs.insertDataNew(this.add_data, 'add_estate_sub')
                funcs.insertDataNew(this.add_data_price, 'add_estate_price')
                this.$router.push('/insert/3')
            }                        
        },
        filterCities: function() {
            return this.citta = myR.filterCities(this.zone.data)
        },
        filterZones: function(citta) {
            return this.zones = myR.filterZones(this.zone.data, citta)
            //console.log(myR.filterZones(this.zone.data, citta))
        },
        selectZone:function() {
            this.selectedOption = ''
        }
    }
}
</script>
<style></style>