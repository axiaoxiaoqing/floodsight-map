<template>
  <view class="care-mode-container">
    <view class="care-card">
      <view class="care-header">
        <text class="care-title">{{ buttonContents[currentButton].title }}</text>
        <view class="care-status" :class="buttonContents[currentButton].status">
          <text class="status-text">{{ getStatusText(buttonContents[currentButton].status) }}</text>
        </view>
      </view>
      
      <view class="care-description">
        <text class="description-text">{{ buttonContents[currentButton].description }}</text>
      </view>
      
      <view class="care-data-grid">
        <view 
          v-for="(data, index) in buttonContents[currentButton].realTimeData" 
          :key="index"
          class="care-data-item"
        >
          <text class="care-data-label">{{ data.label }}</text>
          <text class="care-data-value" :class="data.status">{{ data.value }}{{ data.unit }}</text>
        </view>
      </view>
      <!-- 额外的关怀功能 -->
      <view class="care-actions">
        <view class="action-button primary">
          <text class="action-text">📞 紧急联系</text>
        </view>
        <view class="action-button secondary">
          <text class="action-text">📋 详细报告</text>
        </view>
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
  buttonContents: {
    type: Array,
    required: true
  }
})

// 获取状态文本
function getStatusText(status) {
  const statusMap = {
    'normal': '正常',
    'warning': '预警',
    'danger': '危险'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.care-mode-container {
  margin-top: 20rpx;
}

.care-card {
  background-color: white;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid #f0f0f0;
}

.care-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #f5f5f5;
}

.care-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.2;
  flex: 1;
}

.care-status {
  padding: 12rpx 24rpx;
  border-radius: 25rpx;
  font-size: 24rpx;
  font-weight: 600;
}

.care-status.normal {
  background-color: #e8f5e9;
  color: #4caf50;
}

.care-status.warning {
  background-color: #fff8e1;
  color: #ff9800;
}

.care-status.danger {
  background-color: #ffebee;
  color: #f44336;
}

.care-description {
  margin-bottom: 40rpx;
}

.description-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.care-data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 24rpx;
  margin-bottom: 40rpx;
}

.care-data-item {
  background-color: #f8f9fa;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  text-align: center;
  border: 2rpx solid #e9ecef;
  transition: all 0.3s ease;
}

.care-data-item:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.care-data-label {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 12rpx;
  line-height: 1.3;
}

.care-data-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  line-height: 1.2;
}

.care-data-value.normal {
  color: #4caf50;
}

.care-data-value.warning {
  color: #ff9800;
}

.care-data-value.danger {
  color: #f44336;
}

.status-text {
  font-size: 24rpx;
  font-weight: 600;
}

/* 关怀模式下的操作按钮 */
.care-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}

.action-button {
  flex: 1;
  padding: 20rpx;
  border-radius: 16rpx;
  text-align: center;
  transition: all 0.3s ease;
}

.action-button.primary {
  background-color: #007AFF;
  color: white;
}

.action-button.secondary {
  background-color: #f0f0f0;
  color: #333;
}

.action-button:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
}

.action-text {
  font-size: 28rpx;
  font-weight: 600;
}
</style>