<script>
	export default {
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

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-plus/index.scss";

	/*每个页面公共css */
	page {
		margin: 0 auto;
		background: #0f0f0f;
	}

	html,
	body {
		margin: 0;
		padding: 0;
	}

	div {
		box-sizing: border-box;
	}

	image,
	video {
		width: 100%;
		height: 100%;
	}
</style>