<template>
	<view class="viewBox">
		<Navbar :title="$t('securitySettings.title')" :showBack="true"></Navbar>
		<view style="margin-top: 32rpx;">
			<view class="box" v-for="(item, index) in navList" :key="index" @click="goToPage(item.href)">
				<view>{{ item.name }}</view>
				<SvgIcon name="right" width="36" height="36"></SvgIcon>
			</view>
		</view>
		<view class="button">
			<view>{{ $t('securitySettings.logout') }}</view>
			<view class="red">{{ $t('securitySettings.cancelAccount') }}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	const navList = reactive([{
			name: '修改登录密码',
			href: '/pagesMine/changePassword/changePassword'
		},
		{
			name: '支付密码设置',
			href: '/pagesMine/changePassword/changePassword'
		},
		{
			name: '谷歌验证码',
			href: '/pagesMine/google/google'
		}
	]);
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import './securitySettings.scss'
</style>