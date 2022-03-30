import { reqAddressInfo, reqOrder } from '@/api'

const state = {
    address: [],
    orderInfo: {}
};
const mutations = {
    GETADDRESS(state, address) {
        state.address = address;
    },
    GETORDER(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
};
const actions = {
    // 获取用户地址信息
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETADDRESS', result.data)
        }
    },
    async getOrder({ commit }) {
        let result = await reqOrder();
        if (result.code == 200) {
            commit('GETORDER', result.data)
        }
    },

};
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
};