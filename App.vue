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
	#app {
		width: 750px;
		max-width: 750px;
		margin: 0 auto;
	}

	html,
	body {
		margin: 0;
		padding: 0;
	}

	div {
		box-sizing: border-box;
	}

	img,
	video {
		width: 100%;
		height: 100%;
	}

	a:link,
	a:visited,
	a:hover,
	a:active {
		text-decoration: none;
		color: inherit;
		background-color: transparent;
		outline: none;
	}

	/* 滚动容器样式 */
	.scroll {
		/* 设置容器高度，超出此高度将可滚动 */
		/* max-height: calc(100vh - 150px); */
		height: 100vh;
		/* 根据实际需求调整 */
		overflow-y: auto;
		/* 垂直方向超出时显示滚动条 */
	}

	/* 可选：自定义滚动条样式 */
	.scroll::-webkit-scrollbar {
		width: 0px;
	}
</style>
