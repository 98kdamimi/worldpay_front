<template>
	<view class="viewBox">
		<Navbar :title="$t('walletRecharge.title')" :showBack="true"></Navbar>
		<view class="title">{{ $t('walletRecharge.currency') }}</view>
		<view class="selectCurrency" @click="currencyShow = true">
			<view>
				<SvgIcon name="USDT" width="64" height="64"></SvgIcon>
				<span>USDT</span>
			</view>
			<SvgIcon name="bottom" width="36" height="36"></SvgIcon>
		</view>
		<view class="box qrPadding top">
			<view class="qrCode">
				<image src="@/static/image/qrCode.png" mode=""></image>
			</view>
		</view>
		<view class="box bottom" style="padding: 34rpx 24rpx;">
			<view>{{ $t('walletRecharge.address') }}TRC2152365226322****</view>
			<SvgIcon name="copy1" width="36" height="36"></SvgIcon>
		</view>
		<view class="hint">
			<span>{{ $t('walletRecharge.tip1') }}</span>
			<span>{{ $t('walletRecharge.tip2') }}</span>
		</view>
		<view>
			<up-picker :show="currencyShow" :columns="columns" @cancel="currencyShow = false"
				@change="currencyShow = false"></up-picker>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	const currencyShow = ref(false)
	const columns = reactive([
		['中国', '美国']
	]);
</script>

<style lang="scss" scoped>
	@import './walletRecharge.scss'
</style>