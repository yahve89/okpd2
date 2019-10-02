<template>
    <section id="pkpdView">
        <div class="row">
            <back-button></back-button>
        </div>
        <div v-if="show">
            <div class="col-md-10 offset-md-1">
                <br>
                <p class="h4" v-html="model.name"></p>
                <br>
                <div class="row">
                    <div class="col-2"><b>Код</b>:</div>
                    <div class="col-9">{{ model.code }}</div>
                </div>
                <div class="clearfix"></div>
                <div class="row">
                    <div class="col-md-2"><b>Наименование</b>:</div>
                    <div class="col-md-9">{{ model.name }}</div>
                </div>
                <div class="clearfix"></div>
                <div class="row">
                    <div class="col-2"><b>Уровень</b>:</div>
                    <div class="col-9">{{ level[model.level] }}</div>
                </div>
            </div>
            <div class="clearfix"></div>
            <hr>
            <p class="h5">Особенности закупок по ОКПД {{ model.code }}</p>
            <div v-if="!osobs">
                <p>Особенностей не найдено</p>
                <router-link class="btn btn-primary" :to="`/okpd/osobenosti`">
                    Полный перечень с комментариями эксперта
                </router-link>
            </div>
            <div v-if="osobs">
                <p>{{ osobs.title }}</p>
                <ul v-for="item, index in osobs.items">
                    <li>
                        <p><router-link class="h5 link-osob" :to="`/okpd/osobenosti/${item.id}`">
                            {{ item.name }}
                        </router-link></p>
                        <p v-if="item.not">
                            В части "<strong>{{item.not.name}}</strong>" код {{ item.not.code }}
                        </p>
                        <div v-if="item.comment">
                            <strong>Комментарий эксперта:</strong>
                            <p v-html="item.comment.replace(/\n/g, '<br>')"></p>
                        </div>
                        <router-link class="btn btn-primary" :to="`/okpd/osobenosti/${item.id}`">
                            Полный перечень
                        </router-link>
                    </li>
                    <br>
                    <hr v-if="osobs.items.length > 1 && osobs.items.length != (index + 1)">
                </ul>
            </div>
            <div v-if="stats">  
                <hr>
                <p class="h5" v-text="stats.title"></p>
                <table class="table">
                    <tr v-for="item in stats.items"> 
                        <td v-text="item.code"></td>
                        <td v-text="item.name"></td>
                        <td v-html="item.stat"></td>
                    </tr>
                </table>
            </div>
            <okpd-table :searchParams='{"dataProvider": dataProvider}' v-if="showTable"></okpd-table>
        </div>

    </section>
</template>
<script>
    import okpdTable from "@/components/okpdTable.vue"
    import backButton from '@/components/backButton.vue';

    export default {
        name: 'okpdView',
        components: {backButton, okpdTable},        
        data() {
            return {
                model: [],
                okpds_old: false,
                show: false,
                level: ['','Класс','Подкласс','Группа','Подгруппа','Вид','Категория','Подкатегория'],
                dataProvider: null,
                osobs: null,
                stats: false,
                showTable: false
            }
        },
        watch: {
            '$route.params.id': {
                handler: function(search) {
                    this.$set(this, 'show', false)
                    this.getData()
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            getData: function() {
                this.dataProvider = null
                this.stats = null
                this.osobs = null
                
                let options = {
                    params: {
                        code: this.$route.params.id
                    }
                }
                this.$http.get('/v1/okpd/view-by-code', options).then((response) => {
                    this.$set(this, 'model', response.data.model)

                    if (response.data.dataProvider !== null) {
                        this.$set(this, 'dataProvider', response.data.dataProvider)
                        this.$set(this, 'showTable', true)  
                    }

                    this.$set(this, 'stats', response.data.stats)
                    this.$set(this, 'osobs', response.data.osobs)
                    this.$set(this, 'show', true)
                })   
            }
        }
    }
</script>
<style>
    #pkpdView .btn-primary {
        color: #fff;
        background-color: #3c75ba;
        border-color: #3c75ba;
    }
    .link-osob{
        color: #3c75ba;
    }
</style>