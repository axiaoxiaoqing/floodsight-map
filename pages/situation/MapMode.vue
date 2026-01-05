<template>
  <view class="map-container">
    <view class="map-placeholder">
      <text class="map-text">🗺️ 地图显示区域</text>
      <text class="map-subtitle">显示{{ monitoringButtons[currentButton].text }}监测点位</text>
    </view>
    
    <!-- 可以在这里集成真实的地图组件 -->
    <view class="map-features">
      <view class="feature-item" v-for="(feature, index) in mapFeatures" :key="index">
        <text class="feature-icon">{{ feature.icon }}</text>
        <text class="feature-text">{{ feature.text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

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

// 地图功能特性
const mapFeatures = ref([
  { icon: '📍', text: '监测点位标记' },
  { icon: '🛣️', text: '道路信息' },
  { icon: '🏞️', text: '地形地貌' },
  { icon: '🌊', text: '水系分布' }
])
</script>

<style scoped>
.map-container {
  margin-top: 20rpx;
}

.map-placeholder {
  width: 100%;
  height: 400rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.3);
  margin-bottom: 30rpx;
}

.map-text {
  font-size: 48rpx;
  color: white;
  margin-bottom: 12rpx;
  font-weight: bold;
}

.map-subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 1.4;
}

.map-features {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20rpx;
}

.feature-item {
  flex: 1;
  min-width: 150rpx;
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  text-align: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid #f0f0f0;
}

.feature-icon {
  display: block;
  font-size: 36rpx;
  margin-bottom: 12rpx;
}

.feature-text {
  font-size: 24rpx;
  color: #666;
  line-height: 1.3;
}
</style>