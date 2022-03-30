//当前模块 对API进行统一管理
import requests from "./request";

import mockRequests from "./mockAjax";

// 三级联动接口
// axiosf发请求 返回的是promise对象  
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取banner（home首页轮播图）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取serarch数据  post请求 需要带参数
// 给服务器法请求params至少是一个空对象 
// 所以调用的时候 要有默认值 至少是一个空对象
export const reqGetSearchInof = (params) => requests({ url: "/list", method: "post", data: params })

// 获取详情页信息接口
// URL：/api/item / { skuId } 
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" })

// 添加到购物车接口(或更新购物车产品数量)
// URL： /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

// 获取购物车列表数据接口
// URL： /api/cart/cartList
export const reqCartList = () => requests({ url: `/cart/cartList`, method: "get" })

// 删除购物车
// URL：/api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })

// 切换商品选中状态
// URL： /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdataCheckCartById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })

// 获取随机验证码
// URL： /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })

// 注册用户
// URL： /api/user/passport/register
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: "post" })

// 登录
// URL：  /api/user/passport/login
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: "post" })

// token 校验
// URL：  /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: "get" })

// 退出登录
// URL： /api/user/passport/logout
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: "get" })

//  获取用户地址信息
// URL： /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: "get" })

// 获取商品清单
// URL： /api/order/auth/trade
export const reqOrder = () => requests({ url: `/order/auth/trade`, method: "get" })

// 提交订单
// URL：/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })


// 获取订单支付信息
// URL:  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })

// 查询支付订单状态
// URL:  /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })

// 获取我的订单列表
// URL: /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: "get" })
