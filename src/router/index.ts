import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuItemView from '../views/MenuItemView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/restaurant/menu/:id',
        name: 'menu',
        component: () => import("@/views/MenuView.vue")
    },
    {
        path: '/menu/item',
        name: 'menu-item',
        component: MenuItemView
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
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
