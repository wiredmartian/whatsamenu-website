import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue")
    },
    {
        path: "/restaurants",
        name: "restaurants",
        component: () => import("@/views/restaurants/RestaurantListView.vue")
    },
    {
        path: "/restaurants/:id",
        name: "menu",
        component: () => import("@/views/menu/MenuView.vue")
    },
    {
        path: "/privacy-policy",
        name: "privacy-policy",
        component: () => import("@/views/legal/PrivacyPolicy.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
