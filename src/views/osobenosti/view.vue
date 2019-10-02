<template>
    <section id="osobenostiView">
        <div class="row">
            <back-button></back-button>
        </div>
        <div class="col-md-10 offset-md-1" v-if="show">
           <br>
            <p class="h4" v-html="model.name"></p>
            <br>
            <p v-html="model.comment.replace(/\n/g, '<br>')"></p>
            <br>
            <p class="h4">Перечень</p>
            <br>
            <table class="table" v-if="okpds_old">
                <thead>
                    <tr>
                        <th>Код</th>
                        <th>Расшифровка</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in okpds_old">
                        <td><router-link :to="`/okpd/${index}`">{{ index }}</router-link></td>
                        <td v-html="item"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
<script>
    import backButton from '@/components/backButton.vue';
    export default {
        name: 'osobenostiView',
        components: {backButton},        
        data() {
            return {
                model: [],
                okpds_old: false,
                show: false
            }
        },
        mounted: function() {
            this.getData()
        },
        methods: {
            getData: function() {
                let options = {
                    params: {
                        id: this.$route.params.id,
                    }
                }
                this.$http.get('/v1/osobenosti/view', options).then((response) => {
                    this.$set(this, 'model', response.data.model)
                    this.$set(this, 'okpds_old', JSON.parse(response.data.model.okpds_old))
                    this.$set(this, 'show', true)
                })   
            }
        }
    }
</script>