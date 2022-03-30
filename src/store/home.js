import { reqCategoryList, reqFloorList, reqGetBannerList } from "@/api";
// home 模块的仓库
const state = {
  // 
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(start, bannerList) {
    start.bannerList = bannerList;
  },
  FLOORLIST(start, floorList) {
    start.floorList = floorList;
  }
};
const actions = {
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("BANNERLIST", result.data);
    }
  },
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit("FLOORLIST", result.data);
    }
  }
};
const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters,
};
