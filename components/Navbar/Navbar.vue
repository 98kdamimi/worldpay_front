<template>
	<view :style="{ height: navbarHeight + 'px'}"></view>
	<!-- 自定义导航栏容器（高度适配状态栏，避免内容被遮挡） -->
	<view class="custom-navbar" :style="{ height: navbarHeight + 'px', paddingTop: statusBarHeight + 'px' }">
		<!-- 左侧：返回按钮（按需显示） -->
		<view class="navbar-left" @click="handleBack" v-if="showBack">
			<SvgIcon name="back" width="40" height="40" /> <!-- 用你的返回图标 -->
		</view>
		<!-- 左侧占位元素（用于保持标题居中） -->
		<view class="navbar-left" v-else></view>

		<!-- 中间：标题 -->
		<view class="navbar-center">
			<text class="title-text">{{ title }}</text>
		</view>

		<!-- 右侧：插槽（留给页面自定义内容） -->
		<view class="navbar-right">
			<slot name="right"></slot> <!-- 页面通过 slot 传入右侧内容 -->
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app';

	// 接收页面传递的 props
	const props = defineProps({
		title: { // 导航栏标题
			type: String,
			default: ''
		},
		showBack: { // 是否显示左侧返回按钮
			type: Boolean,
			default: true
		}
	});

	// 适配状态栏高度（不同设备状态栏高度不同，避免导航栏内容被刘海遮挡）
	const statusBarHeight = ref(0);
	// 导航栏总高度（状态栏高度 + 导航栏主体高度，默认 44px 主体高度）
	const navbarHeight = ref(0);

	onLoad(() => {
		// 获取状态栏高度（UniApp 原生 API）
		statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight;
		// 计算导航栏总高度：状态栏高度 + 44px（主体高度可按需调整）
		navbarHeight.value = statusBarHeight.value + 44;
	});

	// 左侧返回按钮逻辑
	const handleBack = () => {
		// 返回上一页（若没有上一页，跳转到首页）
		const pages = getCurrentPages();
		if (pages.length > 1) {
			uni.navigateBack({
				delta: 1
			});
		} else {
			uni.switchTab({
				url: '/pages/index/index'
			}); // 首页是 TabBar 页，用 switchTab
		}
	};
</script>

<style lang="scss" scoped>
	.custom-navbar {
		position: fixed; // 固定在顶部
		top: 0;
		left: 0;
		width: 100%;
		background-color: #0f0f0f; // 与你的 TabBar 背景色一致，统一风格
		display: flex;
		align-items: center; // 垂直居中
		padding: 0 32rpx; // 左右内边距，避免内容贴边
		box-sizing: border-box;
		z-index: 999; // 确保导航栏在最上层，不被内容遮挡

		.navbar-left {
			display: flex;
			align-items: center;
			cursor: pointer;
			width: 80rpx; // 固定宽度，确保标题居中
			justify-content: flex-start;
		}

		.navbar-center {
			flex: 1; // 占据剩余空间
			text-align: center; // 文本居中
			display: flex;
			justify-content: center;
			align-items: center;

			.title-text {
				font-size: 36rpx;
				color: #FFFFFF; // 标题白色，适配深色背景
				font-weight: 500;
				display: inline-block;
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.navbar-right {
			display: flex;
			align-items: center;
			gap: 32rpx; // 若右侧有多个元素，设置间距
			color: #FFFFFF;
			width: 80rpx; // 固定宽度，确保标题居中
			justify-content: flex-end;
		}
	}
</style>