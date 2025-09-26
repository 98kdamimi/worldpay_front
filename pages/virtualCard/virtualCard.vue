<template>
	<view class="viewBox">
		<Navbar title="虚拟卡" :showBack="true">
			<template #right>
				<SvgIcon name="add" width="40" height="40" />
			</template>
		</Navbar>
		<view class="cardInfo">
			<view class="cardInfo-left">
				<view class="cardInfo-active"></view>
				<view class="cardInfo-cardNumber">
					<view>虚拟卡</view>
					<view class="cardInfo-txt">**** 9999</view>
				</view>
			</view>
			<view class="cardInfo-right">切换</view>
		</view>
		<view class="worldpay">
			<view class="worldpay-cardNumber">
				<view>
					<view>
						<span>{{ formattedCard('9999999999999999') }}</span>
					</view>
					<view>
						<up-copy content="9999999999999999">
							<SvgIcon name="copy1" width="30" height="30"></SvgIcon>
						</up-copy>
					</view>
				</view>
				<view @click="setEye()">
					<SvgIcon name="eye1" width="36" height="36" v-if="isEye"></SvgIcon>
					<SvgIcon name="eye2" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
			<view class="worldpay-time">10/25 10/30</view>
			<view class="worldpay-Balance">≈ $ 0.00</view>
		</view>
		<view class="kingKongDistrict">
			<view class="kingKongDistrict-item" @click="rchargeShow = true">
				<view>
					<SvgIcon name="topUp" width="120" height="120"></SvgIcon>
				</view>
				<view>充值</view>
			</view>
			<view class="kingKongDistrict-item">
				<view>
					<SvgIcon name="cardDetails" width="120" height="120"></SvgIcon>
				</view>
				<view>卡详情</view>
			</view>
			<view class="kingKongDistrict-item">
				<view>
					<SvgIcon name="wallet" width="120" height="120"></SvgIcon>
				</view>
				<view>添加到钱包</view>
			</view>
		</view>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<up-sticky :offset-top="notchHeight">
				<view class="transactionRecords-title" :class="{ 'sticky': isStickyActive }">
					<view>交易记录</view>
					<view class="transactionRecords-title-right">全部</view>
				</view>
			</up-sticky>
			<view class="transactionRecords-list">
				<TransactionRecordsVue :list="recordsList"></TransactionRecordsVue>
			</view>
		</view>
		<up-popup :show="rchargeShow" mode="bottom" bgColor='#141414'>
			<view class="rchargePopup">
				<view class="rchargePopup-title">选择充值方式</view>
				<view class="rchargePopup-off" @click="rchargeShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="rchargePopup-item">
					<view>
						<SvgIcon name="walletIcon" width="48" height="48"></SvgIcon>
					</view>
					<view>钱包充值</view>
				</view>
				<view class="rchargePopup-item">
					<view>
						<SvgIcon name="bankIcon" width="48" height="48"></SvgIcon>
					</view>
					<view>银行账户</view>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		formattedCard
	} from '@/utils/common.js'
	const recordsList = ref([])
	const isEye = ref(true)
	const rchargeShow = ref(false)

	function setEye() {
		isEye.value = !isEye.value;
	}
</script>

<style lang="scss" scoped>
	@import "./virtualCard.scss";
</style>