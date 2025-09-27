<template>
	<view class="viewBox" style="padding-top: 32rpx;">
		<view class="logo">
			<image src="@/static/image/index/logoTitle.png" mode="aspectFill"></image>
		</view>
		<view class="banner">
			<image src="@/static/image/welcome.png" mode="aspectFill"></image>
		</view>
		<view class="title">{{ $t('auth.welcome') }}</view>
		<view class="title-txt">{{ $t('auth.tips') }}</view>
		<view class="button">{{ $t('auth.tryItNow') }}</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.logo {
		width: 278rpx;
		height: 64rpx;
		margin: 0 auto;
	}

	.banner {
		margin: 64rpx 0 0;
		width: 750rpx;
		height: 750rpx;
	}

	.title {
		margin: 80rpx 0 0;
		text-align: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		font-size: 44rpx;
		color: #FFFFFF;
	}

	.title-txt {
		margin: 50rpx auto 0;
		text-align: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 30rpx;
		color: #FFFFFF80;
	}

	.button {
		margin: 130rpx auto 0;
		width: 654rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background: #FFFFFF;
		border-radius: 50rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		font-size: 36rpx;
		color: #333333;
	}
</style>