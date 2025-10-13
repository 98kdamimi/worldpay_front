<template>
	<view class="viewBox">
		<Navbar :title="$t('topUp.title')" :showBack="true">
			<template #right>
				<SvgIcon name="kefu" width="40" height="40" />
			</template>
		</Navbar>
		<view
			class="card"
			:style="{ backgroundImage: `url(${cardInfo?.cardData?.img})` }"
		>
			<view class="card-cardNumber">
				<span>{{ formattedCard(cardInfo.cardNo) }}</span>
			</view>
			<view class="card-time">
				{{ `${formatToMonthDay(cardInfo.setTime)}       ${time}` }}
			</view>
		</view>
		<view class="bank">
			<view>{{ $t('topUp.bankName') }}</view>
			<view class="bankRight">
				<view>{{ FirmAccount?.openingBank }}</view>
				<!-- <view class="txt">{{ $t('topUp.dbsBankEn') }}</view> -->
			</view>
		</view>
		<view class="bank">
			<view>{{ $t('topUp.accountNumber') }}</view>
			<view class="bankRight">
				<view>{{ FirmAccount?.payeeMan }}</view>
			</view>
		</view>
		<view class="bank lastBank">
			<view>{{ $t('topUp.accountAddress') }}</view>
			<view class="bankRight">{{ FirmAccount?.payeeAccount }}</view>
			<up-copy :content="FirmAccount?.payeeAccount">
				<SvgIcon
					class="copyIcon"
					name="copy1"
					width="30"
					height="30"
				></SvgIcon>
			</up-copy>
		</view>
		<view class="txt-title">{{ $t('topUp.rechargeMethod') }}</view>
		<view class="prompt-text">
			{{ $t('topUp.rechargeStep1') }}
		</view>
		<view class="prompt-text">
			{{ $t('topUp.rechargeStep2') }}
		</view>
		<!-- <view class="prompt-text red">
			{{ $t('topUp.rechargeFeeTip') }}
		</view> -->
		<view class="button" @click="goToBack">{{ $t('topUp.completeRecharge') }}</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { formattedCard, formatToMonthDay } from '@/utils/common.js';
import { onReady, onLoad } from '@dcloudio/uni-app';
import {
	findUserCardInfo,
	findCardExpirationTime,
	findFirmAccount
} from '@/request/api.js';
const cardID = ref();
const cardInfo = ref({});
const time = ref();
const FirmAccount = ref();
const getCardInfo = async () => {
	const res = await findUserCardInfo({ id: cardID.value });
	cardInfo.value = res;
	console.log('查询到卡详情', res);
};
const getFirmAccount = async () => {
	const res = await findFirmAccount();
	console.log('查询到公司账户', res);
	FirmAccount.value = res;
};
const goToBack = () => {
	uni.navigateBack();
};

onLoad(async (options) => {
	console.log('获取到页面数据', options);
	cardID.value = options.id;
	await getCardInfo();
	await findCardExpirationTime({ id: cardID.value }).then((res) => {
		time.value = res;
	});
	await getFirmAccount();
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
