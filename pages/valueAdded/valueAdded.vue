<template>
	<view class="viewBox">
		<Navbar :title="$t('recharge.title')" :showBack="true">
			<template #right>
				<view class="header-right">{{ $t('recharge.rechargeRecords') }}</view>
			</template>
		</Navbar>
		<view class="title">{{ $t('recharge.rechargeToCard') }}</view>
		<view class="box">
			<view class="box-card-info">
				<view style="margin-right: 16rpx;">
					<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
				</view>
				<view>
					<view>{{ $t('recharge.worldpayConsumerCard') }}</view>
					<view class="worldpay-txt">**** 9999</view>
				</view>
			</view>
		</view>
		<view class="title">{{ $t('recharge.rechargeAmount') }}</view>
		<view class="box">
			<view class="box-type">
				<view>
					<view>
						<SvgIcon name="icon1" width="64" height="64"></SvgIcon>
					</view>
					<view class="box-type-txt">
						USDT
					</view>
					<view class="box-type-selectBottom">
						<image src="@/static/svg/selectBottom.svg" mode=""></image>
					</view>
				</view>
				<view class="box-type-right">
					<view>{{ $t('recharge.available') }} <span>6.00USDT</span></view>
					<SvgIcon name="add" width="32" height="32"></SvgIcon>
				</view>
			</view>
			<view class="box-line"></view>
			<view class="amount">
				<view class="amount-input">
					<input type="text" placeholder="0.00 - 99.980" v-model="amount"
						placeholder-style="font-family: BMDoHyeon, BMDoHyeon;font-size: 54rpx;" />
				</view>
				<view class="amount-right">{{ $t('recharge.max') }}</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('recharge.expectedArrivalAmount') }}</view>
			<view class="box-input">
				<view v-if='!amount.length'>-</view>
				<view v-else>{{ amount }} USDT</view>
			</view>
			<view class="box-title">{{ $t('recharge.serviceFee') }}</view>
			<view class="box-input" style="margin-bottom: 0;">
				<view v-if='!amount.length'>-</view>
				<view v-else>{{ amount }} USDT</view>
			</view>
		</view>
		<view class="hint">{{ $t('recharge.tipUsdtExchange') }}</view>
		<view class="button" v-if="!amount.length">{{ $t('recharge.rechargeBtn') }}</view>
		<view class="button" style="background: #1E3AD6;" v-else @click="SafetyShow = true">
			{{ $t('recharge.rechargeBtn') }}</view>
		<up-popup :show="SafetyShow" mode="bottom" bgColor='#141414'>
			<view class="SafetyPopup">
				<view class="SafetyPopup-title">{{ $t('recharge.securityVerification') }}</view>
				<view class="SafetyPopup-off" @click="SafetyShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="SafetyPopup-box" @click="passwordShow = true">
					<SvgIcon name="lock" width="48" height="48" style="margin-right: 24rpx;"></SvgIcon>
					<view>
						<view>{{ $t('recharge.paymentPassword') }}</view>
						<view class="SafetyPopup-box-txt">{{ $t('recharge.clickToEnterPassword') }}</view>
					</view>
				</view>
				<view class="SafetyPopup-hint">{{ $t('recharge.securityVerificationHint') }}</view>
				<view class="SafetyPopup-button" @click="passwordShow = true">{{ $t('recharge.rechargeBtn') }}</view>
			</view>
		</up-popup>
		<up-popup :show="passwordShow" mode="bottom" bgColor='#141414'>
			<view class="passwordPopup">
				<view class="passwordPopup-title">{{ $t('recharge.passwordVerification') }}</view>
				<view class="passwordPopup-off" @click="passwordShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="passwordPopup-txt">{{ $t('recharge.enterPassword') }}</view>
				<view class="passwordPopup-input">
					<up-code-input :maxlength="6" :dot="true" borderColor='#ffffff' color='#ffffff'
						@finish='finish()'></up-code-input>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const SafetyShow = ref(false)
	const passwordShow = ref(false)
	const amount = ref('')

	const finish = (e) => {
		SafetyShow.value = false
		passwordShow.value = false
	};

	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./valueAdded.scss";
</style>