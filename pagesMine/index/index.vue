<template>
	<view class="viewBox">
		<StatusBar></StatusBar>
		<view class="header">
			<view class="header-left-logo">
				<image src="@/static/image/index/logoTitle.png" alt="" mode="widthFix" />
			</view>
		</view>
		<view class="mine-info">
			<SvgIcon name="avatar" width="160" height="160"></SvgIcon>
			<view class="info-right">
				<view>188 **** 8888</view>
				<view class="info-txt">{{ $t('mine.uidLabel') }}888888</view>
				<view class="info-txt">{{ $t('mine.invitationCode') }}88888</view>
			</view>
		</view>
		<view class="kingKong">
			<view @click="goToPage('/pagesMine/financialManagementOrders/financialManagementOrders')">
				<view>
					<SvgIcon name="kingKong5" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view>{{ $t('mine.financialOrders') }}</view>
			</view>
			<view @click="goToPage('/pagesMine/logisticsInformation/logisticsInformation')">
				<view>
					<SvgIcon name="kingKong6" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view>{{ $t('mine.logisticsInfo') }}</view>
			</view>
			<view @click="goToPage('/pagesMine/transactionRecords/transactionRecords')">
				<view>
					<SvgIcon name="kingKong7" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view>{{ $t('mine.transactionRecords') }}</view>
			</view>
			<view @click="goToPage('/pagesMine/personalInformation/personalInformation')">
				<view>
					<SvgIcon name="kingKong8" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view>{{ $t('mine.personalInfo') }}</view>
			</view>
		</view>
		<view>
			<view class="navBox" v-for="(item, index) in navList" :key="index" @click="goToPage(item.href)">
				<view>
					<!-- #ifdef APP -->
					<SvgIcon :name="item.svg" width="40" height="40" style="margin: -5rpx 12rpx 0 0;"></SvgIcon>
					<!-- #endif -->
					<!-- #ifndef APP -->
					<SvgIcon :name="item.svg" width="40" height="40" style="margin-right: 12rpx;"></SvgIcon>
					<!-- #endif -->
					<view>{{ item.name }}</view>
				</view>
				<view>
					<view style="margin-right: 24rpx;" v-if="item.right">{{ item.right }}</view>
					<SvgIcon name="right" width="36" height="36"></SvgIcon>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	const navList = reactive([{
			svg: 'mine1',
			name: '安全设置',
			right: '',
			href: '/pagesMine/securitySettings/securitySettings'
		},
		{
			svg: 'mine2',
			name: '语言切换',
			right: '中文简体',
			href: '/pagesMine/languageSwitching/languageSwitching'
		},
		{
			svg: 'mine3',
			name: '关于我们',
			right: '',
			href: ''
		},
		{
			svg: 'mine4',
			name: '联系我们',
			right: '',
			href: ''
		},
		{
			svg: 'mine5',
			name: '帮助中心',
			right: '',
			href: ''
		},
	]);
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import './index.scss'
</style>