import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token";


const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        // 把仓库中相关数据清空
        state.token = '';
        state.userInfo = {};
        // 
        removeToken()
    }

};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的接口 把验证码返回到用户手机上了
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 登录  会涉及到【token】 令牌
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // 服务器下发的token 是用户的唯一标识
        // 经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            // 拿到之后 持久存储token ()
            // localStorage.setItem('TOKEN', result.data.token)
            // 和上面的代码效果一样  把上面的代码单独分装到utils中  
            setToken(result.data.token);
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息reqUserInfo
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 只是向服务器法请求 通知服务器清除
        let result = await reqLogout()
        if (result.code == 200) {
            // action里不能直接操作state
            commit("CLEAR")
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
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
