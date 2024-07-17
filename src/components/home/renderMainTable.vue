<template>
<div class="card mb-4">
    <div class="card-header"><i class="fas fa-table mr-1"></i>Dati caricati: </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
						<th>Nome Imm.<a href="#" @click="sort('nome')">&nbsp; &nbsp;<i class="fas fa-sort" color="black"></i></a></th>
                        <th>Contr.<a href="#" @click="sort('contratto')">&nbsp; &nbsp;<i class="fas fa-sort" color="black"></i></a></th>
                        <th>Tipol.<a href="#" @click="sort('tipo_immobile')">&nbsp; &nbsp;<i class="fas fa-sort" color="black"></i></a></th>
                        <th>Stato<a href="#" @click="sort('status')">&nbsp; &nbsp;<i class="fas fa-sort" color="black"></i></a></th>
                        <th>Data Ins.<a href="#" @click="sort('data_pubblicazione')">&nbsp; &nbsp;<i class="fas fa-sort" color="black"></i></a></th>
                        <th>Data Mod.<a href="#" @click="sort('data_modifica')">&nbsp; &nbsp;<i class="fas fa-sort" color="black"></i></a></th>                        
                        <th>Vedi</th>
                        <th>Modif</th>
                        <th>Canc.</th>
                        <th>Imm.</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Nome Immobile</th>
                        <th>Contratto</th>
                        <th>Tipologia</th>
                        <th>Stato</th>                        
                        <th>Data Inserimento</th>
                        <th>Data Modifica</th>
                        <th>Vedi</th>
                        <th>Modif</th>
                        <th>Canc.</th>
                        <th>Imm.</th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr v-for="(item, index) in getItems" :key="index">
                        <td>{{item.nome}}</td>
                        <td>{{item.contratto}}</td>
                        <td>{{item.tipo_immobile}}</td>                         
                        <td>{{item.status}}</td> 
                        <td>{{_formatDate(item.data_pubblicazione)}}</td>
                        <td>{{_formatDate(item.data_modifica)}}</td>
                        <td class="text-center">
                            <a href="" @click="setComponent('view-item', item.id_immobile)"><i class="fas fa-eye"></i></a>
                        </td>
                        <td class="text-center">                            
                            <a href="" @click="setComponent('edit-item', item.id_immobile)"><i class="fas fa-edit"></i></a>
                        </td>
                        <td class="text-center">                            
                            <a href="#" @click="modal_delete(item.id_immobile)"><i class="fas fa-trash"></i></a>
                        </td>
                        <td class="text-center">                            
                            <a href="" @click="setComponent('edit-img', item.id_immobile)"><i class="fas fa-images"></i></a>
                        </td>                       
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>


import { mapGetters } from 'vuex'
import { formatDate } from '../../lib/js/formatDate'
import funcs from '../../lib/js/funcs.js'

export default {
    name: 'renderMainTable',
    data() {
        return {
            active: null,
            activeColumn: {}
        }
    },
    computed: {
        ...mapGetters({
            getItems: 'data_store/getItems',
        })
    },
    methods: {
        _formatDate: function(date) {
            return formatDate(date)
        },
        setComponent: function (path, id) {
            this.$router.push(path + '/' + id)
        },      
        sort: function(_var) {
            //this.$store.commit('_sortItems', _var)
            console.log('calling  the function sort')
            //this.$store.commit('data_store/_setItemsState', myR.sortBy(_var, this.getItems))
            this.$store.commit('data_store/_sortItemsAsc', _var)

        },
        modal_delete: function(_id) {
            let payload = funcs.modalObj(
                'warning', 
                'Vuoi veramente cancellare immonbile?', 
                'Cancellazione avvenuta con successo', 
                'Cancellazione annullata'
            )
            Object.assign(payload, {'id': _id})
            Object.assign(payload, {'action': 'del_estate'})
            this.$root.$emit('modal', payload)
        }
    }
}
</script>
<style scoped>
th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #42b983;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #42b983;
}
</style>