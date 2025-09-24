<template>
	<view class="home-container">
		<StatusBar></StatusBar>
		<view class="header">
			<view class="header-left-logo">
				<image src="@/static/image/index/logoTitle.png" alt="" mode="widthFix" />
			</view>
			<view class="header-right-message">
				<image src="@/static/image/index/information.png" alt="" mode="widthFix" />
				<view class="badge">
					<up-badge :isDot="true" class=""></up-badge>
				</view>
			</view>
		</view>
		<!-- 资产 -->
		<view class="assets">
			<view class="assets-title">
				<view>卡片总资产</view>
				<view class="assets-select">
					<view>USD</view>
					<view class="select-icon">
						<image src="@/static/image/index/selectBottom.png" alt="" mode="widthFix" />
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
				<view class="cardDisplay-cardist" @click="openCardList()">
					<view>卡片列表</view>
					<view class="cardDisplay-cardist-icon">
						<image src="@/static/image/index/selectRight.png" alt="" mode="widthFix" />
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
					<view>卡片申请</view>
					<view class="cardDisplay-cardist-icon">
						<image src="@/static/image/index/selectRight.png" alt="" mode="widthFix" />
					</view>
				</view>
			</view>
			<view class="wallet wallet2">
				<view class="valueAddedIconNull">
					<view class="valueAddedIconNull-left">
						<image src="@/static/image/index/valueAddedIconNullicon.png" mode=""></image>
					</view>
					<view>增值</view>
				</view>
				<view class="cardIconNull">
					<view class="cardIconNull-left">
						<image src="@/static/image/index/cardIconNullicon.png" mode=""></image>
					</view>
					<view>卡片申请</view>
				</view>
			</view>
		</view>
		<!-- 介绍 -->
		<view class="introduce">
			<view class="introduce-left">
				<view class="introduce-left-icon">
					<image src="@/static/image/index/logoTitle.png" alt="" mode="widthFix" />
				</view>
				<view class="introduce-left-txt">最受欢迎的一站式交易工具～</view>
			</view>
			<view class="introduce-right">
				<image src="@/static/image/index/worldpay.png" alt="" mode="widthFix" />
			</view>
		</view>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<view class="transactionRecords-title" :class="{ 'sticky': isSticky }" ref="titleRef">
				<view>交易记录</view>
				<view class="transactionRecords-title-right">全部</view>
			</view>
			<view class="transactionRecords-list" v-if="recordsList.length">
				<view class="transactionRecords-item" v-for="(item, index) in recordsList" :key="index">
					<view class="transactionRecords-item-left">
						<view>支付宝消费</view>
						<view class="transactionRecords-item-time">2025/09/03 10:51</view>
					</view>
					<view class="transactionRecords-item-right">- $100</view>
				</view>
			</view>
			<view v-else>
				<view class="emty">
					<view class="emtyIcon">
						<image src="@/static/image/index/emty.png" alt="" mode="widthFix" />
					</view>
					<view>暂无数据</view>
				</view>
			</view>
		</view>
		<!-- 卡片弹窗 -->
		<up-popup :show="cardShow" mode="bottom" @close="closeCardList">
			<view class="cardpopup">
				<view class="cardpopup-title">
					<view class="closure" @click="closeCardList">
						<image src="@/static/image/index/closure.png" mode=""></image>
					</view>
					<view>选择卡片</view>
					<view class="closure"></view>
				</view>
				<view class="cardpopup-list">
					<view v-for="(item, index) in 4" :key="index">
						<view
							:class="index == 0 ? 'cardpopup-item cardpopup-item-bg1' : index == 1 ? 'cardpopup-item cardpopup-item-bg2' : index == 2 ? 'cardpopup-item cardpopup-item-bg3' : 'cardpopup-item cardpopup-item-bg4'">
							<view class="cardpopup-cardNumber">
								<span>9999</span>
								<span>9999</span>
								<span>9999</span>
								<span>9999</span>
							</view>
							<view class="cardpopup-time">
								10/25 10/30
							</view>
							<view class="physicalCard" v-if="index == 3">实体卡</view>
						</view>
					</view>
				</view>
			</view>
		</up-popup>
		<Tabbar></Tabbar>
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
	// 卡片弹窗
	const cardShow = ref(false)
	// 控制吸顶状态
	const isSticky = ref(false);
	const titleRef = ref(null);
	// 标题初始距离顶部的距离
	let titleTop = 0;

	// 打开卡片列表弹窗
	function openCardList() {
		cardShow.value = true;
	}
	// 关闭卡片列表弹窗
	function closeCardList() {
		cardShow.value = false;
	}

	// onPageScroll((options) => {
	// 	isSticky.value = options.scrollTop >= titleTop;
	// });

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

<style lang="scss" scoped>
	@import "./index.scss";
</style>