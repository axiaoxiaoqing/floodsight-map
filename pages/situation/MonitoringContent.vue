<template>
  <view class="monitoring-content" v-if="contentData?.realTimeData">


    <!-- 实时数据网格 -->
    <view  class="data-grid">
      <view 
        v-for="(item, index) in contentData.realTimeData" 
        :key="index"
        class="data-item"
        :class="item.status"
      >
        <text class="data-label">{{ item.label }}</text>
        <text class="data-value">{{ item.value }}</text>
        <text class="data-unit">{{ item.unit }}</text>
      </view>
    </view>

    <!-- 图表区域 -->
    <view v-if="contentData?.hasChart" class="chart-section">
      <text class="chart-title">趋势图表</text>
      <view class="chart-container">
        <text class="chart-placeholder-text">图表展示区域</text>
      </view>
    </view>

  </view>
</template>

<script setup>


// 定义props
const props = defineProps({
  contentData: {
    type: Object,
    default: null
  }
})



</script>

<style scoped>
.monitoring-content {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  margin: 20rpx 0;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

/* 状态指示器样式 */
.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.status-indicator.normal {
  background-color: #e8f5e9;
  color: #4caf50;
}

.status-indicator.warning {
  background-color: #fff8e1;
  color: #ff9800;
}

.status-indicator.danger {
  background-color: #ffebee;
  color: #f44336;
}

.status-icon {
  margin-right: 10rpx;
  font-size: 32rpx;
}

/* 数据网格样式 */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.data-item {
  background-color: #f8f9fa;
  border-radius: 12rpx;
  padding: 20rpx;
  text-align: center;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
}

.data-item.normal {
  border-color: #4caf50;
}

.data-item.warning {
  border-color: #ff9800;
}

.data-item.danger {
  border-color: #f44336;
}

.data-label {
  display: block;
  font-size: 24rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.data-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 4rpx;
}

.data-unit {
  display: block;
  font-size: 20rpx;
  color: #999;
}

/* 图表区域样式 */
.chart-section {
  margin-bottom: 30rpx;
}

.chart-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 15rpx;
}

.chart-container {
  height: 300rpx;
  background-color: #f5f5f5;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder-text {
  color: #999;
  font-size: 24rpx;
}

</style>