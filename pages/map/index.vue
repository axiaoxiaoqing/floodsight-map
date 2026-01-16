<template>
  <view class="container">
    <view class="content">
      <!-- 地图卡片 -->
      <view class="map-card">
        <!-- uni-app地图组件 -->
        <map 
          id="map" 
          class="map-container" 
          :scale="13" 
          :latitude="mapCenter.lat" 
          :longitude="mapCenter.lng" 
          :markers="markers" 
          :show-location="true" 
          :show-scale="true"
        ></map>
      </view>
      
      <!-- 地图功能特性 -->
      <view class="map-features">
        <view class="feature-item" v-for="(feature, index) in mapFeatures" :key="index">
          <text class="feature-icon">{{ feature.icon }}</text>
          <text class="feature-text">{{ feature.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'

// 接收父组件传递的props
const props = defineProps({
  currentButton: {
    type: Number,
    required: true
  },
  monitoringButtons: {
    type: Array,
    required: true
  }
})

// 地图中心点
const mapCenter = ref({
  lng: 116.397428,
  lat: 39.90923
})

// 地图标记点
const markers = ref([])

// 地图功能特性
const mapFeatures = ref([
  { icon: '📍', text: '监测点位标记' },
  { icon: '🛣️', text: '道路信息' },
  { icon: '🏞️', text: '地形地貌' },
  { icon: '🌊', text: '水系分布' }
])

// 更新监测点位标记
const updateMonitoringMarkers = () => {
  // 模拟监测点位数据
  const markersData = [
    { id: 1, lng: 116.397428, lat: 39.90923, name: '监测点1' },
    { id: 2, lng: 116.405285, lat: 39.904154, name: '监测点2' },
    { id: 3, lng: 116.410000, lat: 39.910000, name: '监测点3' }
  ]
  
  // 转换为uni-app地图组件需要的markers格式
  markers.value = markersData.map((item, index) => ({
    id: item.id,
    latitude: item.lat,
    longitude: item.lng,
    title: item.name,
    iconPath: '/static/icon/normal.png', // 使用项目中的图标
    width: 32,
    height: 32,
    callout: {
      content: item.name,
      fontSize: 14,
      borderRadius: 4,
      bgColor: '#fff',
      color: '#333',
      padding: 8,
      display: 'BYCLICK'
    }
  }))
}

// 监听监测类型变化
watch(() => props.currentButton, () => {
  updateMonitoringMarkers()
})

// 初始化标记
updateMonitoringMarkers()
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20rpx;
  flex: 1;
}

/* 地图卡片样式 */
.map-card {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

/* 地图容器样式 */
.map-container {
  width: 100%;
  height: 1000rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

/* 地图功能特性样式 */
.map-features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
  margin-top: 20rpx;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24rpx 10rpx;
  background-color: white;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid #f0f0f0;
  min-height: 120rpx;
  transition: all 0.3s ease;
}

.feature-item:active {
  transform: translateY(-2rpx);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
}

.feature-icon {
  display: block;
  font-size: 40rpx;
  margin-bottom: 16rpx;
  line-height: 1;
}

.feature-text {
  font-size: 24rpx;
  color: #666;
  line-height: 1.3;
  text-align: center;
}

/* 自定义标记样式 */
.custom-marker {
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>