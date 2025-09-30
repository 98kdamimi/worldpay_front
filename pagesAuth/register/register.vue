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
			<!-- 账号注册 -->
			<view class="box-title">{{ $t('auth.registerTitle') }}</view>
			<view class="input-box">
				<SvgIcon name="svg1" width="40" height="40"></SvgIcon>
				<!-- 请输入邮箱账号 -->
				<input type="text" :placeholder="$t('auth.enterEmail')" placeholder-style="color: #8f8f8f;"
					v-model="email" />
			</view>
			<view class="input-box">
				<SvgIcon name="svg2" width="40" height="40"></SvgIcon>
				<!-- 请输入密码 -->
				<input :type="eyeType1 ? 'password' : 'text'" :placeholder="$t('auth.enterPassword')"
					placeholder-style="color: #8f8f8f;" v-model="password" />
				<view @click="eyeType1 = !eyeType1">
					<SvgIcon name="svg5" width="36" height="36" v-if="eyeType1"></SvgIcon>
					<SvgIcon name="svg4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
			<view class="input-box">
				<SvgIcon name="svg2" width="40" height="40"></SvgIcon>
				<!-- 请再次输入密码 -->
				<input :type="eyeType2 ? 'password' : 'text'" :placeholder="$t('auth.reEnterPassword')"
					placeholder-style="color: #8f8f8f;" v-model="confirmPassword" />
				<view @click="eyeType2 = !eyeType2">
					<SvgIcon name="svg5" width="36" height="36" v-if="eyeType2"></SvgIcon>
					<SvgIcon name="svg4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
			<view class="small-input">
				<view class="input-box">
					<SvgIcon name="svg2" width="40" height="40"></SvgIcon>
					<!-- 请输入验证码 -->
					<input type="text" :placeholder="$t('auth.enterVerifyCode')" placeholder-style="color: #8f8f8f;"
						v-model="verifyCode" />
				</view>
				<view class="small-input-button"
					:style="{ background: isCounting ? '#95969D' : '', color: isCounting ? '#fff' : '' }"
					@click="sendCode">
					<!-- 发送 / 倒计时（含秒单位） -->
					{{ isCounting ? count + $t('auth.secondUnit') : $t('auth.sendCode') }}
				</view>
			</view>
			<!-- 登录 -->
			<view class="loginBtton" @click="handleRegister">{{ $t('auth.registerButton') }}</view>
			<view class="xieyi">
				<view @click="xyType = !xyType">
					<!-- #ifdef H5 -->
					<SvgIcon name="svg3" width="28" height="28" style="margin: 3rpx 12rpx 0 0;" v-if="!xyType">
					</SvgIcon>
					<SvgIcon name="svg6" width="28" height="28" style="margin: 3rpx 12rpx 0 0;" v-else></SvgIcon>
					<!-- #endif -->
					<!-- #ifdef APP -->
					<SvgIcon name="svg3" width="28" height="28" style="margin: 1rpx 12rpx 0 0;" v-if="!xyType">
					</SvgIcon>
					<SvgIcon name="svg6" width="28" height="28" style="margin: 1rpx 12rpx 0 0;" v-else></SvgIcon>
					<!-- #endif -->
				</view>
				<view>
					<!-- 同意协议相关 -->
					{{ $t('auth.agreeTerms') }}<span>{{ $t('auth.userAgreement') }}</span><span>{{ $t('auth.privacyPolicy') }}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onUnmounted
	} from 'vue'
	import {
		sendEmailCode,
		signUp
	} from '@/request/api.js'
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()

	const eyeType1 = ref(true)
	const eyeType2 = ref(true)
	const xyType = ref(true)

	const count = ref(60)
	const isCounting = ref(false)
	let timer = null

	const email = ref('')
	const password = ref('')
	const confirmPassword = ref('')
	const verifyCode = ref('')

	// 发送验证码前校验邮箱
	const sendCode = async () => {
		if (!email.value) {
			uni.showToast({
				title: t('auth.enterEmail'),
				icon: 'none'
			})
			return
		}
		const emailReg = /^[\w.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/;
		if (!emailReg.test(email.value)) {
			return uni.showToast({
				title: t('auth.invalidEmail'),
				icon: 'none'
			});
		}
		if (isCounting.value) return
		try {
			const res = await sendEmailCode({
				userEmail: email.value,
				language: uni.getLocale()
			})
			console.log(res)
			// 开始倒计时
			// isCounting.value = true
			// count.value = 60
			// timer = setInterval(() => {
			// 	count.value--
			// 	if (count.value <= 0) {
			// 		clearInterval(timer)
			// 		isCounting.value = false
			// 		count.value = 60
			// 	}
			// }, 1000)
		} catch (error) {
			console.error(error)
		}
	}

	// 注册按钮点击校验
	const handleRegister = async () => {
		if (xyType.value) {
			uni.showToast({
				title: t('auth.readTheAgreement'),
				icon: 'none'
			})
			return
		}
		if (!email.value) {
			uni.showToast({
				title: t('auth.enterEmail'),
				icon: 'none'
			})
			return
		}
		if (!verifyCode.value) {
			uni.showToast({
				title: t('auth.enterVerifyCode'),
				icon: 'none'
			})
			return
		}
		if (!password.value) {
			uni.showToast({
				title: t('auth.enterPassword'),
				icon: 'none'
			})
			return
		}
		if (!confirmPassword.value) {
			uni.showToast({
				title: t('auth.reEnterPassword'),
				icon: 'none'
			})
			return
		}
		if (password.value !== confirmPassword.value) {
			uni.showToast({
				title: t('auth.inconsistency'),
				icon: 'none'
			})
			return
		}
		// 通过校验，调用注册接口
		try {
			const res = await signUp({
				userEmail: email.value,
				userPassword: password.value,
				emailCode: verifyCode.value
			})
			if (res.rtncode == 200) {
				setTimeout(() => {
					goToPage('/pagesAuth/login/login')
					clearInput()
				}, 1000)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const clearInput = () => {
		email.value = ''
		password.value = ''
		confirmPassword.value = ''
		verifyCode.value = ''
		eyeType1.value = true
		eyeType2.value = true
		xyType.value = true
	}

	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		})
	}
	const goToSwitch = (address) => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}

	// 清除定时器
	onUnmounted(() => {
		if (timer) {
			clearInterval(timer)
			timer = null
		}
	})
</script>
<style lang="scss" scoped>
	@import "./register.scss";
</style>