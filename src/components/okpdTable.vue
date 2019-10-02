<template>
    <div class="overflow-auto">        
        <b-table 
            id="okpd-table" 
            :items="dataProvider" 
            :per-page="perPage" 
            :current-page="currentPage" 
            :fields="fields"
        >
            <template slot="code" slot-scope="data">
                <router-link :to="`/okpd/${data.value}`">{{ data.value }}</router-link>
            </template>
            <template slot="name" slot-scope="data">
                <router-link :to="`/okpd/${data.item.code}`">{{ data.value }}</router-link>
            </template>
            <template slot="zapret" slot-scope="data">
               <p class="text-center check-in" v-if="data.value == 1">✓</p>
               <p v-else></p>
            </template>
            <template slot="ogranichenia" slot-scope="data">
               <p class="text-center check-in" v-if="data.value == 1">✓</p>
               <p v-else></p>
            </template>
            <template slot="preimuschestvo" slot-scope="data">
               <p class="text-center check-in" v-if="data.value == 1">✓</p>
               <p v-else></p>
            </template>
            <template slot="dopusk" slot-scope="data">
               <p class="text-center check-in" v-if="data.value == 1">✓</p>
               <p v-else></p>
            </template>
            <template slot="perechen" slot-scope="data">
               <p class="text-center check-in" v-if="data.value == 1">✓</p>
               <p v-else></p>
            </template>
            <template slot="forma" slot-scope="data">
               <p class="text-center check-in" v-if="data.value == 1">✓</p>
               <p v-else></p>
            </template>
            <template slot="tk" slot-scope="data">
               <p class="text-center check-in" v-if="data.value == 1">✓</p>
               <p v-else></p>
            </template>
            <template slot="sovpodenia" slot-scope="data" v-if="podbor">
               <p class="text-center" v-text="data.value"></p>
            </template>
              <template slot="chastota" slot-scope="data" v-if="podbor">
               <p class="text-center" v-text="data.value"></p>
            </template>
        </b-table>
        <b-pagination 
            v-if="showPagination"
            v-model="currentPage" 
            :total-rows="pagination.totalCount" 
            :per-page="perPage" 
            aria-controls="okpd-table"
        ></b-pagination>
    </div>
</template>
<script>
export default {
    name: 'okpdTable',
    props: ['searchParams'],
    data() {
        return {
            fields: [     
                {
                    key: 'code',
                    label: 'Код'
                },
                {
                    key: 'name',
                    label: ''
                },
                {
                    key: 'zapret',
                    label: 'Запреты'
                },
                {
                    key: 'ogranichenia',
                    label: 'Ограничения'
                },
                {
                    key: 'preimuschestvo',
                    label: 'Преимущества'
                },
                {
                    key: 'dopusk',
                    label: 'Условия допуска'
                },
                {
                    key: 'perechen',
                    label: 'Аукционный перечень'
                },
                {
                    key: 'forma',
                    label: 'Электронная форма'
                },
                {
                    key: 'tk',
                    label: 'Типовой контракт'
                }
            ],
            perPage: 10,
            currentPage: 1,
            pagination: {},
            section: null,
            podbor: false,
            showPagination: false
        }
    },
    watch: {
     'searchParams': 'dataProvider'
    },
    methods: {
        dataProvider(event) {

            this.evn = event
                
            if (typeof this.searchParams.dataProvider !== 'undefined') {
                this.$set(this, 'showPagination', false)
                this.$set(this, 'perPage', this.searchParams.dataProvider.length)
                return this.searchParams.dataProvider
            }

            let options = {params: {}}

            if (typeof event.currentPage !== 'undefined')
                options.params["page"] = event.currentPage

            if (JSON.stringify(this.searchParams) !== '{"code":"","name":"","podbor":""}'){
                options.params["OkpdSearch[code]"] = this.searchParams.code
                options.params["OkpdSearch[name]"] = this.searchParams.name
                options.params["OkpdSearch[podbor]"] = this.searchParams.podbor   
            }

            let promise = this.$http.get('/v1/okpd', options)

            return promise.then((response) => {
                this.$set(this, 'podbor', response.data.podbor)
                
                if (this.podbor) {
                    this.$set(this, 'showPagination', false)
                    this.$set(this, 'perPage', response.data.models.length)
                    this.$set(this.fields, 9, {key: 'sovpodenia', label: 'Совпадения'});
                    this.$set(this.fields, 10, {key: 'chastota', label: 'Частота'});
                    return (response.data.models)
                } else {
                    this.fields.slice(9,10);
                    this.$set(this, 'pagination', response.data.pagination)
                    this.$set(this, 'showPagination', true)
                    return (response.data.models)
                }
            }).catch(error => {
                return []
            })
        }
    }
}
</script>
<style>
    .table thead th {
        padding: 5px;
        border-top: none;
        font-weight: 400;
    }
    .check-in {
        color: black;
        font-weight: 800;
    }
    .page-link{
        z-index: 1;
        color: #fff;
        background-color: #3272c0;
        border-color: #3272c0;
    }
</style>