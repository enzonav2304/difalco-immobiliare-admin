<template>
  <loader />
</template>

<script>

import loader from '../main/loader.vue'
export default {
  name: 'callback',
  components: {
    loader
  },
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      //this.$router.push({ name: 'home' })
      this.$router.push('/')
    })
  }
}
</script>

<style>

</style>
