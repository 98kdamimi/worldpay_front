<template>
	<view class="viewBox">
		<Navbar title="钱包管理" :showBack="true"></Navbar>
		<view class="title">钱包总资产</view>
		<view class="balance">
			0.00
			<span>USDT</span>
		</view>
		<view class="kingKong">
			<view @click="goToPage('/pages/walletRecharge/walletRecharge')">
				<view>
					<SvgIcon name="kingKong1" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view>充值</view>
			</view>
			<view @click="goToPage('/pages/transfer/transfer')">
				<view>
					<SvgIcon name="kingKong2" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view>转账</view>
			</view>
			<view @click="goToPage('/pages/moneyTransfer/moneyTransfer')">
				<view>
					<SvgIcon name="kingKong3" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view>国际汇款</view>
			</view>
			<view @click="goToPage('/pages/financialManagement/financialManagement')">
				<view>
					<SvgIcon name="kingKong4" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view>金融理财</view>
			</view>
		</view>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<up-sticky :offset-top="notchHeight">
				<view class="transactionRecords-title">
					<view>交易记录</view>
					<view class="transactionRecords-title-right">全部</view>
				</view>
			</up-sticky>
			<view class="transactionRecords-list">
				<TransactionRecords :list="recordsList"></TransactionRecords>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const recordsList = ref([])

	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./walletManagement.scss";
</style>