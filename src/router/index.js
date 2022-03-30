// 路由配置
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);
// 引入store
import store from '@/store';

let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
});

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to: 获取你要跳转到的那个路由信息
    // from: 获取从哪个路由信息来的
    // next: 放行函数  
    // 如果直接写 next();  直接放行
    // next(path);  放行到指定地址
    // next(false);  
    // 获取token 
    let token = store.state.user.token;
    // 获取用户信息
    let name = store.state.user.userInfo.name;

    // 判断是否登录
    if (token) {
        // 如果已登录
        // 还想去login  停留在首页
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            // 直接放行 在serch刷新登录会消失
            // next();
            // 所以要判断是否有用户信息
            if (name) {
                // 如果有用户名 放行
                next();
            } else {
                // 如果没有用户名 派发action让仓库存储 再放行  （getUserInfo）
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token失效时会走到这里 需要让用户重新登录
                    //  1、清除token 
                    await store.dispatch('userLogout');
                    //  2、送到login页面
                    next('/login');

                }
            }
        }
    } else {
        // 用户未登录
        // 不能去 交易相关 支付相关 个人中心
        // 如果强行去 则转到登录页面
        let toPath = to.path;
        if (to.path.indexOf('/pay') != -1 || to.path.indexOf('/trade') != -1 || to.path.indexOf('/center') != -1) {
            // 通过query参数 保留原来想去的页面
            next('/login?redirect=' + toPath)
        } else {
            next();
        }
    }
})



export default router