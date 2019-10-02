<template>
    <section id="osobenosti">
        <div class="row">
            <back-button></back-button>
        </div>
        <br>
        <div v-for="model in dataProvider" class="item">
             <router-link 
                class="lead h3" 
                :to="`/okpd/osobenosti/${model.id}`"
            >{{ model.name }}</router-link>
            <p v-html="model.comment.replace(/\n/g, '<br>')"></p>
            <router-link 
                class="btn btn-primary" 
                :to="`/okpd/osobenosti/${model.id}`"
            >Подробнее</router-link>
            <div class="clearfix"></div>
            <br>
        </div>
    </section>
</template>
<script>
    import backButton from '@/components/backButton.vue';
    export default {
        name: 'osobenosti',
        components: {backButton}, 
        data() {
            return {
                dataProvider: []  
            }
        },
        mounted: function() {
            this.getData()
        },
        methods: {
            getData: function() {
                this.$http.get('/v1/osobenosti')
                    .then((response) => {
                        this.dataProvider = response.data.dataProvider;
                    }).catch(error => {
                       this.dataProvider = []
                    })   
            }
        }
    }
</script>
<style>
    #osobenosti .lead {
        font-weight: 600;
    }
</style>