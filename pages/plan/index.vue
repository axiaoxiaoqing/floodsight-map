<template>
  <view class="container">
    <view class="header">
      <view class="header-left" @click="showLocationTip">
        <image 
          src="/static/situ-icon/定位.svg" 
          class="location-icon"
          mode="aspectFit"
        />
        <text class="location-name">北庄村</text>
      </view>
      <view class="header-right">
        <view class="custom-picker" @click="toggleDropdown">
          <view class="picker-text">{{ currentViewMode }}</view>
          <view class="dropdown-arrow" :class="{ 'arrow-up': isDropdownOpen }"></view>
        </view>
        <view v-if="isDropdownOpen" class="dropdown-menu">
          <view 
            v-for="(mode, index) in viewModes" 
            :key="index"
            class="dropdown-item" 
            @click="selectViewMode(index)"
          >
            {{ mode }}
          </view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="situation-card" >
        <view class="button-grid">
          <view 
            v-for="(button, index) in monitoringButtons" 
            :key="index"
            class="monitoring-button"
            :class="{ 'active': currentButton === index }"
            @click="selectButton(index)"
          >
            <!-- 显示SVG图标或emoji -->
            <image 
              v-if="isSvgIcon(button.icon)" 
              :src="button.icon" 
              class="button-icon-svg"
              mode="aspectFit"
            />
            <text v-else class="button-icon-emoji">{{ button.icon }}</text>
            
            <text class="button-text">{{ button.text }}</text>
          </view>
        </view>
      
      </view>
      

    
      <view class="details-container">
        <!-- 监测详情组件 - 与选择框联动 -->
        <DetailsSection 
          :current-button="currentButton"
          :button-contents="buttonContents"
          :monitoring-buttons="monitoringButtons"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// 导入监测详情子组件
import DetailsSection from '../situation/DetailsSection.vue'
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'

// 响应式数据
const updateTime = ref('')

// 监测按钮数据
const monitoringButtons = ref([
  { 
    text: '桥梁', 
    icon: '/static/plan-icon/桥梁.svg',
    title: '桥梁监测',
    description: '桥梁结构安全监测，包括桥墩、桥面位移、应力监测等'
  },
  { 
    text: '重点关注点', 
    icon: '/static/plan-icon/重点关注点.svg',
    title: '重点关注点',
    description: '重点关注区域监测，包括关键设施、地质隐患点等'
  },
  { 
    text: '隐患点', 
    icon: '/static/plan-icon/隐患点.svg',
    title: '隐患点排查',
    description: '安全隐患排查与监测，及时发现和预警潜在风险'
  }
])

const currentButton = ref(0)

// 监测按钮详细内容数据
const buttonContents = ref([
 
])

// 视图模式数据
const viewModes = ref(['图文模式', '地图模式', '关怀模式'])
const currentViewMode = ref('图文模式')
const isDropdownOpen = ref(false)

// 视图模式切换处理函数
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function selectViewMode(index) {
  currentViewMode.value = viewModes.value[index]
  isDropdownOpen.value = false
}

// 显示位置提示
function showLocationTip() {
  uni.showToast({
    title: '暂不支持更换',
    icon: 'none',
    duration: 2000
  })
}

// 选择监测按钮
function selectButton(index) {
  currentButton.value = index
}

// 判断是否为SVG图标
function isSvgIcon(iconPath) {
  return typeof iconPath === 'string' && iconPath.endsWith('.svg')
}

// 初始化数据
onMounted(() => {
  updateTime.value = new Date().toLocaleString('zh-CN')
})

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  padding-top: 20rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  flex: 2;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8rpx;
  padding: 20rpx;
  margin-right: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25rpx;
}

.location-icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 12rpx;
}

.location-name {
  color: #000000;
  text-align: center;
}

.header-right {
  flex: 1;
  position: relative;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8rpx;
  padding: 20rpx;
  color: #333;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  height: 25rpx;
  display: flex;
  align-items: center;
}

.custom-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
}

.picker-text {
  font-size: 28rpx;
  color: #333;
  flex: 1;
}

.dropdown-arrow {
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-top: 10rpx solid #666;
  transition: transform 0.3s;
  margin-left: 10rpx;
}

.arrow-up {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 8rpx;
  margin-top: 8rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.dropdown-item {
  padding: 16rpx 20rpx;
  font-size: 28rpx;
  color: #333;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.2s;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
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

/* 图表占位符样式 */
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

/* 确保picker组件样式正确 */
picker {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 监测按钮网格样式 */
.button-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.monitoring-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx 10rpx;
  border-radius: 12rpx;
  background-color: #f8f9fa;
  border: 2rpx solid #e9ecef;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 120rpx;
}

.monitoring-button.active {
  background-color: #e3f2fd;
  border-color: #007AFF;
  box-shadow: 0 4rpx 16rpx rgba(0, 122, 255, 0.2);
}

.button-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}

.button-text {
  font-size: 24rpx;
  color: #333;
  text-align: center;
  line-height: 1.2;
}

.monitoring-button.active .button-text {
  color: #007AFF;
  font-weight: 600;
}

/* 按钮内容显示样式 */
.button-content {
  background-color: white;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  border-left: 4rpx solid #007AFF;
}

.content-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

/* SVG图标样式 */
.button-icon-svg {
  width: 40rpx;
  height: 40rpx;
  margin-bottom: 16rpx;
}

.button-icon-emoji {
  font-size: 40rpx;
  margin-bottom: 16rpx;
  line-height: 1;
}

.content-description {
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
  display: block;
}

/* 监测详情展示区域样式 */
.details-section {
  margin-bottom: 30rpx;
}
</style>