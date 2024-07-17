<template>
    <editMainForm />
</template>

<script>

import editMainForm from './editMainForm.vue'

export default {
    name: 'componentEditItem',
    data() {
        return {
            citta: [],
            saved: 'idle'
        }
    },
    components: {
        editMainForm
    },
    beforeRouteLeave (to, from, next) {
        if(this.saved == 'not-saved') {
            let confirmAction = confirm("Are you sure to execute this action?")
            if (confirmAction) {
                alert("Action successfully executed")
                next()
            } else {
                alert("Action canceled")
                next(false)
            }
        } else {
            next()
        }
    },
    beforeRouteEnter (to, from, next) { 
        next(vm => {
            //console.log('hi, im a component')
            //console.log(vm.$route.name)
            vm.$root.$emit('router-name', vm.$route.name)            
            next()
        })
    },
    mounted: function() {
        console.log('maybe this')
        this.$root.$on('edit-status', (payload) => {
            this.saved = payload
        })
    }
} 
</script>

