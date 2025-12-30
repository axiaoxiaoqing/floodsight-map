<template>
  <view class="details-section">
    <!-- 选中按钮的信息展示 -->
    <view class="selected-info">
      <text class="info-title">{{ selectedButtonInfo.title }}</text>
      <text class="info-description">{{ selectedButtonInfo.description }}</text>
    </view>

    <!-- 监测详情子组件 -->
    <MonitoringContent :content-data="currentContent" />
    
  </view>
</template>

<script setup>
import { computed } from 'vue'
import MonitoringContent from './MonitoringContent.vue'

// 接收父组件传递的数据
const props = defineProps({
  currentButton: {
    type: Number,
    default: 0
  },
  buttonContents: {
    type: Array,
    required: true
  },
  monitoringButtons: {
    type: Array,
    required: true
  }
})

// 计算当前选中按钮的信息
const selectedButtonInfo = computed(() => {
  if (props.currentButton >= 0 && props.currentButton < props.monitoringButtons.length) {
    return props.monitoringButtons[props.currentButton]
  }
  return {
    title: '',
    description: ''
  }
})

// 计算当前内容数据
const currentContent = computed(() => {
  if (props.currentButton >= 0 && props.currentButton < props.buttonContents.length) {
    return props.buttonContents[props.currentButton]
  }
  return null
})
</script>

<style scoped>
.details-section {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-top: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.selected-info {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  border-left: 4rpx solid #007AFF;
}

.info-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 10rpx;
}

.info-description {
  display: block;
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

.chart-section {
  margin-top: 30rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  padding: 20rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 15rpx;
  display: block;
}

.chart-placeholder {
  height: 300rpx;
  background: #f5f5f5;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-text {
  color: #999;
  font-size: 24rpx;
}
</style>