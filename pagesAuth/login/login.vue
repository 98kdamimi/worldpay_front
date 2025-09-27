<template>
	<view class="viewBox">
		<view class="topBg">
			<view class="logo">
				<image src="@/static/image/logo.png" mode=""></image>
			</view>
			<view class="logo-title">Worldpay</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('auth.welcomeWorldpay') }}</view>
			<view class="input-box">
				<SvgIcon name="svg1" width="40" height="40"></SvgIcon>
				<input type="text" :placeholder="$t('auth.enterEmail')" placeholder-style="color: #8f8f8f;" />
			</view>
			<view class="input-box">
				<SvgIcon name="svg2" width="40" height="40"></SvgIcon>
				<input :type="eyeType ? 'password' : 'text'" :placeholder="$t('auth.enterPassword')"
					placeholder-style="color: #8f8f8f;" />
				<view @click="eyeType = !eyeType">
					<SvgIcon name="svg5" width="36" height="36" v-if="eyeType"></SvgIcon>
					<SvgIcon name="svg4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
			<view class="title-txt">
				<view @click="goToPage('/pagesAuth/register/register')">{{ $t('auth.register') }}</view>
				<view @click="goToPage('/pagesMine/changePassword/changePassword')">{{ $t('auth.forgotPassword') }}
				</view>
			</view>
			<view class="loginBtton" @click="applyShow = true">{{ $t('auth.login') }}</view>
			<view class="xieyi">
				<view @click="xyType = !xyType">
					<!-- #ifdef H5 -->
					<SvgIcon name="svg3" width="28" height="28" style="margin: -5rpx 12rpx 0 0;" v-if="!xyType">
					</SvgIcon>
					<SvgIcon name="svg6" width="28" height="28" style="margin: -5rpx 12rpx 0 0;" v-else></SvgIcon>
					<!-- #endif -->
					<!-- #ifdef APP -->
					<SvgIcon name="svg3" width="28" height="28" style="margin: 5rpx 12rpx 0 0;" v-if="!xyType">
					</SvgIcon>
					<SvgIcon name="svg3" width="28" height="28" style="margin: 5rpx 12rpx 0 0;" v-else></SvgIcon>
					<!-- #endif -->
				</view>
				<view>
					{{ $t('auth.agreeTerms') }}<span>{{ $t('auth.userAgreement') }}</span><span>{{ $t('auth.privacyPolicy') }}</span>
				</view>
			</view>
		</view>
		<up-modal :show="applyShow" :showConfirmButton='false' bgColor='#141414'>
			<view class="applyModal">
				<view class="applyModal-title">
					{{ $t('auth.enterGoogleCode') }}
				</view>
				<view class="applyModal-input">
					<input type="text" :placeholder="$t('auth.enterGoogleCode')" placeholder-style="color: #8f8f8f;" />
				</view>
				<view class="applyModal-button">
					<view class="cancel" @click="applyShow = false">{{ $t('auth.cancel') }}</view>
					<view class="apply" @click="goToSwitch()">{{ $t('auth.confirm') }}</view>
				</view>
			</view>
		</up-modal>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const eyeType = ref(true)
	const xyType = ref(true)
	const applyShow = ref(false)

	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
	const goToSwitch = (address) => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
</script>

<style lang="scss" scoped>
	@import "./login.scss"
</style>