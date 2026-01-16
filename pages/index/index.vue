<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="map-container">
			<!-- H5环境使用maplibre-gl -->
			<!-- #ifdef H5 -->
			<div id="map" class="map" :style="{ height: '6000rpx' }"></div>
			<!-- #endif -->
			
			<!-- 微信小程序环境使用原生地图组件 -->
			<!-- #ifdef MP-WEIXIN -->
			<map 
				id="myMap" 
				class="map"
				:style="{ height: '6000rpx' }"
				:latitude="latitude"
				:longitude="longitude"
				:scale="scale"
				:markers="markers"
				:show-location="true"
			></map>
			<!-- #endif -->
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, onUnmounted, nextTick } from 'vue'
	
	// #ifdef H5
	// H5环境导入maplibre-gl
	import maplibregl from 'maplibre-gl'
	import 'maplibre-gl/dist/maplibre-gl.css'
	// #endif
	
	// 定义响应式数据
	const title = ref('地图演示')
	const map = ref(null)
	const mapCtx = ref(null)
	// 小程序地图相关数据 - 默认设置为北京坐标
	const latitude = ref(39.9042) // 北京纬度
	const longitude = ref(116.4074) // 北京经度
	const scale = ref(12)
	const markers = ref([])
	
	console.log('页面已加载，准备初始化地图...')
	
	// H5环境地图初始化
	function initH5Map() {
		// 确保容器已渲染
		nextTick(() => {
			try {
				const config = window.$root?.$maplibreConfig || {
					defaultStyle: 'https://demotiles.maplibre.org/style.json',
					defaultCenter: [longitude.value, latitude.value], // 使用当前设置的坐标（可能是用户位置或默认北京位置）
					defaultZoom: 12
				}

				map.value = new maplibregl.Map({
					container: 'map',
					style: config.defaultStyle,
					center: config.defaultCenter,
					zoom: config.defaultZoom,
					antialias: true
				})

				map.value.addControl(new maplibregl.NavigationControl(), 'top-right')
				map.value.addControl(new maplibregl.ScaleControl(), 'bottom-left')

				map.value.on('load', () => {
					console.log('H5地图加载完成')
				})

			} catch (error) {
				console.error('H5地图初始化失败:', error)
			}
		})
	}

	// 获取用户当前位置
	function getUserLocation() {
		uni.getLocation({
			type: 'gcj02', // 坐标系类型
			altitude: true,
			success: (res) => {
				console.log('获取位置成功:', res)
				// 更新地图坐标
				latitude.value = res.latitude
				longitude.value = res.longitude
				// 如果地图已初始化，更新地图位置
				if (map.value && (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PLATFORM === 'h5')) {
					// H5环境更新
					map.value.setCenter([res.longitude, res.latitude])
				} else if (mapCtx.value) {
					// 小程序环境更新
					mapCtx.value.moveToLocation({
						latitude: res.latitude,
						longitude: res.longitude
					})
				}
			},
			fail: (err) => {
				console.log('获取位置失败，使用默认位置（北京）:', err)
				// 保持默认的北京坐标
			}
		})
	}
	
	// 微信小程序环境地图初始化
	function initMiniProgramMap() {
		try {
			// 获取地图上下文
			mapCtx.value = wx.createMapContext('myMap')
			console.log('小程序地图组件已加载')
			
			// 设置地图中心点
			mapCtx.value.moveToLocation({
				latitude: latitude.value,
				longitude: longitude.value,
				success: () => {
					console.log('地图中心设置成功')
				},
				fail: (err) => {
					console.error('地图中心设置失败:', err)
				}
			})
			
			// 获取地图边界
			mapCtx.value.getRegion({
				success: (res) => {
					console.log('地图边界:', res.region)
				}
			})
			
		} catch (error) {
			console.error('小程序地图初始化失败:', error)
		}
	}
	
	// 生命周期钩子
	onMounted(() => {
		// 首先尝试获取用户当前位置
		getUserLocation()
		
		// 条件编译初始化不同环境的地图
		// #ifdef H5
		initH5Map()
		// #endif
		
		// #ifdef MP-WEIXIN
		initMiniProgramMap()
		// #endif
	})
	
	onUnmounted(() => {
		// 清理地图资源
		// #ifdef H5
		if (map.value) {
			map.value.remove()
			map.value = null
		}
		// #endif
	})
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 20rpx;
		min-height: 100vh;
		height: auto;
		overflow-y: auto;
	}

	.map-container {
		width: 100%;
		height: 6000rpx;
		margin-bottom: 30rpx;
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #f0f0f0;
	}

	.map {
		width: 100%;
		height: 100%;
		min-height: 6000rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
		font-weight: bold;
	}
</style>
