<template>
  <view class="container">
    <view class="header">
      <text class="title">实时汛情态势</text>
    </view>
    <view class="content">
      <view class="situation-card">
        <view class="card-header">
          <text class="card-title">当前水位监测</text>
          <text class="update-time">更新时间：{{ updateTime }}</text>
        </view>
        <view class="water-level">
          <text class="level-value">{{ waterLevel }} m</text>
          <text class="level-status" :class="levelClass">{{ levelStatus }}</text>
        </view>
      </view>
      <view class="data-list">
        <view class="data-item">
          <text class="data-label">预警站点</text>
          <text class="data-value">{{ warningCount }}个</text>
        </view>
        <view class="data-item">
          <text class="data-label">降雨量</text>
          <text class="data-value">{{ rainfall }} mm</text>
        </view>
        <view class="data-item">
          <text class="data-label">24小时变化</text>
          <text class="data-value" :class="changeClass">{{ waterLevelChange }} m</text>
        </view>
      </view>
      <view class="chart-section">
        <text class="section-title">水位分布地图</text>
        <!-- H5环境使用maplibre-gl -->
        <!-- #ifdef H5 -->
        <div id="waterMap" class="water-map"></div>
        <!-- #endif -->
        
        <!-- 微信小程序环境使用原生地图组件 -->
        <!-- #ifdef MP-WEIXIN -->
        <map 
          id="myWaterMap" 
          class="water-map"
          :latitude="mapLatitude"
          :longitude="mapLongitude"
          :scale="mapScale"
          :markers="waterMarkers"
          :show-location="true"
        ></map>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// #ifdef H5
// H5环境导入maplibre-gl
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
// #endif

// 响应式数据
const updateTime = ref('')
const waterLevel = ref('12.5')
const levelStatus = ref('正常')
const levelClass = ref('normal')
const warningCount = ref('3')
const rainfall = ref('45.2')
const waterLevelChange = ref('+0.3')
const changeClass = ref('rise')

// 地图相关数据
const waterMap = ref(null)
const mapLatitude = ref(39.9042) // 默认北京坐标
const mapLongitude = ref(116.4074)
const mapScale = ref(10)
const waterMarkers = ref([])

// H5环境地图初始化
function initWaterMap() {
  // 确保容器已渲染
  nextTick(() => {
    try {
      const config = window.$root?.$maplibreConfig || {
        defaultStyle: 'https://demotiles.maplibre.org/style.json',
        defaultCenter: [mapLongitude.value, mapLatitude.value],
        defaultZoom: 10
      }

      waterMap.value = new maplibregl.Map({
        container: 'waterMap',
        style: config.defaultStyle,
        center: config.defaultCenter,
        zoom: config.defaultZoom,
        antialias: true
      })

      waterMap.value.addControl(new maplibregl.NavigationControl(), 'top-right')
      waterMap.value.addControl(new maplibregl.ScaleControl(), 'bottom-left')

      waterMap.value.on('load', () => {
        console.log('水位分布地图加载完成')
        // 添加水位监测点数据
        addWaterLevelMarkers()
      })

    } catch (error) {
      console.error('水位地图初始化失败:', error)
    }
  })
}

// 添加水位监测点标记
function addWaterLevelMarkers() {
  // 模拟的水位监测点数据
  const markers = [
    { lng: 116.4074, lat: 39.9042, name: '监测点1', level: 12.5, status: 'normal' },
    { lng: 116.4574, lat: 39.9142, name: '监测点2', level: 15.2, status: 'warning' },
    { lng: 116.3574, lat: 39.8942, name: '监测点3', level: 18.7, status: 'danger' }
  ]

  // #ifdef H5
  if (waterMap.value) {
    markers.forEach(marker => {
      const el = document.createElement('div')
      el.className = 'custom-marker'
      el.style.backgroundColor = marker.status === 'danger' ? '#f44336' : 
                                marker.status === 'warning' ? '#ff9800' : '#4caf50'
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.display = 'flex'
      el.style.alignItems = 'center'
      el.style.justifyContent = 'center'
      el.style.color = 'white'
      el.style.fontSize = '10px'
      el.style.fontWeight = 'bold'
      
      new maplibregl.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new maplibregl.Popup().setHTML(`
          <div>
            <h3>${marker.name}</h3>
            <p>水位: ${marker.level}m</p>
            <p>状态: ${marker.status === 'danger' ? '危险' : 
                   marker.status === 'warning' ? '预警' : '正常'}</p>
          </div>
        `))
        .addTo(waterMap.value)
    })
  }
  // #endif
  
  // #ifdef MP-WEIXIN
  waterMarkers.value = markers.map(marker => ({
    id: marker.name,
    latitude: marker.lat,
    longitude: marker.lng,
    width: 30,
    height: 30,
    iconPath: marker.status === 'danger' ? '/static/icon/warning.png' : 
              marker.status === 'warning' ? '/static/icon/warning.png' : '/static/icon/normal.png',
    title: marker.name,
    callout: {
      content: `${marker.name}: ${marker.level}m`,
      display: 'BYCLICK'
    }
  }))
  // #endif
}

// 初始化数据
onMounted(() => {
  updateTime.value = new Date().toLocaleString('zh-CN')
  
  // 条件编译初始化不同环境的地图
  // #ifdef H5
  initWaterMap()
  // #endif
})

// 页面卸载时清理地图资源
function onUnmounted() {
  // #ifdef H5
  if (waterMap.value) {
    waterMap.value.remove()
    waterMap.value = null
  }
  // #endif
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  padding: 20rpx;
  background-color: #007AFF;
  color: white;
  text-align: center;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
}

.content {
  padding: 20rpx;
  flex: 1;
}

.situation-card {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.update-time {
  font-size: 24rpx;
  color: #999;
}

.water-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level-value {
  font-size: 64rpx;
  font-weight: bold;
  color: #007AFF;
}

.level-status {
  font-size: 32rpx;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
}

.level-status.normal {
  background-color: #e8f5e9;
  color: #4caf50;
}

.level-status.warning {
  background-color: #fff8e1;
  color: #ff9800;
}

.level-status.danger {
  background-color: #ffebee;
  color: #f44336;
}

.data-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.data-item {
  flex: 1;
  background-color: white;
  border-radius: 12rpx;
  padding: 20rpx;
  margin: 0 10rpx;
  text-align: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.data-label {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.data-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.data-value.rise {
  color: #f44336;
}

.data-value.drop {
  color: #4caf50;
}

.chart-section {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.chart-placeholder {
  width: 100%;
  height: 300rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 28rpx;
  border-radius: 8rpx;
}

/* 地图容器样式 */
.water-map {
  width: 100%;
  height: 1000rpx;
  border-radius: 8rpx;
  overflow: hidden;
  background-color: #f0f0f0;
}

/* 为H5环境添加地图容器特定样式 */
#waterMap {
  position: relative;
}

/* 自定义标记样式 */
:deep(.custom-marker) {
  cursor: pointer;
  transition: transform 0.2s;
}

:deep(.custom-marker:hover) {
  transform: scale(1.2);
  z-index: 10;
}
</style>