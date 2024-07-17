<template>
    <div class="card-body">
        <div class="container">
            <!-- Horizonatal Form -->
            <div class="row">
                <div class="col">
                    <b-form class="needs-validation" id="validated-form">
                        <div class="form-group">
                            <hr>
                            <div class="row">
                                <div class="input-group">
                                    <label for="nome" class="col-2">Nome Immobile</label>
                                    <div class="col-6">
                                        <b-input 
                                            id="nome"
                                            name="nome"
                                            type="text"
                                            class="form-control"
                                            placeholder="Nome Immobile"
                                            :maxlength="max_lenght"
                                            v-model="add_data.nome"
                                            required
                                        >
                                        </b-input>
                                        
                                        <span 
                                            class="text-danger" 
                                            v-if="validationErrors.nome" 
                                            v-text="validationErrors.nome">
                                        </span>
                                    </div>
                                    <div class="col-2">
                                        <p v-text="(max_lenght - add_data.nome.length)"></p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <label for="textarea" class="col-2">Descrizione Immobile</label>
                                <div class="col-6">
                                    <b-form-textarea
                                        id="textarea"
                                        name="descrizione"                                    
                                        placeholder="Descrizione Immobile"
                                        rows="3"
                                        max-rows="6"
										v-model="add_data.descrizione"
                                        required
                                    ></b-form-textarea>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.descrizione" 
                                        v-text="validationErrors.descrizione">
                                    </span>
                                </div>
                                
                            </div>
                            <hr>
                            <div class="row">
                                <label for="id" class="col-2">Contratto</label>
                                <div class="col-2">
                                    <b-form-select 
                                        id="contratto"
                                        name="id_contratto"                                  
                                        v-model="add_data.id_contratto"
                                        required
                                    >
                                        <!--<option disabled value="">Nothing selected</option>-->
                                        <option
                                            v-for="(item, index) in contratti.data"
                                            :key="index"
                                            :value="item.id"
                                        >{{item.contratto}}</option>
                                    </b-form-select>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.id_contratto" 
                                        v-text="validationErrors.id_contratto">
                                    </span>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <label for="id" class="col-2">Tipo Immobile</label>
                                <div class="col-2">
                                    <b-form-select 
                                        id="tipologia"
                                        name="id_tipologia"                                 
                                        v-model="add_data.id_tipologia"
                                        required
                                    >
                                        <option
                                            v-for="(item, index) in tipologia.data" 
                                            :key="index"
                                            :value="item.id"
                                        >{{item.tipo_immobile}}</option>
                                    </b-form-select>
                                    <span 
                                        class="text-danger" 
                                        v-if="validationErrors.id_tipologia" 
                                        v-text="validationErrors.id_tipologia">
                                    </span>
                                </div>
                            </div>
                            <hr>                            
                            <div class="row">
                                <div class="col-2">
                                    <b-button @click="addItem" variant="primary">Inserisci</b-button>   
                                </div>
                            </div>
                        </div>                            
                    </b-form>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

import val from '../../lib/js/form-validation.js'
import funcs from '../../lib/js/funcs.js'

export default {
    name: 'compFormInsertMain.vue',
    data() {
        return {            
            max_lenght: 50,
            add_data: {
                /* v-model */
                nome: '',
                id_status: 1,
                id_contratto: null,
                id_tipologia: null,
                descrizione: ''             
            },
            validationErrors: {
                nome: null,
                id_contratto: null,
                id_tipologia: null,
                descrizione: null
            }               
        }
    },    
    computed: {        
        ...mapGetters({
            sub_estate: 'data_store/getSubItem',
            contratti: 'tables_store/tblContr',
            stato: 'tables_store/tblStato',
            tipologia: 'tables_store/tblTipo'
        })
    },
    methods: {
        addItem: function() {
            if (val.validateForm(this.validationErrors)) {
                //this.submitForm(this.validationErrors)
                funcs.insertDataNew(this.add_data, 'add_estate')
                console.log('step control')
                funcs.resetItemData()
                this.resetForm()
                this.$router.push('/insert/2')
            }        
        },
        resetForm: function() {
            let add_data = {
                nome: '',
                status: 1,
                id_contratto: null,
                id_tipologia: null,
                descrizione: ''
            }
            return this.add_data = add_data
        }
    }
}
</script>


                

