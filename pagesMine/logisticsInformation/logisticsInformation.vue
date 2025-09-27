<template>
	<view class="viewBox">
		<Navbar :title="$t('logisticsInfo.title')" :showBack="true"></Navbar>
		<view class="emty">
			<view class="emtyIcon">
				<image src="@/static/image/index/emty.png" alt="" mode="widthFix" />
			</view>
			<view>{{ $t('logisticsInfo.empty') }}</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.emty {
		width: 100vw;
		height: 750rpx;
		margin: 90rpx auto;
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