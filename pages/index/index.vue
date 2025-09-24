<template>
	<view class="home-container">
		<view class="header">
			<view class="header-left-logo">
				<img src="/static/image/index/logo-title.png" alt="" />
			</view>
			<view class="header-right-message">
				<!-- <u-badge :is-dot="true" type="success"></u-badge> -->
				<img src="/static/image/index/information.png" alt="" />
			</view>
		</view>
		<!-- 资产 -->
		<view class="assets">
			<view class="assets-title">
				<view>卡片总资产</view>
				<view class="assets-select">
					<view>USD</view>
					<view class="select-icon">
						<img src="/static/image/index/selectBottom.png" alt="" />
					</view>
				</view>
			</view>
			<view class="assets-approximately">
				≈ $ 0.00
			</view>
			<view class="assets-exchange-approximately">
				≈0.00 USDT
			</view>
		</view>
		<!-- 卡片展示 -->
		<view v-if="cardList.length">
			<view class="cardDisplay cardDisplayBg">
				<view class="cardDisplay-cardist">
					<view>卡片列表</view>
					<view class="cardDisplay-cardist-icon">
						<img src="/static/image/index/selectRight.png" alt="" />
					</view>
				</view>
			</view>
			<!-- 增资 钱包 卡片申请入口 -->
			<view class="wallet wallet1">
				<view class="valueAddedIcon">
					<span>增值</span>
				</view>
				<view class="walletIcon">
					<span>钱包</span>
				</view>
				<view class="cardIcon">
					<span>卡片申请</span>
				</view>
			</view>
		</view>
		<!-- 没有卡片 -->
		<view v-else>
			<view class="cardDisplay cardDisplayBgNull">
				<view class="cardDisplay-cardist">
					<!-- <view>卡片申请</view> -->
					<view class="cardDisplay-cardist-icon">
						<img src="/static/image/index/selectRight.png" alt="" />
					</view>
				</view>
			</view>
			<view class="wallet wallet2">
				<view class="valueAddedIconNull">
					<!-- <span>增值</span> -->
				</view>
				<view class="cardIconNull">
					<span>卡片申请</span>
				</view>
			</view>
		</view>
		<!-- 介绍 -->
		<view class="introduce">
			<view class="introduce-left">
				<view class="introduce-left-icon">
					<img src="/static/image/index/logo-title.png" alt="" />
				</view>
				<view class="introduce-left-txt">最受欢迎的一站式交易工具～</view>
			</view>
			<view class="introduce-right">
				<img src="/static/image/index/worldpay.png" alt="" />
			</view>
		</view>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<view class="transactionRecords-title" :class="{ 'sticky': isSticky }" ref="titleRef">
				<view>交易记录</view>
				<view class="transactionRecords-title-right">全部</view>
			</view>
			<view class="transactionRecords-list">
				<view class="transactionRecords-item" v-for="(item, index) in 20" :key="index">
					<view class="transactionRecords-item-left">
						<view>支付宝消费</view>
						<view class="transactionRecords-item-time">2025/09/03 10:51</view>
					</view>
					<view class="transactionRecords-item-right">- $100</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		nextTick
	} from 'vue';
	import {
		onPageScroll,
		onUnload
	} from '@dcloudio/uni-app';

	// 卡片列表
	const cardList = ref([])
	// 交易记录
	const recordsList = ref([])
	// 控制吸顶状态
	const isSticky = ref(false);
	const titleRef = ref(null);
	// 标题初始距离顶部的距离
	let titleTop = 0;

	onPageScroll((options) => {
		isSticky.value = options.scrollTop >= titleTop;
	});

	onMounted(() => {
		nextTick(() => {
			if (titleRef.value) {
				uni.createSelectorQuery()
					.in(titleRef.value)
					.select('.transactionRecords-title')
					.boundingClientRect((rect) => {
						if (rect) {
							titleTop = rect.top;
						}
					})
					.exec();
			}
		});
	});
	onUnload(() => {
		// 重置吸顶状态
		isSticky.value = false;
		// 重置初始位置
		titleTop = 0;
	});
</script>

<style lang="scss">
	@import "./index.scss";
</style>
