// 引入mock模块
import Mock from "mockjs";

// 引入数据
import banner from './banner.json'
import floor from './floor.json'

// 模拟数据  第一个参数：请求地址 第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
