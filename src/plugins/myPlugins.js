// 自定义插件
// vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function (Vue, options) {
    // 可以得到Vue
    // 全局指令
    // Vue.directive(options.name)
    console.log('自定义插件调用')
}

export default myPlugins