import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/HomeView.vue")
    },
    {
        path: '/get-started',
        name: 'get-started',
        component: () => import("@/views/account/GetStarted.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/account/UserLogin.vue")
    },
    {
        path: '/account/api-keys',
        name: 'api-keys',
        component: () => import("@/views/account/CreateAPIKey.vue")
    },
    {
        path: '/restaurants/:id/menu',
        name: 'menu',
        component: () => import("@/views/menu/MenuView.vue")
    },
    {
        path: '/restaurant/menu/menu-item/:id',
        name: 'menu-item',
        component: () => import("@/views/menu/MenuItemView.vue")
    },
    {
        path: '/menu/:id/enquire',
        name: 'menu enquiry',
        component: () => import('@/views/gpt/MenuEnquiryView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
