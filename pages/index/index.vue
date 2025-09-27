<template>
	<view class="home-container">
		<StatusBar v-if="!ifFixedStatusBar"></StatusBar>
		<FixedStatusBar v-else></FixedStatusBar>
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
				<view>{{ $t('home.assetsTitle') }}</view>
				<view class="assets-select">
					<view>{{ $t('home.currencyUsd') }}</view>
					<view class="select-icon">
						<image src="@/static/image/index/selectBottom.png" alt="" mode="widthFix" />
					</view>
				</view>
			</view>
			<view class="assets-approximately">≈ $ 0.00</view>
			<view class="assets-exchange-approximately">≈0.00 USDT</view>
		</view>
		<!-- 卡片展示 -->
		<view v-if="cardList && cardList.length">
			<view class="cardDisplay cardDisplayBg">
				<view class="cardDisplay-cardist" @click="openCardList()">
					<view>{{ $t('home.cardList') }}</view>
					<view class="cardDisplay-cardist-icon">
						<image src="@/static/image/index/selectRight.png" alt="" mode="widthFix" />
					</view>
				</view>
			</view>
			<!-- 增资 钱包 卡片申请入口 -->
			<view class="wallet wallet1">
				<view class="valueAddedIcon" @click="goToPage('/pages/topUp/index')">
					<span>{{ $t('home.valueAdded') }}</span>
				</view>
				<view class="walletIcon">
					<span>{{ $t('home.wallet') }}</span>
				</view>
				<view class="cardIcon">
					<span>{{ $t('home.cardApplication') }}</span>
				</view>
			</view>
		</view>
		<!-- 没有卡片 -->
		<view v-else>
			<view class="cardDisplay cardDisplayBgNull">
				<view class="cardDisplay-cardist" @click="openApplyModal()">
					<view>{{ $t('home.cardApplication') }}</view>
					<view class="cardDisplay-cardist-icon">
						<image src="@/static/image/index/selectRight.png" alt="" mode="widthFix" />
					</view>
				</view>
			</view>
			<view class="wallet wallet2">
				<view class="valueAddedIconNull" @click="goToPage('/pages/topUp/index')">
					<view class="valueAddedIconNull-left">
						<image src="@/static/image/index/valueAddedIconNullicon.png" mode=""></image>
					</view>
					<view>{{ $t('home.valueAdded') }}</view>
				</view>
				<view class="cardIconNull" @click="goToPage('/pages/cardApplication/cardApplication')">
					<view class="cardIconNull-left">
						<image src="@/static/image/index/cardIconNullicon.png" mode=""></image>
					</view>
					<view>{{ $t('home.cardApplication') }}</view>
				</view>
			</view>
		</view>
		<!-- 介绍 -->
		<view class="introduce">
			<view class="introduce-left">
				<view class="introduce-left-icon">
					<image src="@/static/image/index/logoTitle.png" alt="" mode="widthFix" />
				</view>
				<view class="introduce-left-txt">{{ $t('home.popularTool') }}</view>
			</view>
			<view class="introduce-right">
				<image src="@/static/image/index/worldpay.png" alt="" mode="widthFix" />
			</view>
		</view>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<!-- 	<up-sticky :offset-top="notchHeight"> -->
			<view class="stickyContent" :style="{ top: notchHeight + 'px' }" id="transactionRecords">
				<view class="transactionRecords-title">
					<view>{{ $t('home.transactionRecords') }}</view>
					<view class="transactionRecords-title-right">{{ $t('home.all') }}</view>
				</view>
			</view>

			<!-- </up-sticky> -->
			<view class="transactionRecords-list">
				<TransactionRecords :list="recordsList"></TransactionRecords>
			</view>
		</view>
		<!-- 卡片弹窗 -->
		<up-popup :show="cardShow" mode="bottom" @close="closeCardList">
			<view class="cardpopup">
				<view class="cardpopup-title">
					<view class="closure" @click="closeCardList">
						<image src="@/static/image/index/closure.png" mode=""></image>
					</view>
					<view>{{ $t('home.selectCard') }}</view>
					<view class="closure"></view>
				</view>
				<view class="cardpopup-list">
					<view v-for="(item, index) in 4" :key="index">
						<Card :type="index"></Card>
					</view>
				</view>
			</view>
		</up-popup>
		<!-- 是否申请卡片 -->
		<up-modal :show="applyShow" :showConfirmButton="false" bgColor="#141414">
			<view class="applyModal">
				<view class="applyModal-title">
					<SvgIcon class="svg-icon" name="hint" width="36" height="36"></SvgIcon>
					<view>{{ $t('home.homeHint') }}</view>
				</view>
				<view class="applyModal-txt">{{ $t('home.noCardDetected') }}</view>
				<view class="applyModal-button">
					<view class="cancel" @click="closeApplyModal">{{ $t('home.cancel') }}</view>
					<view class="apply" @click="goToPage('/pages/cardApplication/cardApplication'),closeApplyModal()">
						{{ $t('home.applyNow') }}
					</view>
				</view>
			</view>
		</up-modal>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onReady, onPageScroll } from '@dcloudio/uni-app';

// 卡片列表
const cardList = ref([]);
// 交易记录
const recordsList = ref([]);
// 卡片弹窗
const cardShow = ref(false);
// 是否申请卡片
const applyShow = ref(false);
// 刘海高度
const notchHeight = ref(0);
const ifFixedStatusBar = ref(false);

const goToPage = (address) => {
	uni.navigateTo({
		url: address
	});
};

// 打开是否申请弹窗
function openApplyModal() {
	applyShow.value = true;
}
// 关闭是否申请弹窗
function closeApplyModal() {
	applyShow.value = false;
}
// 打开卡片列表弹窗
function openCardList() {
	cardShow.value = true;
}
// 关闭卡片列表弹窗
function closeCardList() {
	cardShow.value = false;
}
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
});

onPageScroll(() => {
	const query = uni.createSelectorQuery().in(this);
	query
		.select('#transactionRecords')
		.boundingClientRect((data) => {

			if (data.top <= notchHeight.value) {
				ifFixedStatusBar.value = true;
				return
			}
			ifFixedStatusBar.value = false;
		})
		.exec();
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
