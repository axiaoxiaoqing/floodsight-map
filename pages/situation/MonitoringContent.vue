<template>
  <view class="monitoring-content" v-if="contentData">
    <!-- 视频监控特殊处理 -->
    <view v-if="isVideoMonitoring" class="video-section">
      <text class="video-title">视频监控画面</text>
      <view v-if="!videoUrl" class="video-loading">
        <text class="loading-text">正在加载视频流...</text>
      </view>
      <view v-else class="video-container">
        <!-- #ifdef H5 -->
        <!-- H5平台支持HLS格式，使用标准video标签 -->
        <video 
          :src="videoUrl" 
          class="video-player" 
          autoplay 
          controls 
          playsinline
          x5-video-player-type="h5-page"
          x5-video-player-fullscreen="true"
          webkit-playsinline
        ></video>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <!-- 微信小程序平台特殊处理HLS格式 -->
        <video 
          :src="videoUrl" 
          class="video-player" 
          autoplay 
          controls 
          show-center-play-btn="false"
          enable-progress-gesture="true"
          type="live"
          show-play-btn="true"
          object-fit="contain"
        ></video>
        <!-- #endif -->
      </view>
    </view>

    <!-- 普通监测数据显示 -->
    <view v-else>
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
  </view>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

// 定义props
const props = defineProps({
  contentData: {
    type: Object,
    default: null
  },
  // 新增：接收当前按钮类型信息
  buttonType: {
    type: String,
    default: ''
  }
})

// 响应式数据
const videoUrl = ref('')
const isLoading = ref(false)

// 计算属性：是否为视频监控
const isVideoMonitoring = computed(() => {
  // 通过contentData的title判断是否为视频监控
  return props.contentData?.title?.includes('视频监控')
})

// 监听内容变化，当切换到视频监控时加载视频流
watch(() => props.contentData, (newContent) => {
  if (newContent && isVideoMonitoring.value) {
    loadVideoStream()
  } else {
    // 不是视频监控时清空视频URL
    videoUrl.value = ''
  }
}, { immediate: true })

// 加载视频流
function loadVideoStream() {
  if (!isVideoMonitoring.value) return
  
  isLoading.value = true
  videoUrl.value = ''
  
  try {
    console.log('开始加载视频流...')
    const url = 'http://172.26.70.181/videoservice/open/video/stream/v1/genPlayUrls?streamIds=11010000001320000030'
    
    // 使用 uni.request 替代 fetch，确保跨平台兼容
    uni.request({
      url: url,
      method: 'POST',
      header: {
        'x-api-key': 'b02286d43c0280a15c2a6c0868ba875e'
      },
      success: (res) => {
        console.log('视频流API响应:', res)
        
        if (res.statusCode === 200) {
          const data = res.data
          
          // 解析视频流URL (根据API响应结构提取hls流)
          const streamUrl = data.data?.[0]?.hls || ''
          
          if (streamUrl) {
            videoUrl.value = streamUrl
            console.log('获取到HLS视频流URL:', videoUrl.value)
          } else {
            throw new Error('未找到有效HLS视频流URL')
          }
        } else {
          throw new Error(`HTTP错误! 状态: ${res.statusCode}`)
        }
      },
      fail: (err) => {
        console.error('视频流请求失败:', err)
        uni.showToast({
          title: '视频流请求失败: ' + err.errMsg,
          icon: 'none',
          duration: 3000
        })
      },
      complete: () => {
        isLoading.value = false
      }
    })
    
  } catch (error) {
    console.error('加载视频流失败:', error)
    uni.showToast({
      title: '视频流加载失败: ' + error.message,
      icon: 'none',
      duration: 3000
    })
    isLoading.value = false
  }
}
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

/* 视频监控样式 */


.video-section {

  background-color: #f8f9fa;


}

.video-title {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.video-loading {
  height: 400rpx;
  background-color: #f5f5f5;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text {
  color: #999;
  font-size: 28rpx;
}

.video-container {
  background-color: #000;
  border-radius: 12rpx;
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: 400rpx;
  display: block;
}

</style>