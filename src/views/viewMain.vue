<template>
  <div id="render component ">
    <!--<div v-if="db_is_empty">-->
    <div>
      <router-view></router-view>      
    </div>    
  </div> 
</template>

<script>

export default {
  name: 'viewMain',
  data() {
    return {}
  },  
  created: function() {
    //console.log('viewMain')
  }
}
</script>

