<template>
	<view class="viewBox">
		<Navbar :title="$t('recharge.title')" :showBack="true">
			<template #right>
				<view class="header-right">
					{{ $t('recharge.rechargeRecords') }}
				</view>
			</template>
		</Navbar>
		<view class="title">{{ $t('recharge.rechargeToCard') }}</view>
		<view class="box">
			<view class="box-card-info">
				<view style="margin-right: 16rpx">
					<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
				</view>
				<view>
					<view>{{ cardInfo?.cardData?.title }}</view>
					<view class="worldpay-txt">
						{{ maskBankCard(cardInfo?.cardNo) }}
					</view>
				</view>
			</view>
		</view>
		<view class="title">{{ $t('recharge.rechargeAmount') }}</view>
		<view class="box">
			<view class="box-type">
				<view>
					<!-- <view>
						<SvgIcon name="icon1" width="64" height="64"></SvgIcon>
					</view> -->
					<view class="box-type-txt">USD</view>
					<!-- <view class="box-type-selectBottom">
						<image
							src="@/static/svg/selectBottom.svg"
							mode=""
						></image>
					</view> -->
				</view>
				<view class="box-type-right">
					<view>
						{{ $t('recharge.available') }}
						<span>
							{{
								formatBalance(
									parseFloat(userInfo.walletBalance) -
										parseFloat(userInfo.freezeBalance)
								)
							}}
						</span>
					</view>
					<!-- <SvgIcon name="add" width="32" height="32"></SvgIcon> -->
				</view>
			</view>
			<view class="box-line"></view>
			<view class="amount">
				<view class="amount-input">
					<input
						type="number"
						:placeholder="`${formatBalance(
							cardInfo?.cardData?.rechargeMinLimit
						)} - ${formatBalance(
							cardInfo?.cardData?.rechargeMaxLimit
						)}`"
						v-model="amount"
						style="font-size: 50rpx"
					/>
				</view>
				<view class="amount-right">{{ $t('recharge.max') }}</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">
				{{ $t('recharge.expectedArrivalAmount') }}
			</view>
			<view class="box-input">
				<view v-if="!amount.length">-</view>
				<view v-else>{{ receiveAmount }}</view>
			</view>
			<view class="box-title">{{ $t('recharge.serviceFee') }}</view>
			<view class="box-input" style="margin-bottom: 0">
				<view v-if="!amount.length">-</view>
				<view v-else>{{ rechargeFee }}</view>
			</view>
		</view>
		<!-- <view class="hint">{{ $t('recharge.tipUsdtExchange') }}</view> -->
		<view class="button" v-if="!amount.length">
			{{ $t('recharge.rechargeBtn') }}
		</view>
		<view
			class="button"
			style="background: #1e3ad6"
			v-else
			@click="SafetyShow = true"
		>
			{{ $t('recharge.rechargeBtn') }}
		</view>
		<up-popup :show="SafetyShow" mode="bottom" bgColor="#141414">
			<view class="SafetyPopup">
				<view class="SafetyPopup-title">
					{{ $t('recharge.securityVerification') }}
				</view>
				<view class="SafetyPopup-off" @click="SafetyShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="SafetyPopup-box" @click="passwordShow = true">
					<SvgIcon
						name="lock"
						width="48"
						height="48"
						style="margin-right: 24rpx"
					></SvgIcon>
					<view>
						<view>{{ $t('recharge.paymentPassword') }}</view>
						<view class="SafetyPopup-box-txt">
							{{ $t('recharge.clickToEnterPassword') }}
						</view>
					</view>
				</view>
				<view class="SafetyPopup-hint">
					{{ $t('recharge.securityVerificationHint') }}
				</view>
				<view class="SafetyPopup-button" @click="passwordShow = true">
					{{ $t('recharge.rechargeBtn') }}
				</view>
			</view>
		</up-popup>
		<up-popup :show="passwordShow" mode="bottom" bgColor="#141414">
			<view class="passwordPopup">
				<view class="passwordPopup-title">
					{{ $t('recharge.passwordVerification') }}
				</view>
				<view class="passwordPopup-off" @click="passwordShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="passwordPopup-txt">
					{{ $t('recharge.enterPassword') }}
				</view>
				<view class="passwordPopup-input">
					<up-code-input
						:maxlength="6"
						:dot="true"
						borderColor="#ffffff"
						color="#ffffff"
						@finish="finish()"
					></up-code-input>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { findUserCardInfo } from '@/request/api.js';
import { useUserStore } from '@/stores/user.js';
import {
	maskBankCard,
	formattedCard,
	toPercent,
	formatBalance
} from '@/utils/common.js';

const userStore = useUserStore();

const { fetchUserInfoByToken } = userStore;

const cardUniqueId = ref('');
const cardInfo = ref('');

const userInfo = ref({});

const SafetyShow = ref(false);
const passwordShow = ref(false);
const amount = ref('');

const receiveAmount = computed(() => {
	return formatBalance(parseFloat(amount.value));
});

const rechargeFee = computed(() => {
	return formatBalance(
		parseFloat(amount.value) *
			parseFloat(cardInfo.value?.cardData?.rechargeFee)
	);
});

const finish = (e) => {
	SafetyShow.value = false;
	passwordShow.value = false;
};

const goToPage = (address) => {
	uni.navigateTo({
		url: address
	});
};
//获取银行卡详情
const getFindUserCardInfo = async () => {
	try {
		const res = await findUserCardInfo({
			id: cardUniqueId.value
		});
		console.log('获取到卡片信息', res);
		cardInfo.value = res;
	} catch (error) {
		console.error(error);
	}
};

onLoad(async (option) => {
	cardUniqueId.value = option.id;
	await getFindUserCardInfo();
	const res = await fetchUserInfoByToken();
	userInfo.value = res;
	console.log('获取用户信息', res);
});
</script>

<style lang="scss" scoped>
@import './valueAdded.scss';
</style>
