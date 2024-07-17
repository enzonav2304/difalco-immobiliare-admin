<template>
  <div id="app">
    <body class="sb-nav-fixed">
      <!-- Top Bar Component -->
      <topBar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <!-- Aside Component -->
          <compLeftSide />
        </div>
        <!-- here for loader -->
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid">
              <h1>{{page_name}}</h1>
              <breadcrumb :nav="navObj" />
              <div v-if="isLoading">
                <loader />
              </div>
              <div v-else>
                <viewMain />
              </div>
            </div>
          </main>
          <compFooter />
        </div>
        <!-- ends of loader -->
      </div>
    </body>
  </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import { bus } from './main'
Vue.prototype.$axios = axios

/* prod */
import topBar from './components/main/topBar.vue'
import breadcrumb from './components/main/breadcrumb.vue'
import compLeftSide from './components/main/compLeftSide.vue'
import viewMain from './views/viewMain.vue'
import compFooter from './components/main/compFooter.vue'
import loader from './components/main/loader.vue'

import funcs from './lib/js/funcs.js'

export default {
  name: 'App',
  components: {
    topBar,
    breadcrumb,
    compLeftSide,
    viewMain,
    compFooter,   
    loader
  },
  data () {
    return {
      page_name: '',
      isLoading: false,
      axiosInterceptor: null,
      navObj: [
        {
          id: 1,
          text: 'Home',
          disabled: false,
          href: '/',
        }
      ]
    }
  },
  watch: {
    $route(to, from) {
      switch(this.$route.name) {
        case 'Home':
          console.log('watching home route')
        break
        case 'Dashboard':
          console.log('watching dashboard route')
        break
        case 'Gestione Sito':
          //console.log(this.$route)
          console.log('gestione sito: gestion sito')
        break
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    //this.$root.$emit('currentPage', currentPage)
  },
  created: function() {
    /* init events */
    bus.$on('test', () => {
      console.log('event bus works!')
    })
    this.$root.$on('router-name', (payload) => {
      this.page_name = payload
      switch(this.page_name) {
        case 'Home':
          console.log('start app')
          //funcs.fetchMainTable('estates_main')
          funcs.fetchData('items', 'estates_main', null)
          //this.$store.commit('data_store/_sortItemsAsc', 'data_pubblicazione')
        break
        case 'Dashboard':
          console.log('action here')
          funcs.fetchData('items', 'estates_main', null)
        break
        case 'Gestione Sito':
          //console.log(this.$route)
          console.log('gestione sito')
        break
        case 'Inserimento Immobile':
          this.disableInterceptor()
          funcs.fetchSubItemTables()
          funcs.fetchDetailItemTables()          
        break
        case 'Dettagli Immobile':
          let id = this.$route.params.id
          this.disableInterceptor()
          try {
            funcs.fetchItemAll(funcs.objId(id))
            //funcs.fetchImages(id)
            funcs.fetchData('images', 'view_images', id)
            //funcs.fetchItem('/view_estate_main/' + id)
          } catch(e) {
            this.$route.push('/')
          }
        break
        case 'Modifica Immobile':
          let _id = this.$route.params.id
          funcs.fetchSubItemTables()
          funcs.fetchDetailItemTables()
          funcs.fetchItemAll(funcs.objId(_id))
          //funcs.fetchImages('view_images/' + id)
        break
        case 'Modifica Immagini':
          let _id_ = this.$route.params.id
          this.disableInterceptor()
          //funcs.fetchImages('view_images/' + _id_)
          funcs.fetchImages(_id_)
          console.log('Images fetched')
        break
      }
    })
    /* modal events */
    this.$root.$on('modal', (payload) => {
      let x = payload
      //this.modal('warning', payload.msg, 'Cancellazione avvenuta con successo', 'Cancellazione annullata') 
      this.$confirm(x.msg, {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Annulla',
        type: x.type   
      })
      .then(() => {
        this.$message({
          type: 'success',
          message: x.succ_msg
        })
        //alert('test')
        //funcs.deleteItem_old(x.id)
        funcs.deleteItem('dummy', x.action, x.id)
        funcs.fetchData('items', 'estates_main', null)
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: x.catch_msg
        })
      })        
    })
    bus.$on('notify', (payload) => {
      let x = payload
      console.log('control bus notify')
      if(x.type == 'success') {
        this.$notify.success({
          title: 'Success',
          message: x.msg,
          showClose: true
        })
      } else if(x.type == 'error') {
        this.$notify.error({
          title: 'Errore',
          message: x.msg,
          showClose: true
        })
      }
      else if(x.type_ == 'warning') {
        this.$notify.warning({
          title: 'Attenzione',
          message: x.msg,
          showClose: true
        })
      }
    })
  },
  mounted: function() {
    //console.log(this.$route)
    this.enableInterceptor()
  },
  methods: {
    notificationTypeClass() {
      
    },
    enableInterceptor() {
      this.axiosInterceptor = this.$axios.interceptors.request.use((config) => {
        this.isLoading = true
        console.log('loading')
        return config
      }, 
      (error) => {
        this.isLoading = false  
        return Promise.reject(error)
      })
      this.$axios.interceptors.response.use((response) => {
        this.isLoading = false
        console.log('stop loading')
        return response
      }, 
      function(error) {
        this.isLoading = false
        return Promise.reject(error)
      })
    },
    disableInterceptor() {
      this.$axios.interceptors.request.eject(this.axiosInterceptor)
    }   
  }
}
</script>
<style>
</style>
