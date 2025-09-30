<template>
	<view class="emty">
		<view class="emtyIcon">
			<image src="@/static/image/index/emty.png" alt="" mode="widthFix" />
		</view>
		<!-- 替换“暂无数据”为多语言变量，兼容i18n语法 -->
		<view>{{ $t('common.emptyData') }}</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.emty {
		width: 100vw;
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 24rpx;
		color: #FFFFFF;

		.emtyIcon {
			width: 222rpx;
			height: 142rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 24rpx;
		}
	}
</style>