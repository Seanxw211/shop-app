import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
// 封装一个游客的uuid 字符串 随机生成 生成之后不能改变
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodInfo: {},
    // 游客临时身份 uuid
    uuid_token: getUUID()
};
const mutations = {
    GETGOODINFO(start, goodInfo) {
        state.goodInfo = goodInfo
    }
};
const actions = {
    // 获取产品信息
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中 
    // 加入购物车以后, 前台将数据带给服务器, 
    // 服务器返回接收成功  不需要返回其他数据 所以不用配置mutations和state
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // console.log(result);
        if (result.code == 200) {
            // 成功
            return "ok"
        } else {
            // 失败
            return Promise.reject(new Error('false'))
        }
    }
};
const getters = {
    // 路径导航简化数据
    categoryView() {
        // goodInfo初始是空对象 所以goodInfo.categoryView是undefind 控制台会报错
        // 但是实际页面效果没问题 
        // 是因为 开始是报错 等到获取的数据返回后页面加载成功了 控制台会报错不会消失
        // 所以后面加上 ||{} （或空对象） 来保证或前是undefined时 至少是一个空对象 让控制台不报错
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo() {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}