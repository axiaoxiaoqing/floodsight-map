<template>
  <view class="container">
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
        <view class="task-card" v-for="task in pendingTasks" :key="task.id" >
          <view class="task-icon">📋</view>
          <view class="task-content">
            <view class="task-header">
              <text class="task-title">{{ task.title }}</text>
              <view class="priority-tag" :class="task.priorityClass">
                <text>{{ task.priority }}</text>
              </view>
            </view>
            <view class="task-info">
              <text class="task-deadline">请在 {{ task.deadline }} 之前完成</text>
            </view>
            <text class="task-desc">{{ task.description }}</text>
          </view>
          <view class="task-checkbox" @click.stop="toggleTask(task)">
            <view class="checkbox" :class="{ checked: task.completed }"></view>
          </view>
        </view>
        <view class="empty-tip" v-if="pendingTasks.length === 0">
          <text>🎯 暂无待处理任务</text>
        </view>
      </view>
      
      <view class="task-list" v-else-if="activeTab === 'completed'">
        <view class="task-card completed" v-for="task in completedTasks" :key="task.id" >
          <view class="task-icon completed">✅</view>
          <view class="task-content">
            <view class="task-header">
              <text class="task-title">{{ task.title }}</text>
            </view>
            <view class="task-info">
              <text class="task-completed-time">🎉 {{ task.completedTime }}</text>
            </view>
            <text class="task-desc">{{ task.description }}</text>
          </view>
          <view class="task-checkbox" @click.stop="toggleTask(task)">
            <view class="checkbox" :class="{ checked: task.completed }"></view>
          </view>
        </view>
        <view class="empty-tip" v-if="completedTasks.length === 0">
          <text>🎉 暂无已完成任务</text>
        </view>
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


// 切换任务状态
const toggleTask = (task) => {
  if (!task.completed) {
    // 完成任务时显示确认框
    uni.showModal({
      title: '确认完成',
      content: `确定要标记任务"${task.title}"为已完成吗？`,
      confirmText: '确认完成',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          task.completed = true
          const now = new Date()
          const year = now.getFullYear()
          const month = String(now.getMonth() + 1).padStart(2, '0')
          const day = String(now.getDate()).padStart(2, '0')
          const hour = String(now.getHours()).padStart(2, '0')
          const minute = String(now.getMinutes()).padStart(2, '0')
          task.completedTime = `${year}-${month}-${day} ${hour}:${minute}`
          uni.showToast({
            title: '任务已完成',
            icon: 'success'
          })
        }
      }
    })
  } else {
    // 取消完成时无需确认
    task.completed = false
    task.completedTime = ''
    uni.showToast({
      title: '任务已恢复',
      icon: 'none'
    })
  }
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
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  padding: 8rpx;
  border: 1rpx solid #f0f0f0;
}

.tab-item {
  flex: 1;
  padding: 20rpx 0;
  text-align: center;
  font-size: 30rpx;
  color: #8e8e93;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12rpx;
  transition: all 0.3s ease;
}

.tab-item.active {
  font-weight: 600;
  background: rgb(66, 144, 240);
  color: white;
  box-shadow: 0 2rpx 8rpx rgba(0, 122, 255, 0.3);
}

.badge {
  position: absolute;
  top: 8rpx;
  right: 25%;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  font-size: 22rpx;
  padding: 4rpx 10rpx;
  border-radius: 12rpx;
  min-width: 24rpx;
  text-align: center;
  font-weight: 600;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.task-card {
  background-color: white;
  border-radius: 20rpx;
  padding: 32rpx;
  box-shadow: 0 6rpx 25rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  border: 1rpx solid #f5f5f5;
  position: relative;
  overflow: hidden;
}

.task-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 8rpx;
  background: linear-gradient(135deg, #007AFF, #0056b3);
  border-radius: 0 4rpx 4rpx 0;
}

.task-card.completed::before {
  background: linear-gradient(135deg, #34c759, #30d158);
}

.task-card:active {
  background-color: #f8f9fa;
  transform: scale(0.99);
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.12);
}

.task-icon {
  font-size: 42rpx;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 4rpx;
}

.task-icon.completed {
  opacity: 0.8;
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
  gap: 16rpx;
}

.task-title {
  flex: 1;
  font-size: 32rpx;
  font-weight: 600;
  color: #1c1c1e;
  line-height: 40rpx;
  letter-spacing: 0.3rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-card.completed .task-title {
  text-decoration: line-through;
  color: #8e8e93;
  opacity: 0.7;
}

.priority-tag {
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  font-size: 22rpx;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

.priority-tag.high {
  background: linear-gradient(135deg, #ff3b30, #d70015);
}

.priority-tag.medium {
  background: linear-gradient(135deg, #ff9500, #e6851c);
}

.priority-tag.low {
  background: linear-gradient(135deg, #34c759, #30d158);
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  margin-bottom: 20rpx;
  font-size: 26rpx;
  color: #8e8e93;
}

.task-checkbox {
  margin-left: 8rpx;
  flex-shrink: 0;
  margin-top: 8rpx;
}

.checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 3rpx solid #e5e5ea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: white;
}

.checkbox.checked {
  background: linear-gradient(135deg, #34c759, #30d158);
  border-color: #34c759;
  box-shadow: 0 2rpx 8rpx rgba(52, 199, 89, 0.3);
}

.checkbox.checked::after {
  content: '✓';
  color: white;
  font-size: 26rpx;
  font-weight: bold;
}

.task-desc {
  font-size: 28rpx;
  color: #636366;
  line-height: 44rpx;
  display: block;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
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