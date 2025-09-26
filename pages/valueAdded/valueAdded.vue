<template>
	<view class="viewBox">
		<Navbar title="充值" :showBack="true">
			<template #right>
				<view class="header-right">充值记录</view>
			</template>
		</Navbar>
		<view class="title">充值到卡</view>
		<view class="box">
			<view class="box-card-info">
				<view style="margin-right: 16rpx;">
					<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
				</view>
				<view>
					<view>Worldpay 消费卡</view>
					<view class="worldpay-txt">**** 9999</view>
				</view>
			</view>
		</view>
		<view class="title">充值数量</view>
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
					<view>可用 <span>6.00USDT</span></view>
					<SvgIcon name="add" width="32" height="32"></SvgIcon>
				</view>
			</view>
			<view class="box-line"></view>
			<view class="amount">
				<view class="amount-input">
					<input type="text" placeholder="0.00 - 99.980" v-model="amount"
						placeholder-style="font-family: BMDoHyeon, BMDoHyeon;font-size: 54rpx;" />
				</view>
				<view class="amount-right">最大</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">预计到账数量</view>
			<view class="box-input">
				<view v-if='!amount.length'>-</view>
				<view v-else>{{ amount }} USDT</view>
			</view>
			<view class="box-title">手续费</view>
			<view class="box-input" style="margin-bottom: 0;">
				<view v-if='!amount.length'>-</view>
				<view v-else>{{ amount }} USDT</view>
			</view>
		</view>
		<view class="hint">提示：1 USDT = 1USD</view>
		<view class="button" v-if="!amount.length">充值</view>
		<view class="button" style="background: #1E3AD6;" v-else @click="SafetyShow = true">充值</view>
		<up-popup :show="SafetyShow" mode="bottom" bgColor='#141414'>
			<view class="SafetyPopup">
				<view class="SafetyPopup-title">安全验证</view>
				<view class="SafetyPopup-off" @click="SafetyShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="SafetyPopup-box" @click="passwordShow = true">
					<SvgIcon name="lock" width="48" height="48" style="margin-right: 24rpx;"></SvgIcon>
					<view>
						<view>支付密码</view>
						<view class="SafetyPopup-box-txt">点击输入支付密码</view>
					</view>
				</view>
				<view class="SafetyPopup-hint">提示：请完成所有的安全验证，或者前往 设定 来启用你的验证设
					置。</view>
				<view class="SafetyPopup-button" @click="passwordShow = true">充值</view>
			</view>
		</up-popup>
		<up-popup :show="passwordShow" mode="bottom" bgColor='#141414'>
			<view class="passwordPopup">
				<view class="passwordPopup-title">密码验证</view>
				<view class="passwordPopup-off" @click="passwordShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="passwordPopup-txt">输入密码</view>
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