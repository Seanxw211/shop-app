import { reqCartList, reqDeleteCartById, reqUpdataCheckCartById } from '@/api';
//search模块的仓库
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(start, cartList) {
        start.cartList = cartList
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车某一个产品
    async reqDeleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 商品前的复选框
    async updataCheckCartById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdataCheckCartById(skuId, isChecked);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 全选
    updataAllCheckedCart({ dispatch, state }, isChecked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let Promise = dispatch('updataCheckCartById', { skuId: item.skuId, isChecked });
            // 将每次的promise加入数组
            PromiseAll.push(Promise);
        });
        // 只要都成功就成功 有一个失败则失败
        return Promise.all(PromiseAll)

    },
    // 删除全部勾选的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context相当于小仓库 ，
        //      commit【提交mutation修改state】  
        //      getters【计算属性】
        //      dispatch【派发action】
        //      state【当前仓库数据】
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let Promise = item.isChecked == 1 ? dispatch('reqDeleteCartById', item.skuId) : '';
            // 将每次的promise加入数组
            PromiseAll.push(Promise);
        });
        // 只要都成功就成功 有一个失败则失败
        return Promise.all(PromiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    // cartInfoList(state) {
    //     return state.cartList.cartInfoList || {}
    // }
};

export default {
    state,
    mutations,
    actions,
    getters,
};
