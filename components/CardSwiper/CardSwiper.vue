<template>
	<view class="carousel-container">
		<!-- 轮播图组件 -->
		<swiper class="carousel-swiper" :previous-margin="previousMargin" :next-margin="0" :current="currentIndex"
			@change="handleChange" circular indicator-dots indicator-active-color="#ffffff"
			indicator-color="rgba(255,255,255,0.5)" :indicator-dots-styles="indicatorStyles">
			<swiper-item v-for="(item, index) in images" :key="index" class="carousel-item">
				<view class="img-wrapper" :class="{ active: currentIndex === index }">
					<image class="carousel-img" src="@/static/image/apply1.png" mode="aspectFill"
						style="width: '560rpx', height: '280rpx', borderRadius: '36rpx'" />
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'CardCarousel',
		props: {
			// 接收外部传入的图片数组
			images: {
				type: Array,
				required: true,
				default: () => []
			}
		},
		data() {
			return {
				currentIndex: 0,
				previousMargin: '168rpx', // 第二张显示30%
				indicatorStyles: {
					bottom: '20rpx', // 指示点距离底部的距离
					width: '12rpx',
					height: '12rpx',
					borderRadius: '6rpx'
				}
			};
		},
		methods: {
			// 轮播图切换时更新当前索引
			handleChange(e) {
				this.currentIndex = e.detail.current;
			}
		}
	};
</script>

<style scoped>
	.carousel-container {
		width: 100%;
		overflow: hidden;
		padding: 20rpx 0;
	}

	.carousel-swiper {
		width: 100%;
	}

	.carousel-item {
		display: flex;
		justify-content: center;
	}

	.img-wrapper {
		transition: all 0.3s ease;
	}

	/* 当前激活的图片样式 - 添加白色边框 */
	.img-wrapper.active {
		padding: 4rpx;
		/* 边框宽度，通过padding实现，避免改变元素大小 */
		box-sizing: border-box;
		border-radius: 40rpx;
		/* 原36rpx + 边框4rpx */
		background-color: #ffffff;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
	}

	.carousel-img {
		display: block;
	}
</style>