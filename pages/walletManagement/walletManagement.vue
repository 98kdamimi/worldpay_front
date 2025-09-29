<template>
	<view class="viewBox">
		<Navbar :title="$t('walletManagement.title')" :showBack="true"></Navbar>
		<view class="title">{{ $t('walletManagement.totalAssets') }}</view>
		<view class="balance">
			0.00
			<span>{{ $t('walletManagement.usdt') }}</span>
		</view>
		<view class="kingKong">
			<view @click="goToPage('/pages/walletRecharge/walletRecharge')">
				<view>
					<SvgIcon name="kingKong1" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view class="marquee-text" :class="{ scroll: rechargeScroll }" id="rechargeText">
					<span>{{ $t('walletManagement.recharge') }}</span>
				</view>
			</view>
			<view @click="goToPage('/pages/transfer/transfer')">
				<view>
					<SvgIcon name="kingKong2" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view class="marquee-text" :class="{ scroll: transferScroll }" id="transferText">
					<span>{{ $t('walletManagement.transfer') }}</span>
				</view>
			</view>
			<view @click="goToPage('/pages/moneyTransfer/moneyTransfer')">
				<view>
					<SvgIcon name="kingKong3" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view class="marquee-text" :class="{ scroll: remitScroll }" id="remitText">
					<span>{{ $t('walletManagement.internationalRemittance') }}</span>
				</view>
			</view>
			<view @click="goToPage('/pages/financialManagement/financialManagement')">
				<view>
					<SvgIcon name="kingKong4" width="100" height="100" style="margin-bottom: 32rpx;"></SvgIcon>
				</view>
				<view class="marquee-text" :class="{ scroll: financeScroll }" id="financeText">
					<span>{{ $t('walletManagement.financialManagement') }}</span>
				</view>
			</view>
		</view>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<up-sticky :offset-top="notchHeight" bgColor="#0f0f0f">
				<view class="transactionRecords-title">
					<view>{{ $t('walletManagement.transactionRecords') }}</view>
					<view class="transactionRecords-title-right">{{ $t('walletManagement.all') }}</view>
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
		ref,
		nextTick,
		onUnmounted
	} from 'vue';
	import {
		onReady
	} from '@dcloudio/uni-app';
	import {
		checkOverflow
	} from '@/utils/common.js'

	const recordsList = ref([])
	// 刘海高度
	const notchHeight = ref(0);
	// 跑马灯滚动状态
	const rechargeScroll = ref(false)
	const transferScroll = ref(false)
	const remitScroll = ref(false)
	const financeScroll = ref(false)

	onReady(() => {
		// 获取刘海高度
		uni.getSystemInfo({
			success: (res) => {
				notchHeight.value = res.safeArea?.top || 0;
				if (!notchHeight.value) {
					notchHeight.value = res.statusBarHeight || 0;
				}
			},
			fail: () => {
				notchHeight.value = 20;
			}
		});
		// 检查所有跑马灯内容是否超出
		nextTick(() => {
			checkOverflow('rechargeText', rechargeScroll)
			checkOverflow('transferText', transferScroll)
			checkOverflow('remitText', remitScroll)
			checkOverflow('financeText', financeScroll)
		})
	});

	onUnmounted(() => {
		rechargeScroll.value = false
		transferScroll.value = false
		remitScroll.value = false
		financeScroll.value = false
	})

	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./walletManagement.scss";
</style>