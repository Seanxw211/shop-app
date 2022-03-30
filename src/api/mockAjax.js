//对于axios进行二次封装  主要是用拦截器
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";


// 1、利用axios对象的方法create，去创造一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径
    baseURL: "/mock",
    timeout: 5000,
})
// 请求拦截器
requests.interceptors.request.use((config) => {
    //进度条开始
    nprogress.start();

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