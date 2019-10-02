import Vue from 'vue';
import Router from 'vue-router';
import okpd from './views/okpd/index.vue';
import okpdView from './views/okpd/view.vue';
import osobenosti from './views/osobenosti/index.vue';
import osobenostiView from './views/osobenosti/view.vue';

Vue.use(Router)

let router = new Router({
    routes: [
        { 
            path: '/', 
            redirect: { 
                name: 'okpd' 
            }
        },
        {
            path: '/okpd',
            name: 'okpd',
            component: okpd
        },
        {
            path: '/okpd/:id',
            name: 'okpdView',
            component: okpdView
        },
        {
            path: '/okpd/osobenosti',
            name: 'osobenosti',
            component: osobenosti
        },
        {
            path: '/okpd/osobenosti/:id',
            name: 'osobenostiView',
            component: osobenostiView
        }
    ]
})

export default router