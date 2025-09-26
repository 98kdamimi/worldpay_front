<template>
	<view class="viewBox">
		<Navbar title="卡详情" :showBack="true"></Navbar>
		<view class="box top">
			<view class="box-title">卡号</view>
			<view class="box-txt">
				<view style="margin-right: 12rpx;">
					<span>{{ formattedCard('8888888888888888') }}</span>
				</view>
				<up-copy content="8888888888888888">
					<SvgIcon name="copy1" width="30" height="30"></SvgIcon>
				</up-copy>
			</view>
		</view>
		<view class="smallBox">
			<view>
				<view class="smallBox-title">有效日期</view>
				<view class="smallBox-txt">07/27</view>
			</view>
			<view>
				<view class="smallBox-title">安全码 CVV</view>
				<view class="smallBox-txt">050</view>
			</view>
		</view>
		<view class="bottomBox bottom" @click="goToPage('/pages/cardholder/cardholder')">
			<view>
				<view>持卡人</view>
				<view class="name">Tong Wang</view>
			</view>
			<view>
				<SvgIcon name="right" width="36" height="36"></SvgIcon>
			</view>
		</view>
		<view class="title">基础数量</view>
		<view class="boxItem top">
			<view>卡类型</view>
			<view class="boxItem-txt">密钥卡</view>
		</view>
		<view class="boxItem">
			<view>发行商</view>
			<view class="boxItem-txt">Worldpay</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="width: 100vw;height: 1rpx;background: #0f0f0f;"></view>
		<!-- #endif -->
		<view class="boxItem bottom">
			<view>卡状态</view>
			<view class="boxItem-txt">使用中</view>
		</view>
		<view class="title">费用</view>
		<view class="boxItem top">
			<view>月服务费</view>
			<view class="boxItem-txt">1.00</view>
		</view>
		<view class="boxItem">
			<view>USD 充值手续费</view>
			<view class="boxItem-txt">1.0%</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="width: 100vw;height: 1rpx;background: #0f0f0f;"></view>
		<!-- #endif -->
		<view class="boxItem">
			<view>USDT 充值手续费</view>
			<view class="boxItem-txt">1.0%</view>
		</view>
		<view class="boxItem bottom">
			<view>提现手续费</view>
			<view class="boxItem-txt">1.0%</view>
		</view>
		<view style="width: 100vw;height: 32rpx;"></view>
	</view>
</template>

<script setup>
	import {
		formattedCard
	} from '@/utils/common.js'

	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./cardDetail.scss";
</style>