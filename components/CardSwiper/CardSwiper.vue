<template>
	<view class="carousel-container">
		<!-- 轮播图组件 -->
		<swiper class="carousel-swiper" :previous-margin="0" :next-margin="nextMargin" :current="currentIndex"
			@change="handleChange" circular>
			<swiper-item v-for="(item, index) in images" :key="index" class="carousel-item">
				<view class="img-wrapper" :class="{ active: currentIndex === index }">
					<image :src="item" class="carousel-img" mode="aspectFill" />
				</view>
			</swiper-item>
		</swiper>
		<view class="custom-dots">
			<view v-for="(item, idx) in images" :key="idx" class="dot" :class="{ active: currentIndex === idx }"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CardCarousel',
		props: {
			images: {
				type: Array,
				required: true,
				default: () => []
			}
		},
		data() {
			return {
				currentIndex: 0,
				nextMargin: '168rpx', // 右侧边距，让后面的图片显示30%
				indicatorStyles: {
					bottom: '20rpx',
					width: '12rpx',
					height: '12rpx',
					borderRadius: '6rpx'
				}
			};
		},
		methods: {
			handleChange(e) {
				this.currentIndex = e.detail.current;
			}
		}
	};
</script>

<style scoped>
	.carousel-container {
		width: 100%;
		/* overflow: hidden; */
		padding: 20rpx 0;
	}

	.carousel-swiper {
		width: 100%;
		/* padding: 0 20rpx; */
		box-sizing: border-box;
	}

	.carousel-item {
		display: flex;
		justify-content: center;
	}

	.img-wrapper {
		width: 560rpx;
		height: 280rpx;
		transition: all 0.3s ease;
		margin: 0 0 0 32rpx;
	}

	.active {
		padding: 4rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
		background-color: #ffffff;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
	}

	.carousel-img {
		width: 100%;
		height: 280rpx;
		border-radius: 36rpx;
		display: block;
	}

	.custom-dots {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		bottom: -24rpx;
		margin-top: -20rpx;
	}

	.dot {
		width: 24rpx;
		height: 8rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		opacity: 0.5;
		margin: 0 8rpx;
		transition: background 0.2s, width 0.2s;
	}

	.dot.active {
		width: 48rpx;
		background: #fff;
		opacity: 1;
	}
</style>