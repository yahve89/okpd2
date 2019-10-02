<template>
    <section id="osobenosti" class="col-md-10 offset-md-1">
        <p class="h2">Особенности закупок</p>
        <br>
        <ul v-for="model in dataProvider">
            <li><router-link :to="`/okpd/osobenosti/${model.id}`">{{ model.name }}</router-link></li>
        </ul>
    </section>
</template>
<script>
    export default {
        name: 'osobenostiList',
        props:['dataProvider']
    }
</script>