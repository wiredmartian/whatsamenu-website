import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/get-started',
        name: 'get-started',
        component: () => import("@/views/GetStarted.vue")
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
