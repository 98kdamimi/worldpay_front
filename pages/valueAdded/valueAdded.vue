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
							{{ availableBalance }}
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
				<view v-else>{{ targetAmount }}</view>
			</view>
			<view class="box-title">{{ $t('recharge.serviceFee') }}</view>
			<view class="box-input" style="margin-bottom: 0">
				<view v-if="!amount.length">-</view>
				<view v-else>{{ handlingFees }}</view>
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
				<view
					class="SafetyPopup-button"
					@click="
						passwordShow = true;
						SafetyShow = false;
					"
				>
					{{ $t('recharge.rechargeBtn') }}
				</view>
			</view>
		</up-popup>
		<PayPassword v-model:show="passwordShow" @finish="finish" />
		<!-- <up-popup :show="passwordShow" mode="bottom" bgColor="#141414">
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
						@finish="finish()"
					></up-code-input>
				</view>
			</view>
		</up-popup> -->
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { findUserCardInfo, topUp } from '@/request/api.js';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';
import {
	maskBankCard,
	formattedCard,
	toPercent,
	formatBalance
} from '@/utils/common.js';

const userStore = useUserStore();

const { fetchUserInfoByToken } = userStore;

const { userInfo } = storeToRefs(userStore);

const cardUniqueId = ref('');
const cardInfo = ref('');

const SafetyShow = ref(false);
const passwordShow = ref(false);
const amount = ref('');

const availableBalance = computed(() => {
	return formatBalance(
		parseFloat(userInfo.value.walletBalance) -
			parseFloat(userInfo.value.freezeBalance)
	);
});

const targetAmount = computed(() => {
	return formatBalance(parseFloat(amount.value));
});

const handlingFees = computed(() => {
	return formatBalance(
		parseFloat(amount.value) *
			parseFloat(cardInfo.value?.cardData?.rechargeFee)
	);
});

const finish = (e) => {
	SafetyShow.value = false;
	passwordShow.value = false;
	toTopUp();
};

const goToPage = (address) => {
	uni.navigateTo({
		url: address
	});
};
//获取银行卡详情
const getFindUserCardInfo = async () => {
	try {
		const {data} = await findUserCardInfo({
			id: cardUniqueId.value
		});
		cardInfo.value = data;
	} catch (error) {
		console.error(error);
	}
};

// 充值
const toTopUp = async () => {
	console.log('充值', targetAmount.value);
	try {
		const res = await topUp({
			amount: amount.value,
			targetAmount: targetAmount.value,
			handlingFees: handlingFees.value,
			userBankcardId: cardInfo.value.userBankcardId,
			payType: 1,
			uid: userInfo.value.uid
		});

		await fetchUserInfoByToken();
		uni.navigateBack({
			success: () => {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		});
	} catch (error) {
		console.error(error);
	}
};

onLoad(async (option) => {
	cardUniqueId.value = option.id;
	await getFindUserCardInfo();
	await fetchUserInfoByToken();
});
</script>

<style lang="scss" scoped>
@import './valueAdded.scss';
:deep(.u-code-input__item) {
	background-color: #fff;
	border-radius: 20rpx;
}
</style>
