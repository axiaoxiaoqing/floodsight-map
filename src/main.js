import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
// 导入maplibre-gl配置，但不全局初始化，而是提供一个便捷访问方式
export function createApp() {
  const app = createSSRApp(App)

  // 可以在这里添加一些全局配置或辅助方法
  app.config.globalProperties.$maplibreConfig = {
    defaultStyle: 'https://demotiles.maplibre.org/style.json',
    defaultCenter: [104.0721, 30.5728], // 默认成都中心坐标
    defaultZoom: 12
  }

  return {
    app
  }
}
// #endif