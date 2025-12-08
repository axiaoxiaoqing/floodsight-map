<template>
  <view class="container">
    <view class="header">
      <text class="title">防汛预案管理</text>
    </view>
    <view class="content">
      <view class="plan-tabs">
        <view class="tab-item" :class="{ active: activeTab === 'level' }" @click="activeTab = 'level'">
          <text>按等级</text>
        </view>
        <view class="tab-item" :class="{ active: activeTab === 'type' }" @click="activeTab = 'type'">
          <text>按类型</text>
        </view>
      </view>
      
      <view class="plan-list" v-if="activeTab === 'level'">
        <view class="plan-card" v-for="plan in levelPlans" :key="plan.id" @click="viewPlan(plan)">
          <view class="plan-header">
            <text class="plan-title">{{ plan.title }}</text>
            <view class="level-tag" :class="plan.levelClass">
              <text>{{ plan.level }}</text>
            </view>
          </view>
          <view class="plan-info">
            <text class="plan-time">发布时间：{{ plan.publishTime }}</text>
            <text class="plan-dept">发布部门：{{ plan.department }}</text>
          </view>
          <text class="plan-desc">{{ plan.description }}</text>
        </view>
      </view>
      
      <view class="plan-list" v-else-if="activeTab === 'type'">
        <view class="plan-card" v-for="plan in typePlans" :key="plan.id" @click="viewPlan(plan)">
          <view class="plan-header">
            <text class="plan-title">{{ plan.title }}</text>
            <view class="type-tag">
              <text>{{ plan.type }}</text>
            </view>
          </view>
          <view class="plan-info">
            <text class="plan-time">发布时间：{{ plan.publishTime }}</text>
            <text class="plan-dept">发布部门：{{ plan.department }}</text>
          </view>
          <text class="plan-desc">{{ plan.description }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const activeTab = ref('level')

// 按等级分类的预案数据
const levelPlans = ref([
  {
    id: '1',
    title: '暴雨红色预警应急预案',
    level: '一级',
    levelClass: 'level-1',
    publishTime: '2024-06-01',
    department: '应急管理局',
    description: '针对特大暴雨天气的综合应急处置方案，包括人员疏散、物资调配等措施。'
  },
  {
    id: '2',
    title: '洪水蓝色预警响应预案',
    level: '四级',
    levelClass: 'level-4',
    publishTime: '2024-05-20',
    department: '水利局',
    description: '针对可能发生的一般洪水情况，明确监测、预警和初步处置流程。'
  },
  {
    id: '3',
    title: '台风黄色预警防御预案',
    level: '三级',
    levelClass: 'level-3',
    publishTime: '2024-05-10',
    department: '气象局',
    description: '应对台风天气的防御措施，重点关注沿海地区和低洼地带。'
  }
])

// 按类型分类的预案数据
const typePlans = ref([
  {
    id: '4',
    title: '城市内涝应急处置方案',
    type: '城市',
    publishTime: '2024-05-25',
    department: '住建局',
    description: '解决城市地区暴雨积水问题的应急处理流程和责任分工。'
  },
  {
    id: '5',
    title: '水库防汛调度预案',
    type: '水利',
    publishTime: '2024-04-30',
    department: '水利局',
    description: '规范水库水位调度和泄洪操作，确保水库安全运行。'
  },
  {
    id: '6',
    title: '山区地质灾害防范预案',
    type: '地质',
    publishTime: '2024-04-15',
    department: '自然资源局',
    description: '预防和应对山区可能发生的滑坡、泥石流等地质灾害的措施。'
  }
])

// 查看预案详情
const viewPlan = (plan) => {
  uni.showToast({
    title: '查看预案: ' + plan.title,
    icon: 'none'
  })
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
  flex: 1;
  padding: 20rpx;
}

.plan-tabs {
  display: flex;
  background-color: white;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.tab-item {
  flex: 1;
  padding: 24rpx 0;
  text-align: center;
  font-size: 32rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #007AFF;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 60%;
  height: 4rpx;
  background-color: #007AFF;
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.plan-card {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.plan-card:active {
  background-color: #f8f8f8;
  transform: scale(0.98);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.plan-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
  flex: 1;
  margin-right: 20rpx;
}

.level-tag {
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  font-size: 24rpx;
  color: white;
}

.level-tag.level-1 {
  background-color: #f44336;
}

.level-tag.level-2 {
  background-color: #ff9800;
}

.level-tag.level-3 {
  background-color: #ffeb3b;
  color: #333;
}

.level-tag.level-4 {
  background-color: #2196f3;
}

.type-tag {
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  font-size: 24rpx;
  background-color: #4caf50;
  color: white;
}

.plan-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
  font-size: 26rpx;
  color: #999;
}

.plan-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>