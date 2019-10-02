<template>
    <div id="RazvitieOKPD">
        <search-form @search="getFind" class="container"></search-form>
        <div class="container content">
            <router-view :searchParams="searchData"></router-view>
        </div>
    </div>
</template>
<script>
import router from './router'
import searchForm from '@/components/searchForm.vue'

export default {
    name: "app",
    components: {searchForm}, 
    data() {
        return {
            currentRoute: window.location.pathname,
            searchData: {
               code: '',
               name: '',
               podbor: '' 
            }
        }
    },
    methods: {
        getFind: function(data) {
            this.$set(this, 'searchData', data)
            this.$root.$emit('bv::refresh::table', 'okpd-table')
          
            if ((this.currentRoute == this.$route.path) == false)
                router.push({path:'/okpd'})
        }
    }
}
</script>
<style>
    @media (min-width: 1200px) {
        .container {
            max-width: 1230px!important;
        }
    }
    #RazvitieOKPD hr {
        margin: 25px 0px;
    }
    #RazvitieOKPD .content {
        background: white;
    }
    #RazvitieOKPD .page-link {
        position: relative;
        display: block;
        padding: 0.5rem 0.75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #007bff;
        background-color: #fff;
        border: 1px solid #dee2e6;
    }
    #RazvitieOKPD .page-item.active .page-link {
        z-index: 1;
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }
    #RazvitieOKPD .page-link:hover {
        z-index: 2;
        color: #0056b3;
        text-decoration: none;
        background-color: #e9ecef;
        border-color: #dee2e6;
    }
    #RazvitieOKPD {
        padding-top: 15px;
        padding-bottom: 15px;
        background: #f0f0f0;
    }
</style>