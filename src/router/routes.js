// 采用路由懒加载

// 引入一级路由    
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由
import MyOrder from "@/pages/Center/MyOrder"
import GroupOrder from "@/pages/Center/GroupOrder"


/* 路由懒加载
    当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
    如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/
export default [
    {
        path: "/home",
        component: () => import("@/pages/Home"),
        // 路由元信息key ，只能用meta (footer是否显示)
        meta: { show: true }
    },
    {
        path: "/center",
        component: () => import("@/pages/Center"),
        meta: { show: true },
        // 二级路由
        children: [
            {
                path: 'myorder',
                component: () => import("@/pages/Center/MyOrder")
            },
            {
                path: 'grouporder',
                component: () => import("@/pages/Center/GroupOrder")
            },
            // 访问center 默认显示/center/myorder
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: "/shopcart",
        name: "shopcart",
        component: () => import("@/pages/ShopCart"),
        meta: { show: true }
    },
    {
        path: "/paysuccess",
        name: "paysuccess",
        component: () => import("@/pages/PaySuccess"),
        meta: { show: true },
        // // 路由独享守卫 可以实现  这里用的是组件内守卫
        // beforeEnter: (to, from, next) => {
        //     // 只有从 pay 来才放行
        //     if (from.path == '/pay') {
        //         next()
        //     } else {
        //         // 中断当前导航，url会重置到from（从哪来回哪去）
        //         next(false)
        //     }
        // }
    },
    {
        path: "/pay",
        name: "pay",
        component: () => import("@/pages/Pay"),
        meta: { show: true },
        // 路由独享守卫 
        beforeEnter: (to, from, next) => {
            // 只有从 trade 来才放行
            if (from.path == '/trade') {
                next()
            } else {
                // 中断当前导航，url会重置到from（从哪来回哪去）
                next(false)
            }
        }
    },
    {
        path: "/trade",
        name: "trade",
        component: () => import("@/pages/Trade"),
        meta: { show: true },
        // 路由独享守卫 
        beforeEnter: (to, from, next) => {
            // 只有从 shopcart 来才放行
            if (from.path == '/shopcart') {
                next()
            } else {
                // 中断当前导航，url会重置到from（从哪来回哪去）
                next(false)
            }
        }
    },
    {
        path: "/login",
        component: () => import("@/pages/Login"),
        meta: { show: false }
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: () => import("@/pages/AddCartSuccess"),
        meta: { show: true }
    },
    {
        // 详情页面必然需要传参 所以需要params占位
        path: "/detail/:skuid",
        component: () => import("@/pages/ShopCart"),
        meta: { show: false }
    },
    {
        path: "/register",
        component: () => import("@/pages/Register"),
        meta: { show: false }
    },
    {
        // params占位/:keyword
        // 后面加 ? params参数可传可不传 不加则必须传params
        path: "/search/:keyword?",
        component: () => import("@/pages/Search"),
        meta: { show: true },
        name: 'search',
        // 路由组件传props参数 将 props: true  这种方式只能传pramas
        // props: true
        // 路由组件传props参数 对象写法 可传额外参数
        // props: { a: 1, b: 2 },
        // 路由组件传props参数 函数写法 可传params、query参数（最常用）
        // props: ($route) => {
        //     return {
        //         keyword: $route.params.keyword,
        //         k: $route.query.k
        //     }
        // },


    },
    //重定向，项目跑起来之后立刻定位到首页
    {
        path: "*",
        redirect: "/home"
    }
]