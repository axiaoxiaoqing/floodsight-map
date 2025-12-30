<template>
  <view class="container">

    <view class="content">
      <view class="category-tabs">
        <view class="tab-item" v-for="category in categories" :key="category.id" 
              :class="{ active: activeCategory === category.id }"
              @click="activeCategory = category.id">
          <text>{{ category.name }}</text>
        </view>
      </view>
      
      <view class="knowledge-list">
        <view class="knowledge-card" v-for="item in filteredKnowledge" :key="item.id" @click="viewKnowledge(item)">
          <view class="knowledge-header">
            <text class="knowledge-title">{{ item.title }}</text>
          </view>
          <view class="knowledge-meta">
            <text class="read-count">{{ item.readCount }} 阅读</text>
            <text class="publish-time">{{ item.publishTime }}</text>
          </view>
          <view class="knowledge-summary">{{ item.summary }}</view>
          <view class="knowledge-cover" v-if="item.cover">
            <view class="cover-placeholder">
              <text>图片</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const activeCategory = ref('1')

// 分类数据
const categories = ref([
  { id: '1', name: '基础知识' },
  { id: '2', name: '应急技能' },
  { id: '3', name: '预警信号' },
  { id: '4', name: '案例分析' }
])

// 科普知识数据
const knowledgeData = ref([
  {
    id: '1',
    title: '什么是防汛预警信号？',
    categoryId: '1',
    publishTime: '2024-06-01',
    readCount: '1256',
    summary: '防汛预警信号是指根据降雨量、水位等气象和水文数据，对可能发生的洪水灾害进行预警的信号体系。通常分为蓝色、黄色、橙色和红色四个等级。',
    cover: true
  },
  {
    id: '2',
    title: '暴雨来临前应该做哪些准备？',
    categoryId: '2',
    publishTime: '2024-05-28',
    readCount: '2341',
    summary: '暴雨来临前应关好门窗，准备应急照明设备，储备必要的食物和饮用水，检查排水设施是否畅通，将贵重物品转移到高处，并了解就近的避难场所位置。',
    cover: true
  },
  {
    id: '3',
    title: '洪水来袭时如何安全转移？',
    categoryId: '2',
    publishTime: '2024-05-20',
    readCount: '3567',
    summary: '洪水来袭时，应按照预警信息及时撤离到安全区域，避开河道、低洼地区和电力设施，不要使用普通车辆强行通过积水区域，如被洪水围困应立即拨打求救电话。',
    cover: false
  },
  {
    id: '4',
    title: '防汛预警信号的含义',
    categoryId: '3',
    publishTime: '2024-05-15',
    readCount: '1890',
    summary: '蓝色预警表示可能发生洪水，黄色预警表示可能发生较重洪水，橙色预警表示可能发生严重洪水，红色预警表示可能发生特别严重洪水。不同颜色预警对应不同级别的防范措施。',
    cover: true
  },
  {
    id: '5',
    title: '城市内涝的成因与防范',
    categoryId: '1',
    publishTime: '2024-05-10',
    readCount: '1456',
    summary: '城市内涝主要是由于降雨量过大、排水系统能力不足、城市硬化地面增加等原因造成的。防范措施包括完善排水系统、建设海绵城市、合理规划城市建设等。',
    cover: false
  },
  {
    id: '6',
    title: '某地区特大洪水应对案例分析',
    categoryId: '4',
    publishTime: '2024-05-05',
    readCount: '2134',
    summary: '本文分析了2023年某地区特大洪水的成因、发展过程及应对措施，总结了成功经验和教训，为今后类似灾害的防范和应对提供参考。',
    cover: true
  }
])

// 筛选后的知识列表
const filteredKnowledge = computed(() => {
  return knowledgeData.value.filter(item => item.categoryId === activeCategory.value)
})


</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}



.content {
  flex: 1;
}

.category-tabs {
  display: flex;
  background-color: white;
  padding: 0 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.tab-item {
  padding: 24rpx 32rpx;
  font-size: 28rpx;
  color: #666;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
}

.tab-item.active {
  color: #007AFF;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 6rpx;
  background-color: #007AFF;
  border-radius: 3rpx;
}

.knowledge-list {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.knowledge-card {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.knowledge-card:active {
  background-color: #f8f8f8;
  transform: scale(0.98);
}

.knowledge-header {
  margin-bottom: 12rpx;
}

.knowledge-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
  display: block;
  line-height: 48rpx;
}

.knowledge-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
  font-size: 26rpx;
  color: #999;
}

.knowledge-summary {
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
  margin-bottom: 16rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.knowledge-cover {
  width: 100%;
  height: 240rpx;
  border-radius: 8rpx;
  overflow: hidden;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 28rpx;
}
</style>