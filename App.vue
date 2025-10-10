<script setup>
import { onLaunch } from '@dcloudio/uni-app';
onLaunch(() => {
	console.log("app启动");
	uni.getPushClientId({
		success: (res) => {
			uni.setStorageSync('ClientId', res.cid);
		},
		fail(err) {
			console.log(err);
		}
	});
});
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uview-plus/index.scss';

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

view {
	box-sizing: border-box;
}

image,
video {
	width: 100% !important;
	height: 100% !important;
}

.viewBox {
	width: 100vw;
}

.stickyContent {
	position: sticky;
	background: #0f0f0f;
	z-index: 999;
}

.marquee-text {
	overflow: hidden;
	white-space: nowrap;
	position: relative;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}

.marquee-text span {
	display: inline-block;
}

.marquee-text.scroll span {
	animation: marquee 4s linear infinite;
}

@keyframes marquee {
	0% {
		transform: translateX(100%);
	}

	100% {
		transform: translateX(-100%);
	}
}
</style>
