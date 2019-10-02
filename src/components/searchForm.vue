<template>
    <div id="okpdSearch">
        <div class="row">
            <div class="col-md-3">
                <div class="form-group field-okpdsearch-code">
                    <label class="control-label" for="okpdsearch-code">Поиск по коду</label>
                    <input v-model="form.code" id="okpdsearch-code" class="form-control">
                    <div class="help-block"></div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group field-okpdsearch-name">
                    <label class="control-label" for="okpdsearch-name">Поиск кода по названию</label>
                    <input v-model="form.name" id="okpdsearch-name" class="form-control">
                    <div class="help-block"></div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group field-okpdsearch-podbor">
                    <label class="control-label" for="okpdsearch-podbor">Подбор по ключевому слову</label>
                    <input v-model="form.podbor" id="okpdsearch-podbor" class="form-control">
                    <div class="help-block"></div>
                </div>
            </div>
            <div class="col-md-3">
                <label class="control-label d-none d-sm-block d-sm-none d-md-block">&nbsp;</label>
                <br class="d-none">
                <button class="btn btn-light col-6" @click="onSubmit">Найти</button>
                <button class="btn btn-default col-5" @click="reset">Сброс</button> 
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    name: 'searchForm',
    data: function() {
        return {
            form: {
                code: '',
                name: '',
                podbor: ''
            }
        }
    },
    methods: {
        reset() {
            this.$set(this.form, 'code', '')
            this.$set(this.form, 'name', '')
            this.$set(this.form, 'podbor', '')
            this.$emit('search', {
                code: this.form.code, 
                name: this.form.name, 
                podbor: this.form.podbor,  
            })
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.$emit('search', {
                code: this.form.code, 
                name: this.form.name, 
                podbor: this.form.podbor,  
            })
        }
    }
}
</script>
<style scoped>
    #okpdSearch {
        background: #3c75ba;
        padding: 10px 15px;
    }  
    #okpdSearch label {
        color: white;
    }  
    #okpdSearch .reset {
        margin-left: 15px;
        color: white;
    }
    #okpdSearch .btn-default {
        margin-left: 15px;
        color: white;
    }
    #okpdSearch .btn-light{
        font-weight: 600;
    }
</style>