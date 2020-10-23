import Vue from 'vue'
import VueRouter from 'vue-router'

import Goods from '../views/GoodsView'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'goods', component: Goods },
    {
        path: '/ratings',
        name: 'ratings',
        component: () =>
            import ('../views/RatingView.vue')
    },
    {
        path: '/seller',
        name: 'seller',
        component: () =>
            import ('../views/SellerView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: 'link-active'
})

export default router