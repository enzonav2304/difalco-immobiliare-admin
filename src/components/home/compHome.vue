<template>
  <div id="home">
    <headerHome />
    <div class="card mb-4">
      <div class="card-body">
        <p>Label: <strong>Benvenuto nel Pannello di Gestione</strong></p>              
        <p class="mb-0">In questa pagina iniziale potrai pubblicare i tuoi immobili; gli immobili in stato <code>'pubblicato'</code>, e quelli in stato<code>'invidenza'</code> 
          saranno visualizzati sul portale. Quelli <code>'in corso'</code> sono gli immogili in gestione.
        </p>
      </div>
      <renderMainTable />
    </div>
  </div>
</template>

<script>

import headerHome from './headerHome.vue'
import renderMainTable from './renderMainTable.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'compHome',
  components: {
    headerHome,
    renderMainTable
    /*
    'Step01': () => import('../step01'),
    'Step02': () => import('../step02'),
    'Step03': () => import('../step03'),
    'Step04': () => import('../step04'),
    */
  },
  data() {
    return {
      db_is_empty: true,
      active: null
    }
  },
  beforeRouteEnter (to, from, next) { 
    next(vm => {
      console.log('hi, im a component')
      console.log(vm.$route.name)
      vm.$root.$emit('router-name', vm.$route.name)
      next()
    })
  },
  computed: {
    /*
    whichStep () {
      console.log("whichStep");
      switch (this.active) {
        case 0:
          return 'Step01'
        case 1:
          return 'Step02'
        case 2:
          return 'Step03'
        case 3:
          return 'Step04'
        default:
          return 'Step01'
      }
    }
    */
  },
  created: function() {
    //console.log(this.$route)
    //this.$root.$emit('router-name', this.$route.name)
  },
  props: {},
  methods: {
    setComponent(num) {
      console.log("setComponent " + num)
      this.active = num
    }
  }
  
}

</script>
<style>

</style>