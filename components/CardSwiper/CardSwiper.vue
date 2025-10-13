<template>
	<view>
		<swiper
			style="height: 366rpx"
			previous-margin="0"
			next-margin="160rpx"
			:current="currentIndex"
			@change="handleChange"
			circular
		>
			<swiper-item v-for="(item, index) in images" :key="index">
				<view class="carousel-item">
					<view
						class="img-border"
						:class="{ active: currentIndex === index }"
					>
						<image :src="item" class="carousel-img" />
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="custom-dots">
			<view
				v-for="(item, idx) in images"
				:key="idx"
				class="dot"
				:class="{ active: currentIndex === idx }"
			></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CardSwiper',
	props: {
		images: {
			type: Array,
			required: true,
			default: () => []
		},
		current: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			currentIndex: this.current,
		};
	},
	watch: {
		current(val) {
			this.currentIndex = val;
		}
	},
	methods: {
		handleChange(e) {
			this.currentIndex = e.detail.current;
			this.$emit('change', this.currentIndex);
		}
	}
};
</script>

<style scoped lang="scss">
.carousel-item {
	width: 100%;
	height: 366rpx;
	border-radius: 36rpx;
	overflow: hidden;
	padding: 30rpx 0 30rpx 30rpx;
	box-sizing: border-box;
	.img-border {
		border: 2px solid #0f0f0f;
		border-radius: 36rpx;
	}
	.active {
		border: 2px solid #ffffff;
	}
	.carousel-img {
		width: 100%;
		height: 280rpx !important;
		border-radius: 36rpx;
		display: block;
	}
}

.custom-dots {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	margin-top: -20rpx;
}

.dot {
	width: 24rpx;
	height: 8rpx;
	background: #ffffff;
	border-radius: 5rpx;
	opacity: 0.5;
	margin: 0 8rpx;
	transition: background 0.2s, width 0.2s;
	&.active {
		width: 48rpx;
		background: #fff;
		opacity: 1;
	}
}
</style>
