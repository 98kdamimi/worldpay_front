<template>
	<view class="viewBox">
		<view class="topBg">
			<view class="logo">
				<image src="@/static/image/logo.png" mode=""></image>
			</view>
			<view class="logo-title">Worldpay</view>
		</view>
		<view class="box">
			<view class="box-title">欢迎使用 Worldpay</view>
			<view class="input-box">
				<SvgIcon name="svg1" width="40" height="40"></SvgIcon>
				<input type="text" placeholder="请输入邮箱账号" placeholder-style="color: #8f8f8f;" />
			</view>
			<view class="input-box">
				<SvgIcon name="svg2" width="40" height="40"></SvgIcon>
				<input :type="eyeType ? 'password' : 'text'" placeholder="请输入登录密码"
					placeholder-style="color: #8f8f8f;" />
				<view @click="eyeType = !eyeType">
					<SvgIcon name="svg5" width="36" height="36" v-if="eyeType"></SvgIcon>
					<SvgIcon name="svg4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
			<view class="title-txt">
				<view @click="goToPage('/pagesAuth/register/register')">用户注册</view>
				<view @click="goToPage('/pagesMine/changePassword/changePassword')">忘记密码？</view>
			</view>
			<view class="loginBtton" @click="applyShow = true">登录</view>
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
					我已阅读并同意<span>《用户协议》</span><span>《隐私协议》</span>
				</view>
			</view>
		</view>
		<up-modal :show="applyShow" :showConfirmButton='false' bgColor='#141414'>
			<view class="applyModal">
				<view class="applyModal-title">
					请输入谷歌验证码
				</view>
				<view class="applyModal-input">
					<input type="text" placeholder="请输入谷歌验证码" placeholder-style="color: #8f8f8f;" />
				</view>
				<view class="applyModal-button">
					<view class="cancel" @click="applyShow = false">取消</view>
					<view class="apply" @click="goToSwitch()">确认</view>
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