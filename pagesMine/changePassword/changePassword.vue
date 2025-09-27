<template>
	<view class="viewBox">
		<Navbar :title="title" :showBack="true"></Navbar>
		<view>
			<view class="title">旧密码</view>
			<view class="inputBox">
				<input type="text" placeholder="请输入旧密码" placeholder-style="color: #9191aa;" />
			</view>
		</view>
		<view>
			<view class="title">新密码</view>
			<view class="inputBox">
				<input :type="passWordType ? 'password' : 'text'" placeholder="请输入新密码"
					placeholder-style="color: #9191aa;" />
				<view @click="passWordType = !passWordType">
					<SvgIcon name="eye3" width="36" height="36" v-if="passWordType"></SvgIcon>
					<SvgIcon name="eye4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
		</view>
		<view>
			<view class="title">确认新密码</view>
			<view class="inputBox">
				<input type="text" placeholder="请再次输入新密码" placeholder-style="color: #9191aa;" />
			</view>
		</view>
		<view>
			<view class="title">邮箱验证码</view>
			<view class="smallInput">
				<view>
					<input type="text" placeholder="请再次输入新密码" placeholder-style="color: #9191aa;" />
				</view>
				<view class="input-button">发送</view>
			</view>
		</view>
		<view class="button">确认修改</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const title = ref('修改登录密码')
	const passWordType = ref(true)
</script>

<style lang="scss" scoped>
	@import './changePassword.scss'
</style>