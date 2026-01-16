<template>
  <view class="container">
    <!-- 用户信息头部 -->
    <view class="header">
      <view class="user-info">
        <image 
          src="/static/icon/用户.png" 
          class="user-avatar" 
          mode="aspectFit"
        />
        <view class="user-details">
          <text class="user-name">{{ userName }}</text>
          <text class="user-role">{{ userRole }}</text>
        </view>
      </view>
    </view>


    <!-- 功能菜单 -->
    <view class="menu-section">
      <!-- 防汛相关功能 -->
      <view class="menu-group">
        <view class="menu-item" @click="showMyReports">
          <text class="menu-text">我的上报</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="showEmergencyContacts">
          <text class="menu-text">紧急联系人</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>

      <!-- 个人设置功能 -->
      <view class="menu-group">
        <view class="menu-item" @click="showPersonalInfo">
          <text class="menu-text">个人信息</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="showAddressBook">
          <text class="menu-text">地址管理</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="showAppSettings">
          <text class="menu-text">设置</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>

      <!-- 系统功能 -->
      <view class="menu-group">
        <view class="menu-item" @click="showHelpCenter">
          <text class="menu-text">帮助中心</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="showAboutUs">
          <text class="menu-text">关于我们</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="showPrivacyPolicy">
          <text class="menu-text">隐私政策</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-section">
      <view class="logout-button" @click="confirmLogout">
        <text class="logout-text">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 用户信息
const userName = ref('小水')
const userRole = ref('普通用户')





function showMyReports() {
  uni.showToast({
    title: '我的上报功能开发中',
    icon: 'none',
    duration: 2000
  })
}



function showEmergencyContacts() {
  uni.showToast({
    title: '紧急联系人功能开发中',
    icon: 'none',
    duration: 2000
  })
}

function showPersonalInfo() {
  uni.showToast({
    title: '个人信息功能开发中',
    icon: 'none',
    duration: 2000
  })
}

function showAddressBook() {
  uni.showToast({
    title: '地址管理功能开发中',
    icon: 'none',
    duration: 2000
  })
}

function showAppSettings() {
  uni.showToast({
    title: '设置功能开发中',
    icon: 'none',
    duration: 2000
  })
}

function showHelpCenter() {
  uni.showToast({
    title: '帮助中心功能开发中',
    icon: 'none',
    duration: 2000
  })
}

function showAboutUs() {
  uni.showToast({
    title: '关于我们功能开发中',
    icon: 'none',
    duration: 2000
  })
}

function showPrivacyPolicy() {
  uni.showToast({
    title: '隐私政策功能开发中',
    icon: 'none',
    duration: 2000
  })
}

// 退出登录确认
function confirmLogout() {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 执行退出登录逻辑
        uni.showToast({
          title: '已退出登录',
          icon: 'success',
          duration: 2000
        })
        // 这里可以添加跳转到登录页面的逻辑
        // uni.reLaunch({ url: '/pages/login/index' })
      }
    }
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

/* 用户信息头部样式 */
.header {
  background-color: #7cbbff;
  padding: 40rpx 20rpx 20rpx;
  color: white;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  margin-bottom: 20rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  background-color: #7cbbff;
  margin-right: 20rpx;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
  display: block;
}

.user-role {
  font-size: 28rpx;
  opacity: 0.9;
  display: block;
}

.header-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10rpx;
}

.action-item {
  position: relative;
  margin-left: 40rpx;
  font-size: 36rpx;
  cursor: pointer;
}

.notification-badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background-color: #ff3b30;
  color: white;
  font-size: 20rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36rpx;
}

/* 统计卡片样式 */
.stats-section {
  display: flex;
  justify-content: space-around;
  padding: 0 20rpx;
  margin-top: -30rpx;
  margin-bottom: 20rpx;
}

.stat-card {
  background-color: white;
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  text-align: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  flex: 1;
  margin: 0 10rpx;
  min-height: 120rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stat-card:active {
  transform: translateY(-2rpx);
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.15);
}

.stat-value {
  font-size: 40rpx;
  font-weight: bold;
  color: #007AFF;
  margin-bottom: 8rpx;
  display: block;
}

.stat-label {
  font-size: 26rpx;
  color: #666;
}

/* 功能菜单样式 */
.menu-section {
  flex: 1;
  padding: 0 20rpx;
}

.menu-group {
  background-color: white;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 28rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.2s;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: #f5f5f5;
}

.menu-icon {
  font-size: 36rpx;
  margin-right: 24rpx;
  width: 40rpx;
  text-align: center;
}

.menu-text {
  flex: 1;
  font-size: 30rpx;
  color: #333;
}

.menu-arrow {
  font-size: 24rpx;
  color: #999;
}

/* 退出登录按钮样式 */
.logout-section {
  padding: 20rpx;
  margin-bottom: 40rpx;
}

.logout-button {
  background-color: white;
  border: 2rpx solid #ff3b30;
  border-radius: 12rpx;
  padding: 28rpx;
  text-align: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:active {
  background-color: #ff3b30;
}

.logout-text {
  font-size: 30rpx;
  color: #ff3b30;
  font-weight: 500;
}

.logout-button:active .logout-text {
  color: white;
}
</style>