<template>
	<view class="viewBox">
		<Navbar title="谷歌验证码" :showBack="true"></Navbar>
		<view>
			<view class="title">谷歌验证码</view>
			<view class="inputBox">
				<input :type="passWordType ? 'password' : 'text'" placeholder="暂无谷歌验证码"
					placeholder-style="color: #9191aa;" disabled />
				<view @click="passWordType = !passWordType">
					<SvgIcon name="eye3" width="36" height="36" v-if="passWordType"></SvgIcon>
					<SvgIcon name="eye4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
		</view>
		<view class="button" v-if="isCode">申请验证码</view>
		<view class="button" v-else>
			<up-copy content="uview-plus is great !">
				<view>复制验证码</view>
			</up-copy>
		</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const isCode = ref(true)
	const passWordType = ref(true)
</script>

<style lang="scss" scoped>
	@import './google.scss'
</style>