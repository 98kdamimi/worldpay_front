<template>
	<view class="viewBox">
		<Navbar :title="$t('home.accountTitle')" :showBack="true"></Navbar>
		<view class="title">{{ $t('home.alipayPhoneTitle') }}</view>
		<view class="inputBox">
			<input type="text" :placeholder="$t('home.alipayPhonePlaceholder')" placeholder-style="color: #9191aa;" />
		</view>
		<view class="title">{{ $t('home.payeeNameTitle') }}</view>
		<view class="inputBox">
			<input type="text" :placeholder="$t('home.payeeNamePlaceholder')" placeholder-style="color: #9191aa;" />
		</view>
		<view class="title">{{ $t('home.transferAmountTitle') }}</view>
		<view class="inputBox">
			<input type="text" :placeholder="$t('home.transferAmountPlaceholder')"
				placeholder-style="color: #9191aa;" />
			<span>USD</span>
		</view>
		<view class="title-txt">{{ $t('home.serviceFeeDesc') }}</view>
		<view class="button">{{ $t('home.lockExchangeBtn') }}</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	@import "./account.scss"
</style>