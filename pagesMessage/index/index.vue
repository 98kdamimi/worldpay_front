<template>
	<view class="viewBox">
		<StatusBar></StatusBar>
		<view class="header">
			<view class="header-left-logo">
				<image src="@/static/image/index/logoTitle.png" alt="" mode="widthFix" />
			</view>
		</view>
		<!-- <up-sticky> -->
		<view style="margin: 0 32rpx;">
			<up-tabs :list="list1" @click="click" lineColor='#ffffff'
				:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
				:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
		</view>
		<!-- </up-sticky> -->
		<view v-if="true">
			<view v-for="(item, index) in 5" :key="index"
				@click="goToPage('/pagesMessage/messageDetails/messageDetails')">
				<view class="time">2025-07-04</view>
				<view class="box">
					<view>标题最多显示一行超出部标题最多显示一行超出部分…</view>
					<view class="box-cont">活动简介：最多显示一行超出部分显示点点点带点…</view>
					<view class="box-time">2025-07-04</view>
				</view>
			</view>
		</view>
		<view class="emty" v-else>
			<view class="emtyIcon">
				<image src="@/static/image/index/emty.png" alt="" mode="widthFix" />
			</view>
			<view>暂无数据</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	// tabs切换
	const list1 = reactive([{
			name: '系统通知'
		},
		{
			name: '活动通知'
		}
	]);
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./index.scss"
</style>