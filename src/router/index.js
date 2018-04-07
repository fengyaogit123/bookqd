import Vue from 'vue'
import VueRouter from 'vue-router'
import { beforeEach, afterEach } from '@/router/event'
/**子路由 */
const ErrorCom = {
    path: 'Errors',
    name: 'Errors',
    component: () => import('@/pages/errors')
}
const Others = {
    path: '*',
    redirect: '/home/Errors'
}
const router = new VueRouter({
    routes: [{
        path: "/",
        redirect: "/Login"
    }, {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/index/Index.vue'),
        children: [
            ErrorCom,
            {
                path: 'User',
                name: 'User',
                component: () => import('@/pages/user/list')
            }, {
                path: 'Category',
                name: 'Category',
                component: () => import('@/pages/category/list')
            }, {
                path: 'Press',
                name: 'Press',
                component: () => import('@/pages/press/list')
            }, {
                path: 'Book',
                name: 'Book',
                component: () => import('@/pages/book/list')
            }, {
                path: 'Borrow',
                name: 'Borrow',
                component: () => import('@/pages/borrow/list')
            },{
                path: 'Record',
                name: 'Record',
                component: () => import('@/pages/user/record')
            },{
                path:"Ranking",
                name:"Ranking",
                component: () => import('@/pages/ranking')
            }
        ]
    }, {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login'),
    }, Others]
})
router.beforeEach(beforeEach)
router.afterEach(afterEach);

export default router
