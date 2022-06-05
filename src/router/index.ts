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
        path: '/sign-in',
        name: 'sign in',
        component: () => import("@/views/user/SignIn.vue")
    },
    {
        path: '/sign-up',
        name: 'sign up',
        component: () => import("@/views/user/SignUp.vue")
    },
    {
        path: '/manage/restaurant/add',
        name: 'add restaurant',
        component: () => import("@/views/manage/restaurant/AddRestaurant.vue")
    },
    {
        path: '/manage/restaurant/add/:id',
        name: 'update restaurant',
        component: () => import("@/views/manage/restaurant/AddRestaurant.vue")
    },
    {
        path: '/manage/my-restaurants',
        name: 'my restaurants',
        component: () => import("@/views/manage/restaurant/ListRestaurant.vue")
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
