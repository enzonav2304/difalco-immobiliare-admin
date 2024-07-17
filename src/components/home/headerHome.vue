<template>
<div id="main-header">
    <div class="row">
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body">Tutti gli Immobili ({{num_objs}})</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <!--<router-link to="/home/all">-->
                    <a class="small text-white stretched-link" href="#">Vai alla sezione</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                    <!--</router-link>-->
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-success text-white mb-4">
                <div class="card-body">Immobili Pubblicati ({{num_objs_active}})</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">Vai alla sezione</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card bg-warning text-white mb-4">
                <div class="card-body">Immobili in sospeso ({{num_objs_drafts}})</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">Vai alla sezione</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>                
        <div class="col-xl-3 col-md-6">
            <div class="card bg-danger text-white mb-4">
                <div class="card-body">Immobili Archiviati ({{num_objs_deleted}})</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#">Vai alla sezione</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
</div>  
</template>

<script>

/* FUNCTION REFERENCE in viewHomeHeader.vue */

/*
import funcs from '../../lib/js/funcs.js'
import tasks from '../../lib/js/tasks.js'
import myR from '../../lib/js/funcsRamda.js'
*/

import { mapGetters } from 'vuex'

export default {
    name: 'headerHome',
    data: function() {
        return {
            num_objs: null,
            num_objs_active: null,
            num_objs_drafts: null,
            num_objs_deleted: null
        }
    }
}
</script>