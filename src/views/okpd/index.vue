<template>
    <div class="overflow-auto">    
        <okpd-table :searchParams='this.$attrs.searchParams'></okpd-table>  
        <hr>
        <osobenosti-list :dataProvider="osobennosti"></osobenosti-list>
    </div>
</template>
<script>
import okpdTable from "@/components/okpdTable.vue"
import osobenostiList from "@/components/osobenostiList.vue"

export default {
    name: 'okpd',
    components: {osobenostiList, okpdTable},
    data() {
        return {
            osobennosti: null
        }
    },
    mounted: function() {
        this.getData()
    },
    methods: {
        getData: function() {
            this.$http.get('/v1/osobenosti').then((response) => {
                    this.osobennosti = response.data.dataProvider;
            })   
        }
    }
}
</script>