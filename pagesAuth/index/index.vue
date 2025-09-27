<template>
	<view class="viewBox" style="padding-top: 32rpx;">
		<view class="logo">
			<image src="@/static/image/index/logoTitle.png" mode="aspectFill"></image>
		</view>
		<view class="banner">
			<image src="@/static/image/welcome.png" mode="aspectFill"></image>
		</view>
		<view class="title">欢迎使用 Worldpay</view>
		<view class="title-txt">— 让我们去体验快捷、安全、便利的支付方式 —</view>
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
</style>