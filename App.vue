<script>
	// 全局注册uni-icons组件
	import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
	export default {
		components: {
			'uni-icons': uniIcons
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
