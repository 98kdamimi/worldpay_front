<template>
	<view class="viewBox">
		<Navbar :title="$t('transfer.title')" :showBack="true"></Navbar>
		<view class="title">{{ $t('transfer.transferAmount') }}</view>
		<view class="inputBox">
			<view>
				<input type="text" :placeholder="$t('transfer.enterAmountPlaceholder')"
					placeholder-class="placeholderClass" />
			</view>
			<view class="inputBox-right">{{ $t('transfer.all') }}</view>
		</view>
		<view class="title-txt">{{ $t('transfer.walletBalance') }}</view>
		<view class="title">{{ $t('transfer.rechargeCardNumber') }}</view>
		<view class="box">
			<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
			<view style="margin-left: 24rpx;">
				<view>{{ $t('transfer.worldpayVirtualCard') }}</view>
				<view class="box-txt">{{ formattedCard('9999999999999999') }}</view>
			</view>
			<view class="switch-button" @click="cardShow = true">{{ $t('transfer.switch') }}</view>
		</view>
		<view class="button" @click="popupShow = true">{{ $t('transfer.nextStep') }}</view>
		<view class="button-placeholder"></view>
		<!-- 选择卡号  -->
		<up-popup :show="cardShow" mode="bottom">
			<view class="cardpopup">
				<view class="cardpopup-title">
					<view style="width: 56rpx;height: 56rpx;"></view>
					<view>{{ $t('transfer.selectCardNumber') }}</view>
					<SvgIcon name="off" width="56" height="56" @click="cardShow = false"></SvgIcon>
				</view>
				<view v-for="(itme, index) in 5" :key="index">
					<view :class="cardActive == index ? 'box cardActive' : 'box'" @click="cardActive = index">
						<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
						<view style="margin-left: 24rpx;">
							<view>{{ $t('transfer.worldpayVirtualCard') }}</view>
							<view class="box-txt">{{ formattedCard('9999999999999999') }}</view>
						</view>
					</view>
				</view>
				<view class="button">{{ $t('transfer.confirm') }}</view>
				<view class="button-placeholder"></view>
			</view>
		</up-popup>
		<!-- 选择卡号  -->
		<up-popup :show="popupShow" mode="bottom">
			<view class="cardpopup">
				<view class="cardpopup-title">
					<view style="width: 56rpx;height: 56rpx;"></view>
					<view>{{ $t('transfer.confirmInfo') }}</view>
					<SvgIcon name="off" width="56" height="56" @click="popupShow = false"></SvgIcon>
				</view>
				<view class="infoBox top">
					<view>{{ $t('transfer.transferAmountLabel') }}</view>
					<view>888</view>
				</view>
				<view class="infoBox bottom">
					<view>{{ $t('transfer.receivingAccountLabel') }}</view>
					<view>88888888888888888888</view>
				</view>
				<view class="button" @click="passwordShow = true">{{ $t('transfer.confirm') }}</view>
				<view class="button-placeholder"></view>
			</view>
		</up-popup>
		<!-- 密码验证 -->
		<up-popup :show="passwordShow" mode="bottom" bgColor='#141414'>
			<view class="passwordPopup">
				<view class="passwordPopup-title">{{ $t('transfer.passwordVerification') }}</view>
				<view class="passwordPopup-off" @click="passwordShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="passwordPopup-txt">{{ $t('transfer.enterPassword') }}</view>
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
	import {
		formattedCard
	} from '@/utils/common.js'

	const cardShow = ref(false)
	const popupShow = ref(false)
	const passwordShow = ref(false)
	const cardActive = ref(0)

	const finish = (e) => {
		popupShow.value = false
		passwordShow.value = false
	};
</script>

<style lang="scss" scoped>
	@import "./transfer.scss"
</style>