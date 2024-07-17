<template>
    <div class="card mb-4">
        <div class="card-header"><i class="fas fa-table mr-1"></i>Modulo creazione immobile</div>
        <component :is="component" :id="id"/>
    </div>
</template>

<script>

import Vue from 'vue'
import { mapGetters } from 'vuex'
import funcs from '../../lib/js/funcs.js'

export default {
    name: 'compFormInsert',
    data() {
        return {
            component: null,
            id: null
        }
    },
    beforeRouteEnter (to, from, next) { 
        next(vm => {
            vm.$root.$emit('router-name', vm.$route.name)
            if (vm.$route.params.step === '1') {
                console.log('step 1')
                vm.component = 'compFormInsertMain'
                try {
                    Vue.component(vm.component, () => import(`./${vm.component}`))
                } catch(e) {
                    console.log('there was an error')
                }
                
            }
            next()
        })
    },
    computed: {
        ...mapGetters({
            getLastId: 'data_store/getId',
        }),
    },
    watch: {
        $route(to, from) {
            switch (this.$route.params.step) {
                case '2':
                    console.log('step 2')
                    this.component = 'compFormUpdateSub'
                    /*
                    try {
                        funcs.fetchData('id', 'last_id', null)
                    } catch(e) {
                        console.log('si è verificato un errore')
                    }
                    */
                    try {
                        Vue.component(this.component, () => import(`./${this.component}`))
                        console.log('try to load component')
                    } catch(e) {
                        console.log('there was an error')
                    }
                break
                case '3':
                    console.log('step 3')
                    this.component = 'compFormUpdateDetail'
                    try {
                        Vue.component(this.component, () => import(`./${this.component}`))
                        console.log('try to load component')
                    } catch(e) {
                        console.log('there was an error')
                    }                    
                break
            }
        }
    },
    mounted: function() {
        this.$store.watch(
            (state, getters) => this.getLastId,
            (newValue, oldValue) => {
                //console.log(newValue)
                this.id = newValue
                console.log('watching id: ' + newValue[0].id)
                return this.id
            }
        )
    }
}
</script>
<style scoped>

</style>