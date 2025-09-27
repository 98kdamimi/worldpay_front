<template>
	<view class="viewBox">
		<view class="topBg">
			<view class="logo">
				<image src="@/static/image/logo.png" mode=""></image>
			</view>
			<view class="logo-title">Worldpay</view>
			<SvgIcon name="ret" width="48" height="48" class="svgClass" @click="goToPage('/pagesAuth/login/login')">
			</SvgIcon>
		</view>
		<view class="box">
			<!-- 多语言：账号注册 -->
			<view class="box-title">{{ $t('auth.registerTitle') }}</view>
			<view class="input-box">
				<SvgIcon name="svg1" width="40" height="40"></SvgIcon>
				<!-- 复用原有多语言：请输入邮箱账号 -->
				<input type="text" :placeholder="$t('auth.enterEmail')" placeholder-style="color: #8f8f8f;" />
			</view>
			<view class="input-box">
				<SvgIcon name="svg2" width="40" height="40"></SvgIcon>
				<!-- 复用原有多语言：请输入密码 -->
				<input :type="eyeType1 ? 'password' : 'text'" :placeholder="$t('auth.enterPassword')"
					placeholder-style="color: #8f8f8f;" />
				<view @click="eyeType1 = !eyeType1">
					<SvgIcon name="svg5" width="36" height="36" v-if="eyeType1"></SvgIcon>
					<SvgIcon name="svg4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
			<view class="input-box">
				<SvgIcon name="svg2" width="40" height="40"></SvgIcon>
				<!-- 多语言：请再次输入密码 -->
				<input :type="eyeType2 ? 'password' : 'text'" :placeholder="$t('auth.reEnterPassword')"
					placeholder-style="color: #8f8f8f;" />
				<view @click="eyeType2 = !eyeType2">
					<SvgIcon name="svg5" width="36" height="36" v-if="eyeType2"></SvgIcon>
					<SvgIcon name="svg4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
			<view class="small-input">
				<view class="input-box">
					<SvgIcon name="svg2" width="40" height="40"></SvgIcon>
					<!-- 多语言：请输入验证码 -->
					<input :type="eyeType2 ? 'password' : 'text'" :placeholder="$t('auth.enterVerifyCode')"
						placeholder-style="color: #8f8f8f;" />
				</view>
				<view class="small-input-button"
					:style="{ background: isCounting ? '#95969D' : '', color: isCounting ? '#fff' : '' }"
					@click="sendCode">
					<!-- 多语言：发送 / 倒计时（含秒单位） -->
					{{ isCounting ? count + $t('auth.secondUnit') : $t('auth.sendCode') }}
				</view>
			</view>
			<!-- 复用原有多语言：登录 -->
			<view class="loginBtton">{{ $t('auth.registerButton') }}</view>
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
					<!-- 复用原有多语言：同意协议相关 -->
					{{ $t('auth.agreeTerms') }}<span>{{ $t('auth.userAgreement') }}</span><span>{{ $t('auth.privacyPolicy') }}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const eyeType1 = ref(true)
	const eyeType2 = ref(true)
	const xyType = ref(true)

	// 倒计时相关（原有逻辑不变）
	const count = ref(60)
	const isCounting = ref(false)
	let timer = null

	const sendCode = () => {
		if (isCounting.value) return
		isCounting.value = true
		count.value = 60
		timer = setInterval(() => {
			count.value--
			if (count.value <= 0) {
				clearInterval(timer)
				isCounting.value = false
				count.value = 60
			}
		}, 1000)
	}

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
	@import "./register.scss";
</style>