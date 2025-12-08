<template>
  <view class="container">
    <view class="header">
      <text class="title">防汛代办任务</text>
    </view>
    <view class="content">
      <view class="task-tabs">
        <view class="tab-item" :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">
          <text>待处理</text>
          <view class="badge" v-if="pendingCount > 0">{{ pendingCount }}</view>
        </view>
        <view class="tab-item" :class="{ active: activeTab === 'completed' }" @click="activeTab = 'completed'">
          <text>已完成</text>
        </view>
      </view>
      
      <view class="task-list" v-if="activeTab === 'pending'">
        <view class="task-card" v-for="task in pendingTasks" :key="task.id" @click="viewTask(task)">
          <view class="task-header">
            <view class="task-checkbox" @click.stop="toggleTask(task)">
              <view class="checkbox" :class="{ checked: task.completed }"></view>
            </view>
            <text class="task-title">{{ task.title }}</text>
            <view class="priority-tag" :class="task.priorityClass">
              <text>{{ task.priority }}</text>
            </view>
          </view>
          <view class="task-info">
            <text class="task-deadline">截止时间：{{ task.deadline }}</text>
            <text class="task-assignee">负责人：{{ task.assignee }}</text>
          </view>
          <text class="task-desc">{{ task.description }}</text>
        </view>
        <view class="empty-tip" v-if="pendingTasks.length === 0">
          <text>暂无待处理任务</text>
        </view>
      </view>
      
      <view class="task-list" v-else-if="activeTab === 'completed'">
        <view class="task-card completed" v-for="task in completedTasks" :key="task.id" @click="viewTask(task)">
          <view class="task-header">
            <view class="task-checkbox" @click.stop="toggleTask(task)">
              <view class="checkbox" :class="{ checked: task.completed }"></view>
            </view>
            <text class="task-title">{{ task.title }}</text>
          </view>
          <view class="task-info">
            <text class="task-deadline">截止时间：{{ task.deadline }}</text>
            <text class="task-completed-time">完成时间：{{ task.completedTime }}</text>
          </view>
          <text class="task-desc">{{ task.description }}</text>
        </view>
        <view class="empty-tip" v-if="completedTasks.length === 0">
          <text>暂无已完成任务</text>
        </view>
      </view>
      
      <view class="add-task-btn" @click="addNewTask">
        <text>+</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const activeTab = ref('pending')

// 任务数据
const tasks = ref([
  {
    id: '1',
    title: '检查水库水位监测设备',
    description: '检查所有水库的水位监测设备是否正常运行，确保数据采集准确。',
    deadline: '2024-06-05 12:00',
    completedTime: '',
    assignee: '张三',
    priority: '高',
    priorityClass: 'high',
    completed: false
  },
  {
    id: '2',
    title: '更新防汛物资清单',
    description: '清点并更新仓库中的防汛物资，确保沙袋、抽水机等设备数量充足。',
    deadline: '2024-06-03 18:00',
    completedTime: '',
    assignee: '李四',
    priority: '中',
    priorityClass: 'medium',
    completed: false
  },
  {
    id: '3',
    title: '组织防汛应急演练',
    description: '组织各部门人员进行防汛应急演练，提高协同作战能力。',
    deadline: '2024-06-10 14:00',
    completedTime: '',
    assignee: '王五',
    priority: '高',
    priorityClass: 'high',
    completed: false
  },
  {
    id: '4',
    title: '排查城市排水管网',
    description: '对城市主要排水管网进行全面排查，清理堵塞物。',
    deadline: '2024-06-08 20:00',
    completedTime: '',
    assignee: '赵六',
    priority: '低',
    priorityClass: 'low',
    completed: false
  },
  {
    id: '5',
    title: '编写防汛工作报告',
    description: '收集整理上月防汛工作数据，编写月度工作报告。',
    deadline: '2024-06-01 17:00',
    completedTime: '2024-05-31 15:30',
    assignee: '钱七',
    priority: '中',
    priorityClass: 'medium',
    completed: true
  }
])

// 待处理任务
const pendingTasks = computed(() => {
  return tasks.value.filter(task => !task.completed)
})

// 已完成任务
const completedTasks = computed(() => {
  return tasks.value.filter(task => task.completed)
})

// 待处理任务数量
const pendingCount = computed(() => {
  return pendingTasks.value.length
})

// 查看任务详情
const viewTask = (task) => {
  uni.showToast({
    title: '查看任务: ' + task.title,
    icon: 'none'
  })
}

// 切换任务状态
const toggleTask = (task) => {
  task.completed = !task.completed
  if (task.completed) {
    task.completedTime = new Date().toLocaleString('zh-CN')
  } else {
    task.completedTime = ''
  }
}

// 添加新任务
const addNewTask = () => {
  uni.showToast({
    title: '添加新任务',
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
  padding-bottom: 100rpx;
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

.task-tabs {
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
  display: flex;
  align-items: center;
  justify-content: center;
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

.badge {
  position: absolute;
  right: 25%;
  background-color: #f44336;
  color: white;
  font-size: 24rpx;
  padding: 2rpx 12rpx;
  border-radius: 12rpx;
  min-width: 28rpx;
  text-align: center;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.task-card {
  background-color: white;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.task-card.completed {
  opacity: 0.7;
}

.task-card:active {
  background-color: #f8f8f8;
  transform: scale(0.98);
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.task-checkbox {
  margin-right: 16rpx;
}

.checkbox {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox.checked {
  background-color: #007AFF;
  border-color: #007AFF;
}

.checkbox.checked::after {
  content: '✓';
  color: white;
  font-size: 24rpx;
}

.task-title {
  flex: 1;
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
  margin-right: 20rpx;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-card.completed .task-title {
  text-decoration: line-through;
  color: #999;
}

.priority-tag {
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  font-size: 24rpx;
  color: white;
}

.priority-tag.high {
  background-color: #f44336;
}

.priority-tag.medium {
  background-color: #ff9800;
}

.priority-tag.low {
  background-color: #4caf50;
}

.task-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
  font-size: 26rpx;
  color: #999;
}

.task-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty-tip {
  text-align: center;
  padding: 60rpx 0;
  color: #999;
  font-size: 32rpx;
}

.add-task-btn {
  position: fixed;
  bottom: 80rpx;
  right: 40rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background-color: #007AFF;
  color: white;
  font-size: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 122, 255, 0.5);
  z-index: 100;
}

.add-task-btn:active {
  transform: scale(0.95);
}
</style>