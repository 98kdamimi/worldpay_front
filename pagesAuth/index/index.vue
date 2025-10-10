<template>
	<view class="welcomeContainer">
		<StatusBar></StatusBar>
		<view class="welcomeBox">
			<view class="logo">
				<image src="@/static/image/index/logoTitle.png" mode="aspectFill"></image>
			</view>
			<view class="banner">
				<image src="@/static/image/welcome.png" mode="aspectFill"></image>
			</view>
			<view class="welcomeTextArea">
				<view class="welcomeText">
					<view class="title">{{ $t('auth.welcome') }}</view>
					<view class="title-txt">{{ $t('auth.tips') }}</view>
				</view>
				<view class="button" @click="toLogin">{{ $t('auth.tryItNow') }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const toLogin = () => {
	uni.setStorageSync('isFirstLaunch', true);
	uni.reLaunch({
		url: '/pagesAuth/login/login'
	});
};
</script>

<style lang="scss" scoped>
.welcomeContainer {
	width: 100vw;
	height: 100vh;
	display: flex;
	/* #ifdef H5 */
	padding-top: 40rpx;
	/* #endif */
	.welcomeBox {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		.logo {
			width: 278rpx;
			height: 64rpx;
		}
		.banner {
			width: 750rpx;
			height: 750rpx;
		}

		.welcomeTextArea {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 130rpx;
			padding-bottom: 150rpx;
			text-align: center;
			.welcomeText {
				display: flex;
				flex-direction: column;
				align-items: center;
				row-gap: 50rpx;
				.title {
					font-weight: 500;
					font-size: 44rpx;
					color: #ffffff;
				}
				.title-txt {
					font-weight: 400;
					font-size: 30rpx;
					color: #ffffff80;
				}
			}
			.button {
				width: 654rpx;
				height: 100rpx;
				line-height: 100rpx;
				background: #ffffff;
				border-radius: 50rpx;
				font-weight: 500;
				font-size: 36rpx;
				color: #333333;
			}
		}
	}
}
</style>
