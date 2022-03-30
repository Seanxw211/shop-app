import { reqGetSearchInof } from '@/api';
//search模块的仓库
const state = {
  searchList: {}
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};
const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInof(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  }
};
const getters = {
  goodsList(state) {
    // 如果请求失败 没有得到数据  通过|| []返回一个空对象  防止goodsList为undefind报错
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
