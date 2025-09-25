<template>
	<view class="viewBox">
		<StatusBar></StatusBar>
		<view class="nav"></view>
		<view class="card">
			<view class="card-cardNumber">
				<span>9999</span>
				<span>9999</span>
				<span>9999</span>
				<span>9999</span>
			</view>
			<view class="card-time">
				10/25 10/30
			</view>
		</view>
		<view class="bank">
			<view>银行名称</view>
			<view class="bankRight">
				<view>星展银行(香港)有限公司</view>
				<view class="txt">DBs Bank(Hong Kong)Limted(016)</view>
			</view>
		</view>
		<view class="bank">
			<view>账号电话</view>
			<view class="bankRight bankRightRow">
				<view>478-000674187</view>
				<view class="copyIcon"></view>
			</view>
		</view>
		<view class="bank lastBank">
			<view>账户地址</view>
			<view class="bankRight">UPEEDPAY TREASRE GLOBAL FINTECH LIMTED</view>
		</view>
		<view class="txt-title">充值方式</view>
		<view class="prompt-text">
			一.使用银行的手机程序或者掌上银行或者到银行，将款填入以上
			银行账户
		</view>
		<view class="prompt-text">
			二.使用银行的手机程序或者掌上银行或者到银行，将款填入以上
			银行账户使用银行的手机程序或者掌上银行或者到银行，将款填
			入以上银行账户
		</view>
		<view class="prompt-text red">
			提示：充值手续费为金额的2%，最低收费为20元
		</view>
		<view class="button">已完成充值</view>
	</view>
</template>

<script setup>
	import Card from '@/components/Card/Card.vue'
	const rightClick = () => {
		console.log('rightClick');
	};

	const leftClick = () => {
		console.log('leftClick');
	};
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>