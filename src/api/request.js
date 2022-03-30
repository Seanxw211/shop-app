//对于axios进行二次封装  主要是用拦截器
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
// 引入store 
import store from "@/store";

// 1、利用axios对象的方法create，去创造一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径
    baseURL: "/api",
    timeout: 5000,
})
// 请求拦截器
requests.interceptors.request.use((config) => {
    //进度条开始
    nprogress.start();
    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段（userTempId） 和后端统一
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要将token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }

    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来以后，
    //进度条结束
    nprogress.done();
    return res.data
}, (error) => {

    alert("服务器响应数据失败");
})



// 对外暴露
export default requests;