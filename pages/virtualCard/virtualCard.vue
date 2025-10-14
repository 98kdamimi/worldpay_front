<template>
	<view class="">
		<Navbar :title="cardInfo?.cardData?.title" :showBack="true">
			<template #right>
				<SvgIcon name="add" width="40" height="40" />
			</template>
		</Navbar>
		<view class="viewBox">
			<view class="cardInfo">
				<view class="cardInfo-left">
					<view class="cardInfo-cardNumber">
						<view>{{ cardInfo?.cardData?.title }}</view>
						<view class="cardInfo-txt">
							{{ maskBankCard(cardInfo?.cardNo) }}
						</view>
					</view>
				</view>
				<view class="cardInfo-right" @click="goBack">
					{{ $t('virtualCard.switch') }}
				</view>
			</view>
			<view
				class="worldpay"
				:style="{ backgroundImage: `url(${cardInfo?.cardData?.img})` }"
			>
				<view class="worldpay-cardNumber">
					<view class="cardNumber-left">
						<view v-if="isEye" class="star">
							{{ maskFullBankCard(cardInfo?.cardNo) }}
						</view>
						<view v-else>
							{{ formattedCard(cardInfo?.cardNo) }}
						</view>
						<view>
							<up-copy :content="cardInfo?.cardNo">
								<SvgIcon
									name="copy"
									width="36"
									height="36"
								></SvgIcon>
							</up-copy>
						</view>
					</view>

					<view @click="setEye()">
						<SvgIcon
							name="eye2"
							width="36"
							height="36"
							v-if="isEye"
						></SvgIcon>
						<SvgIcon
							name="eye1"
							width="36"
							height="36"
							v-else
						></SvgIcon>
					</view>
				</view>
				<view class="worldpay-time">
					{{
						`${formatToMonthDay(
							cardInfo?.setTime
						)}       ${endTime}`
					}}
				</view>
				<view class="worldpay-Balance">
					≈ $ {{ formatBalance(cardInfo?.balance) }}
				</view>
			</view>
			<view class="kingKongDistrict">
				<view class="kingKongDistrict-item" @click="rchargeShow = true">
					<view>
						<SvgIcon
							name="topUp"
							width="120"
							height="120"
						></SvgIcon>
					</view>
					<view>{{ $t('virtualCard.recharge') }}</view>
				</view>
				<view class="kingKongDistrict-item" @click="goCardDetail">
					<view>
						<SvgIcon
							name="cardDetails"
							width="120"
							height="120"
						></SvgIcon>
					</view>
					<view>{{ $t('virtualCard.cardDetails') }}</view>
				</view>
				<view class="kingKongDistrict-item">
					<view>
						<SvgIcon
							name="wallet"
							width="120"
							height="120"
						></SvgIcon>
					</view>
					<view>{{ $t('virtualCard.addToWallet') }}</view>
				</view>
			</view>
			<!-- 交易记录 -->
			<view class="transactionRecords">
				<!-- 标题 -->
				<view class="transactionRecords-title">
					<view>{{ $t('virtualCard.transactionRecords') }}</view>
					<!-- <view class="transactionRecords-title-right">
						{{ $t('virtualCard.all') }}
					</view> -->
				</view>
				<view class="transactionRecords-list">
					<TransactionRecords
						:list="recordsList"
					></TransactionRecords>
				</view>
			</view>
		</view>

		<up-popup :show="rchargeShow" mode="bottom" bgColor="#141414">
			<view class="rchargePopup">
				<view class="rchargePopup-title">
					{{ $t('virtualCard.selectRechargeMethod') }}
				</view>
				<view class="rchargePopup-off" @click="rchargeShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="rchargePopup-item" @click="toWalletRecharge">
					<view>
						<SvgIcon
							name="walletIcon"
							width="48"
							height="48"
						></SvgIcon>
					</view>
					<view>{{ $t('virtualCard.walletRecharge') }}</view>
				</view>
				<view class="rchargePopup-item" @click="toRecharge">
					<view>
						<SvgIcon
							name="bankIcon"
							width="48"
							height="48"
						></SvgIcon>
					</view>
					<view>{{ $t('virtualCard.bankAccount') }}</view>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {
	formattedCard,
	maskBankCard,
	maskFullBankCard,
	formatToMonthDay,
	formatBalance
} from '@/utils/common.js';
import { onReady, onLoad, onReachBottom } from '@dcloudio/uni-app';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import {
	findTransaction,
	findUserCardInfo,
	findCardExpirationTime
} from '@/request/api.js';

const userStore = useUserStore();

//是否展示详细银行卡号
const isEye = ref(true);

//充值方式弹窗显隐
const rchargeShow = ref(false);

// 刘海高度
const notchHeight = ref(0);

// 个人信息
const { userInfo } = storeToRefs(userStore);

//请求参数
const requestParams = reactive({
	uid: userInfo.value.uid,
	userBankcardId: '',
	id: '',
	pageNumber: 1,
	pageSize: 10,
	total: 0
});
// 银行卡详情
const cardInfo = ref();
// 交易记录
const recordsList = ref([]);
// 卡片到期时间
const endTime = ref('');

//设置银行卡号是否展示
function setEye() {
	isEye.value = !isEye.value;
}

//获取交易记录
const getfindTransaction = async () => {
	try {
		const { data } = await findTransaction(requestParams);
		console.log('交易记录参数', requestParams);
		recordsList.value = [...data.list, ...recordsList.value];
		requestParams.total = data.total;
	} catch (error) {
		console.error(error);
	}
};
//获取用户持有银行卡详情
const getFindUserCardInfo = async () => {
	try {
		const { data } = await findUserCardInfo({
			id: requestParams.id
		});
		cardInfo.value = data;
	} catch (error) {
		console.error(error);
	}
};

//获取卡片到期时间

//触底请求
const loadMore = () => {
	if (recordsList.value.length >= requestParams.total) {
		return;
	}
	requestParams.pageNumber += 1;
	getfindTransaction();
};

//返回上一页
const goBack = () => {
	uni.navigateBack({
		delta: 1
	});
};
//前往详情页
const goCardDetail = () => {
	uni.navigateTo({
		url: `/pages/cardDetail/cardDetail?id=${requestParams.id}`
	});
};
//前往充值页面
const toWalletRecharge = () => {
	rchargeShow.value = false;
	uni.navigateTo({
		url: `/pages/valueAdded/valueAdded?id=${requestParams.id}`
	});
};
const toRecharge = () => {
	rchargeShow.value = false;
	uni.navigateTo({
		url: `/pages/topUp/index?id=${requestParams.id}`
	});
};

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

onLoad(async (option) => {
	(requestParams.pageNumber = 1), (requestParams.total = 0);
	requestParams.userBankcardId = option.userBankcardId;
	requestParams.id = option.id;
	await getFindUserCardInfo();
	await getfindTransaction();
	findCardExpirationTime({ id: option.id }).then((res) => {
		endTime.value = res.data;
	});
});

onReachBottom(() => {
	loadMore();
});
</script>

<style lang="scss" scoped>
@import './virtualCard.scss';
</style>
