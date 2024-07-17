<template>
  <div id="root-component">
    <renderItemTable />
  </div>

</template>

<script>
import renderItemTable from './renderItemTable.vue'

export default {
  name: 'compViewItem',
  components: {
    renderItemTable
  },
  data() {
    return {}
  },
  beforeRouteEnter (to, from, next) { 
    next(vm => {
      console.log('hi, im a fourth component')
      vm.$root.$emit('router-name', vm.$route.name)
      next()
    })
  }
}

</script>

