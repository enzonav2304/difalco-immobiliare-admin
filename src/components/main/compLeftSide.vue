<template>
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="nav">
                <div class="sb-sidenav-menu-heading">Principale</div>
                <router-link to="/home">
                    <a class="nav-link" href="" @click="doAction('viewHome')">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>Dashboard
                    </a>                   
                </router-link>
                <router-link to="/view-main-table">
                    <a class="nav-link" href="" @click="doAction('mainTable')">
                        <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>Gestione Immobili
                    </a>
                </router-link>                
                <router-link to="/insert/1">
                    <a class="nav-link" href="" @click="doAction('mainForm')">
                        <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>Nuovo Immobile
                    </a>
                </router-link>
                <router-link to="/manage/all">
                    <a class="nav-link" href="" @click="doAction('mngTable')">
                        <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>Gestione Sito
                    </a>
                </router-link>
                <div class="sb-sidenav-menu-heading">Admin Menu</div>
                <a 
                    class="nav-link collapsed" 
                    href="#" data-toggle="collapse" 
                    data-target="#collapseLayouts" 
                    aria-expanded="false" 
                    aria-controls="collapseLayouts"
                >
                    <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>Amministrazione
                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                </a>
                <!--
                <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                    <nav class="sb-sidenav-menu-nested nav">                        
                        <router-link to="/no-page">
                            <a class="nav-link" href="#">Ammnistrazione Sito</a>
                        </router-link>                        
                    </nav>
                </div>
                -->
                <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                    <nav class="sb-sidenav-menu-nested nav">
                        <!--  MY CODE -->
                        <router-link to="/no-page">
                            <a class="nav-link" href="#">Test Page</a>
                        </router-link>                        
                    </nav>
                </div>
                <!--
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-book-open"></i>
                        </div>Pages<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i>
                    </div>
                </a>
                <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                    <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">Authentication
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                            <nav class="sb-sidenav-menu-nested nav"><a class="nav-link" href="login.html">Login</a>
                                <a class="nav-link" href="register.html">Register</a><a class="nav-link" href="password.html">Forgot Password</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">Error
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                            <nav class="sb-sidenav-menu-nested nav"><a class="nav-link" href="401.html">401 Page</a><a class="nav-link" href="404.html">404 Page</a><a class="nav-link" href="500.html">500 Page</a></nav>
                        </div>
                    </nav>
                </div>
                <div class="sb-sidenav-menu-heading">Addons</div>
                <a class="nav-link" href="charts.html"><div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>Charts</a>
                <a class="nav-link" href="tables.html"><div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>Tables</a>
                -->
            </div>
        </div>
        <div class="sb-sidenav-footer">
            <div class="small">Logged in as:</div>
            <div v-if="$auth.user">{{$auth.user.name}}</div>
        </div>
    </nav>      
</template>

<script>

//
import funcs from '../../lib/js/funcs.js'
//import auth from '../assets/vendor/auth.js'

export default {
    name: 'compLeftSide',
    data () {
      return {
        //name: auth.getName()
      }
    },
    methods: {
        doAction: function(page) {  
            console.log('do action ' + page)          
            this.$root.$emit('currentPage', page)
        },
        /*
        reloadApp: function() {
            funcs.reloadApp()
        },
        */
        testApp: function() {
            //funcs.test_state()
        }
    }
}


</script>

