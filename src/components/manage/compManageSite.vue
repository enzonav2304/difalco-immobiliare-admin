<template>
  <div id="render component ">
      <div v-if="db_is_empty">
        <b-card title="Nessun immobile trovato" body-class="text-center">
          <b-card-text>
            Il Database degli immobili è vuoto. Clicca qui sotto per inserire un'immobile
          </b-card-text>
          <router-link to="/insert-form">
            <button class="btn btn-primary sm-2">Inserisci immobile</button>
          </router-link>
        </b-card>
      </div>
      <div v-else>
        <viewHomeHeader />        
        <renderHomeTable />
      </div>
    </div>        
  </div>  
</template>

<script>

export default {
  name: 'compManageSite',
  components: {
   
  },
  data() {
    return {
      db_is_empty: true
    }
  },
  props: {},
  beforeRouteEnter (to, from, next) { 
    next(vm => {
      console.log('hi, im another component')
      vm.$root.$emit('router-name', vm.$route.name)
      next()
    })
  },
  created: function() {
    //console.log(this.$route)
    //this.$root.$emit('router-name', this.$route.name)
  },
  mounted: function(){},
  computed: {},
  methods: {}
}

</script>

