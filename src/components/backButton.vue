<template>
    <div class="back col-md-12">
       <router-link :to="`/okpd`">← Назад</router-link>
    </div>
</template>
<script>
    export default {
        name: 'backButton'
    }
</script>
<style scoped>
    .back {
        padding: 5px 15px;
        background: #f8f8f8;
        border-bottom: 1px solid #e1e3e6;
    }
    .back a:hover{
        text-decoration: none;    
    }
</style>