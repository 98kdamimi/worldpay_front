<template>
	<view class="viewBox">
		<Navbar :title="$t('topUp.title')" :showBack="true">
			<template #right>
				<SvgIcon name="kefu" width="40" height="40" />
			</template>
		</Navbar>
		<view class="card">
			<view class="card-cardNumber">
				<span>{{ formattedCard('9999999999999999') }}</span>
			</view>
			<view class="card-time">
				10/25 10/30
			</view>
		</view>
		<view class="bank">
			<view>{{ $t('topUp.bankName') }}</view>
			<view class="bankRight">
				<view>{{ $t('topUp.dbsBank') }}</view>
				<view class="txt">{{ $t('topUp.dbsBankEn') }}</view>
			</view>
		</view>
		<view class="bank">
			<view>{{ $t('topUp.accountNumber') }}</view>
			<view class="bankRight bankRightRow">
				<view>478-000674187</view>
				<up-copy content="478-000674187">
					<SvgIcon class="copyIcon" name="copy1" width="30" height="30"></SvgIcon>
				</up-copy>
				<!-- <view class="copyIcon"></view> -->
			</view>
		</view>
		<view class="bank lastBank">
			<view>{{ $t('topUp.accountAddress') }}</view>
			<view class="bankRight">{{ $t('topUp.accountAddressEn') }}</view>
		</view>
		<view class="txt-title">{{ $t('topUp.rechargeMethod') }}</view>
		<view class="prompt-text">
			{{ $t('topUp.rechargeStep1') }}
		</view>
		<view class="prompt-text">
			{{ $t('topUp.rechargeStep2') }}
		</view>
		<view class="prompt-text red">
			{{ $t('topUp.rechargeFeeTip') }}
		</view>
		<view class="button">{{ $t('topUp.completeRecharge') }}</view>
	</view>
</template>

<script setup>
	import {
		formattedCard
	} from '@/utils/common.js'
	import {
		onReady
	} from '@dcloudio/uni-app';
	import {
		findByUid
	} from '@/request/api.js'
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>