export default {
    validateForm: function(errorObjectName, my_form) {
        if(arguments[1]) {
            if(document.getElementById(my_form)) {
                //console.log('validateForm function')
                var nodes = document.getElementById(my_form).querySelectorAll(':invalid'); 
            }
        } else {
            if(document.getElementById('validated-form')) {
                //console.log('validateForm function')
                var nodes = document.getElementById('validated-form').querySelectorAll(':invalid'); 
            }
        }        
        //console.log(nodes)
        Object.keys(errorObjectName).forEach(key => {
            //console.log(errorObjectName)
            errorObjectName[key] = null
        })
        if (nodes.length > 0) {
            nodes.forEach(node => {
                if (node.title) {
                    errorObjectName[node.name] = node.title
                }
                else {
                    errorObjectName[node.name] = node.validationMessage
                }
    
                node.addEventListener('change', function (e) {
                    vm.validateForm(formId, errorObjectName)
                })
            })    
            return false
        }
        else {
            return true
        }
    }
}

