<template>
	<view class="viewBox">
		<!-- 导航栏：标题多语言 -->
		<Navbar :title="$t('cardDetail.title')" :showBack="true"></Navbar>

		<!-- 卡号区域：标题多语言 -->
		<view class="box top">
			<view class="box-title">{{ $t('cardDetail.cardNumber') }}</view>
			<view class="box-txt">
				<view style="margin-right: 12rpx;">
					<span>{{ formattedCard('8888888888888888') }}</span>
				</view>
				<up-copy content="8888888888888888">
					<SvgIcon name="copy1" width="30" height="30"></SvgIcon>
				</up-copy>
			</view>
		</view>

		<!-- 有效日期+安全码区域：标题多语言 -->
		<view class="smallBox">
			<view>
				<view class="smallBox-title">{{ $t('cardDetail.validDate') }}</view>
				<view class="smallBox-txt">07/27</view>
			</view>
			<view>
				<view class="smallBox-title">{{ $t('cardDetail.securityCode') }}</view>
				<view class="smallBox-txt">050</view>
			</view>
		</view>

		<!-- 持卡人区域：标题多语言 -->
		<view class="bottomBox bottom" @click="goToPage('/pages/cardholder/cardholder')">
			<view>
				<view>{{ $t('cardDetail.cardholder') }}</view>
				<view class="name">Tong Wang</view>
			</view>
			<view>
				<SvgIcon name="right" width="36" height="36"></SvgIcon>
			</view>
		</view>

		<!-- 基础信息区域：标题+内容多语言 -->
		<view class="title">{{ $t('cardDetail.basicInfo') }}</view>
		<view class="boxItem top">
			<view>{{ $t('home.cardType') }}</view>
			<view class="boxItem-txt">{{ $t('cardDetail.keyCard') }}</view>
		</view>
		<view class="boxItem">
			<view>{{ $t('cardDetail.issuer') }}</view>
			<view class="boxItem-txt">Worldpay</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="width: 100vw;height: 1rpx;background: #0f0f0f;"></view>
		<!-- #endif -->
		<view class="boxItem bottom">
			<view>{{ $t('cardDetail.cardStatus') }}</view>
			<view class="boxItem-txt">{{ $t('cardDetail.inUse') }}</view>
		</view>

		<!-- 费用区域：标题+内容多语言 -->
		<view class="title">{{ $t('cardDetail.fees') }}</view>
		<view class="boxItem top">
			<view>{{ $t('home.monthlyServiceFee') }}</view>
			<view class="boxItem-txt">1.00</view>
		</view>
		<view class="boxItem">
			<view>{{ $t('cardDetail.usdRechargeFee') }}</view>
			<view class="boxItem-txt">1.0%</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="width: 100vw;height: 1rpx;background: #0f0f0f;"></view>
		<!-- #endif -->
		<view class="boxItem">
			<view>{{ $t('cardDetail.usdtRechargeFee') }}</view>
			<view class="boxItem-txt">1.0%</view>
		</view>
		<view class="boxItem bottom">
			<view>{{ $t('cardDetail.withdrawalFee') }}</view>
			<view class="boxItem-txt">1.0%</view>
		</view>
		<view style="width: 100vw;height: 32rpx;"></view>
	</view>
</template>

<script setup>
	import {
		formattedCard
	} from '@/utils/common.js'

	// 页面跳转方法（保持原逻辑）
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./cardDetail.scss";
</style>