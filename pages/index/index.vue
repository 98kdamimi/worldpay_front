<template>
	<view class="home-container">
		<FixedStatusBar></FixedStatusBar>
		<view class="header" :style="{ top: notchHeight + 'px' }">
			<view class="header-left-logo">
				<image
					src="@/static/image/index/logoTitle.png"
					alt=""
					mode="widthFix"
				/>
			</view>
			<view class="header-right-message">
				<image
					src="@/static/image/index/information.png"
					alt=""
					mode="widthFix"
				/>
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
						<image
							src="@/static/image/index/selectBottom.png"
							alt=""
							mode="widthFix"
						/>
					</view>
				</view>
			</view>
			<view class="assets-approximately">$ {{ totalCardAssets }}</view>
			<!-- <view class="assets-exchange-approximately">≈0.00 USDT</view> -->
		</view>
		<!-- 卡片展示 -->
		<view v-if="cardData && cardData.list.length">
			<view class="cardDisplay cardDisplayBg">
				<view class="cardDisplay-cardist" @click="openCardList()">
					<view>{{ $t('home.cardList') }}</view>
					<view class="cardDisplay-cardist-icon">
						<image
							src="@/static/image/index/selectRight.png"
							alt=""
							mode="widthFix"
						/>
					</view>
				</view>
			</view>
		</view>
		<!-- 没有卡片 -->
		<view v-else>
			<view class="cardDisplay cardDisplayBgNull">
				<view class="cardDisplay-cardist" @click="openApplyModal()">
					<view>{{ $t('home.cardApplication') }}</view>
					<view class="cardDisplay-cardist-icon">
						<image
							src="@/static/image/index/selectRight.png"
							alt=""
							mode="widthFix"
						/>
					</view>
				</view>
				<view class="cardDisplayBgNull-txt">
					{{ $t('home.pleaseApplyForAFardFirst') }}
				</view>
			</view>
		</view>
		<!-- 增资 钱包 卡片申请入口 -->
		<view class="wallet wallet1" v-if="userInfo.walletState">
			<view
				class="valueAddedIcon"
				@click="goToPage('/pages/topUp/index')"
			>
				<SvgIcon
					name="valueAdded"
					width="48"
					height="36"
					class="svg"
				></SvgIcon>
				<span>{{ $t('home.valueAdded') }}</span>
			</view>
			<view
				class="walletIcon"
				@click="goToPage('/pages/walletManagement/walletManagement')"
			>
				<SvgIcon
					name="wallet1"
					width="48"
					height="36"
					class="svg"
				></SvgIcon>
				<span>{{ $t('home.wallet') }}</span>
			</view>
			<view
				class="cardIcon"
				@click="goToPage('/pages/cardApplication/cardApplication')"
			>
				<SvgIcon
					name="cardApplication"
					width="48"
					height="36"
					class="svg"
				></SvgIcon>
				<span>{{ $t('home.apply') }}</span>
			</view>
		</view>
		<view class="wallet wallet2" v-else>
			<view
				class="valueAddedIconNull"
				@click="goToPage('/pages/topUp/index')"
			>
				<view class="valueAddedIconNull-left">
					<image
						src="@/static/image/index/valueAddedIconNullicon.png"
						mode=""
					></image>
				</view>
				<view>{{ $t('home.valueAdded') }}</view>
			</view>
			<view
				class="cardIconNull"
				@click="goToPage('/pages/cardApplication/cardApplication')"
			>
				<view class="cardIconNull-left">
					<image
						src="@/static/image/index/cardIconNullicon.png"
						mode=""
					></image>
				</view>
				<view>{{ $t('home.cardApplication') }}</view>
			</view>
		</view>
		<!-- 介绍 -->
		<view class="introduce">
			<view class="introduce-left">
				<view class="introduce-left-icon">
					<image
						src="@/static/image/index/logoTitle.png"
						alt=""
						mode="widthFix"
					/>
				</view>
				<view class="introduce-left-txt">
					{{ $t('home.popularTool') }}
				</view>
			</view>
			<view class="introduce-right">
				<image
					src="@/static/image/index/worldpay.png"
					alt=""
					mode="widthFix"
				/>
			</view>
		</view>
		<!-- 交易记录 -->
		<view class="transactionRecords" style="padding-bottom: 32rpx">
			<!-- 吸顶标题 -->
			<view
				class="stickyContent"
				:style="{ top: notchHeight + 40 + 'px' }"
			>
				<view class="transactionRecords-title">
					<view>{{ $t('home.transactionRecords') }}</view>
					<view class="transactionRecords-title-right">
						{{ $t('home.all') }}
					</view>
				</view>
			</view>
			<view class="transactionRecords-list">
				<TransactionRecords :list="recordsList"></TransactionRecords>
			</view>
		</view>
		<!-- 卡片弹窗 -->
		<up-popup :show="cardShow" mode="bottom" @close="closeCardList">
			<view class="cardpopup">
				<view class="cardpopup-title">
					<view class="closure" @click="closeCardList">
						<image
							src="@/static/image/index/closure.png"
							mode=""
						></image>
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
		<up-modal
			:show="applyShow"
			:showConfirmButton="false"
			bgColor="#141414"
		>
			<view class="applyModal">
				<view class="applyModal-title">
					<SvgIcon
						class="svg-icon"
						name="hint"
						width="36"
						height="36"
					></SvgIcon>
					<view>{{ $t('home.homeHint') }}</view>
				</view>
				<view class="applyModal-txt">
					{{ $t('home.noCardDetected') }}
				</view>
				<view class="applyModal-button">
					<view class="cancel" @click="closeApplyModal">
						{{ $t('home.cancel') }}
					</view>
					<view
						class="apply"
						@click="
							goToPage('/pages/cardApplication/cardApplication'),
								closeApplyModal()
						"
					>
						{{ $t('home.applyNow') }}
					</view>
				</view>
			</view>
		</up-modal>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onReady, onPageScroll, onLoad } from '@dcloudio/uni-app';
import { findUserCardAssets, findUserCardList } from '@/request/api.js';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();

// 卡片列表
const cardData = ref({
	list: []
});
// 交易记录
const recordsList = ref([]);
// 卡片弹窗
const cardShow = ref(false);
// 是否申请卡片
const applyShow = ref(false);
// 刘海高度
const notchHeight = ref(0);

// 个人信息
const { userInfo } = storeToRefs(userStore);
// 卡片总资产
const totalCardAssets = ref();

// 获取卡片总资产
const getFindUserCardAssets = async () => {
	try {
		const res = await findUserCardAssets({
			uid: userInfo.value.uid
		});
		totalCardAssets.value = res;
	} catch (error) {
		console.error(error);
	}
};
// 查询用户所有卡片
const getFindUserCardList = async () => {
	try {
		const res = await findUserCardList({
			uid: userInfo.value.uid
		});
		console.log('获取到卡片列表', res);
		cardData.value = res;
	} catch (error) {
		console.error(error);
	}
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

onLoad(async () => {
	await getFindUserCardAssets();
	await getFindUserCardList();
});

onReady(async () => {
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

const goToPage = (address) => {
	uni.navigateTo({
		url: address
	});
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>