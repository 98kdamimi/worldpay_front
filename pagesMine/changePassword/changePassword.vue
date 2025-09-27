<template>
	<view class="viewBox">
		<Navbar :title="$t('passwordModify.title')" :showBack="true"></Navbar>
		<view>
			<view class="title">{{ $t('passwordModify.oldPassword') }}</view>
			<view class="inputBox">
				<input type="text" :placeholder="$t('passwordModify.enterOldPassword')"
					placeholder-style="color: #9191aa;" />
			</view>
		</view>
		<view>
			<view class="title">{{ $t('passwordModify.newPassword') }}</view>
			<view class="inputBox">
				<input :type="passWordType ? 'password' : 'text'" :placeholder="$t('passwordModify.enterNewPassword')"
					placeholder-style="color: #9191aa;" />
				<view @click="passWordType = !passWordType">
					<SvgIcon name="eye3" width="36" height="36" v-if="passWordType"></SvgIcon>
					<SvgIcon name="eye4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
		</view>
		<view>
			<view class="title">{{ $t('passwordModify.confirmNewPassword') }}</view>
			<view class="inputBox">
				<input type="text" :placeholder="$t('passwordModify.reenterNewPassword')"
					placeholder-style="color: #9191aa;" />
			</view>
		</view>
		<view>
			<view class="title">{{ $t('passwordModify.emailVerificationCode') }}</view>
			<view class="smallInput">
				<view>
					<input type="text" :placeholder="$t('passwordModify.reenterNewPassword')"
						placeholder-style="color: #9191aa;" />
				</view>
				<view class="input-button">{{ $t('passwordModify.sendCode') }}</view>
			</view>
		</view>
		<view class="button">{{ $t('passwordModify.confirmModify') }}</view>
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