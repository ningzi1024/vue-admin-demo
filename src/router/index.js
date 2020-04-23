import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../pages/home')
        },
        {
            path: '/user',
            name: 'user',
            component: ()=>import('../pages/user')
        },
        {
            path: '*',
            name: '404',
            component: ()=>import('../pages/404')
        }
    ]
})