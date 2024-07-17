<template>
<ol class="breadcrumb mb-4">
    <el-breadcrumb>
        <el-breadcrumb-item v-for="item in breadcrums" :key="item.id">
            <router-link :to="item.href">
                <a href="#">{{item.text}}  </a>
            </router-link>
        </el-breadcrumb-item>
        <!--
        <el-breadcrumb-item v-if="mode == 'view-item'">Visualizza Immobile</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="mode == 'edit-item'">Modifica Immobile</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="mode == 'edit-img'">Gestione Immagini</el-breadcrumb-item>
        -->
    </el-breadcrumb>
</ol>
</template>

<script>
export default {
    name: 'breadcrumb',
    data() {
        return {
            breadcrums: [
                {
                    id: 1,
                    text: 'Home',
                    disabled: false,
                    href: '/',
                },
                {
                    id: 2,
                    text: 'ShoppingCart',
                    disabled: false,
                    href: '/cart',
                },
                {
                    id: 3,
                    text: 'Shopping ',
                    disabled: true,
                    href: 'breadcrumbs_shirts',
                }
            ], 
        }
    },
    watch: {
        $route(to, from) {
            switch(this.$route.name) {
                case 'Home':
                    console.log('action here: home')
                break
                case 'Dashboard':
                    console.log('action here: dashboard')
                break
                case 'Gestione Sito':
                //console.log(this.$route)
                    console.log('gestione sito: gestion sito')
                break
            }
            //console.log(this.$route)
        }
    }
}

</script>
