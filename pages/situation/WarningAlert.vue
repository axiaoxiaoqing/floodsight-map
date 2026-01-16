<template>
  <view class="warning-alert-container card">
    <!-- 状态1：无预警 -->
    <view v-if="!hasWarning" class="no-warning">
      <view class="weather-info">
        <text class="weather-icon">{{ weatherIcon }}</text>
        <view class="weather-details">
          <text class="weather-status">{{ weatherStatus }}</text>
          <text class="weather-temp">{{ temperature }}°C</text>
        </view>
      </view>
      <view class="no-warning-message">
        <text class="message-title">当前无预警</text>
        <text class="message-content">天气良好，暂无防汛预警信息</text>
        <view class="learn-more" @click="navigateToScience">
          <text class="learn-text">学习防汛知识</text>
          <text class="learn-arrow">→</text>
        </view>
      </view>
    </view>

    <!-- 状态2：有预警 -->
    <view v-else class="has-warning" :class="warningLevelClass">
      <view class="warning-header">
        <text class="warning-icon">⚠️</text>
        <view class="warning-title-container">
          <text class="warning-title">{{ warningTitle }}</text>
          <text class="warning-level">{{ warningLevel }}</text>
        </view>
      </view>
      <view class="warning-content">
        <text class="warning-description">{{ warningDescription }}</text>
        <view class="warning-actions">
          <view class="action-button primary" @click="viewEvacuationRoute">
            <text class="action-text">查看转移路线</text>
          </view>
          <view class="action-button secondary" @click="viewWarningDetails">
            <text class="action-text">预警详情</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const hasWarning = ref(false) // 控制是否有预警

// 无预警状态数据
const weatherIcon = ref('☀️')
const weatherStatus = ref('晴')
const temperature = ref('25')

// 有预警状态数据
const warningLevel = ref('橙色预警')
const warningDescription = ref('未来3小时内可能发生严重洪水，建议避免外出，做好防范准备。')

// 计算属性
const warningTitle = computed(() => {
  return `${weatherStatus.value} ${warningLevel.value}`
})

const warningLevelClass = computed(() => {
  if (!hasWarning.value) return ''
  
  const level = warningLevel.value
  if (level.includes('红色')) return 'warning-red'
  if (level.includes('橙色')) return 'warning-orange'
  if (level.includes('黄色')) return 'warning-yellow'
  if (level.includes('蓝色')) return 'warning-blue'
  return ''
})

// 方法
function navigateToScience() {
  try {
    console.log('尝试跳转到科普页面...')
    // 先检查 uni 对象是否存在
    if (typeof uni === 'undefined') {
      console.error('uni 对象未定义！')
      return
    }
    // 科普页面是 tabbar 页面，必须使用 switchTab 跳转
    uni.switchTab({
      url: '/pages/science/index',
    })
  } catch (error) {
    console.error('跳转发生异常：', error)
  }
}

function viewEvacuationRoute() {
  uni.showToast({
    title: '转移路线功能开发中',
    icon: 'none',
    duration: 2000
  })
}

function viewWarningDetails() {
  uni.showToast({
    title: '预警详情功能开发中',
    icon: 'none',
    duration: 2000
  })
  // 这里可以添加查看预警详情的逻辑
}

// 模拟预警状态变化（用于测试）
setTimeout(() => {
  hasWarning.value = true
  warningLevel.value = '黄色预警'
  weatherStatus.value = '暴雨'
  temperature.value = '21'
}, 3000) // 3秒后模拟出现预警

setTimeout(() => {
  hasWarning.value = true
  warningLevel.value = '红色预警'
  weatherStatus.value = '特大暴雨'
  temperature.value = '19'
}, 8000) // 8秒后模拟升级为红色预警

setTimeout(() => {
  hasWarning.value = false
  weatherStatus.value = '晴'
  temperature.value = '25'
}, 13000) // 13秒后模拟预警解除
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  margin: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.warning-alert-container {
  margin-bottom: 20rpx;

}

/* 无预警状态样式 */
.no-warning {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.weather-info {
  display: flex;
  align-items: center;
  padding-right: 24rpx;
}

.weather-icon {
  font-size: 64rpx;
  margin-right: 20rpx;
}

.weather-details {
  display: flex;
  flex-direction: column;
}

.weather-status {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 4rpx;
}

.weather-temp {
  font-size: 28rpx;
  color: #666;
}

.no-warning-message {
  flex: 1;
  border-left: 1rpx solid #f0f0f0;
  padding-left: 24rpx;
}

.message-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 8rpx;
  display: block;
}

.message-content {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 16rpx;
  display: block;
}

.learn-more {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 16rpx 0;
  pointer-events: auto;
  width: fit-content;
  z-index: 10;
  border-radius: 8rpx;
  transition: background-color 0.2s;
}

.learn-more:active {
  background-color: rgba(0, 122, 255, 0.1);
}

.learn-text {
  font-size: 28rpx;
  color: #007AFF;
  margin-right: 8rpx;
}

.learn-arrow {
  font-size: 24rpx;
  color: #007AFF;
}

/* 有预警状态样式 */
.has-warning {
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

/* 不同预警级别样式 */
.warning-blue {
  background-color: #e3f2fd;
  border-left: 8rpx solid #2196f3;
}

.warning-yellow {
  background-color: #fff8e1;
  border-left: 8rpx solid #ffc107;
}

.warning-orange {
  background-color: #fff3e0;
  border-left: 8rpx solid #ff9800;
}

.warning-red {
  background-color: #ffebee;
  border-left: 8rpx solid #f44336;
}

.warning-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.warning-icon {
  font-size: 48rpx;
  margin-right: 16rpx;
}

.warning-title-container {
  flex: 1;
}

.warning-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 4rpx;
  display: block;
}

.warning-level {
  font-size: 28rpx;
  font-weight: bold;
  display: block;
}

.warning-blue .warning-level {
  color: #2196f3;
}

.warning-yellow .warning-level {
  color: #ffc107;
}

.warning-orange .warning-level {
  color: #ff9800;
}

.warning-red .warning-level {
  color: #f44336;
}

.warning-description {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 24rpx;
  display: block;
}

.warning-actions {
  display: flex;
  gap: 16rpx;
}

.action-button {
  flex: 1;
  border-radius: 8rpx;
  padding: 20rpx;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button.primary {
  background-color: rgba(255, 255, 255, 0.9);
  border: 2rpx solid #fff;
}

.action-button.secondary {
  background-color: rgba(255, 255, 255, 0.7);
  border: 2rpx solid rgba(255, 255, 255, 0.8);
}

.action-button:active {
  opacity: 0.8;
}

.action-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}
</style>