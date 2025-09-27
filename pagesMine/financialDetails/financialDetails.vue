<template>
	<view class="viewBox">
		<Navbar :title="$t('financialDetails.title')" :showBack="true"></Navbar>
		<view class="list">
			<view class="list-item">
				<view class="box top displayRow">
					<view class="box-top displayRow">
						<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
						<view class="box-top-left">
							<view>{{ $t('financialDetails.regularUsdt') }}</view>
							<view class="box-top-left-button">
								<view class="red">{{ $t('financialDetails.regular') }}</view>
								<view class="green" style="margin-left: 12rpx;">USDT</view>
							</view>
						</view>
					</view>
					<view class="box-top-right">
						<view>88%</view>
						<view class="box-top-right-txt">{{ $t('financialDetails.annualRate') }}</view>
					</view>
				</view>
				<view class="box box-bottom displayRow">
					<view>{{ $t('financialDetails.orderAmount') }}</view>
					<view class="box-bottom-txt">88.88USD</view>
				</view>
				<view class="box box-bottom displayRow">
					<view>{{ $t('financialDetails.userName') }}</view>
					<view class="box-bottom-txt">233655KSU</view>
				</view>
				<view class="box box-bottom displayRow">
					<view>{{ $t('financialDetails.orderNumber') }}</view>
					<view class="box-bottom-txt">888-541225-6522</view>
				</view>
				<view class="box box-bottom displayRow">
					<view>{{ $t('financialDetails.expectedReturn') }}</view>
					<view class="box-bottom-txt">88.88USD</view>
				</view>
				<view class="box box-bottom displayRow bottom">
					<view>{{ $t('financialDetails.expectedReturn') }}</view>
					<view class="box-bottom-txt">88.88USD</view>
				</view>
			</view>
		</view>
		<view class="product-info">
			<view>
				<view>{{ $t('financialDetails.productStatus') }}</view>
				<view class="product-info-txt">{{ $t('financialDetails.onSale') }}</view>
			</view>
			<view>
				<view>{{ $t('financialDetails.investmentPeriod') }}</view>
				<view class="product-info-txt">7日</view>
			</view>
			<view>
				<view>{{ $t('financialDetails.purchaseTime') }}</view>
				<view class="product-info-txt">2025/12/24 14:12:58</view>
			</view>
			<view>
				<view>{{ $t('financialDetails.maturityTime') }}</view>
				<view class="product-info-txt">2025/12/24 14:12:58</view>
			</view>
		</view>
		<view class="introduce-title">{{ $t('financialDetails.productIntroduction') }}</view>
		<view class="introduce">
			<textarea class="intro-textarea" :placeholder="$t('financialDetails.introductionPlaceholder')"
				placeholder-style="color: #9191aa; font-size: 28rpx;" auto-height maxlength="500"
				show-confirm-bar="false"></textarea>
		</view>
		<view class="button">
			<view>{{ $t('financialDetails.redeemFunds') }}</view>
			<view class="white">{{ $t('financialDetails.repurchase') }}</view>
		</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	@import './financialDetails.scss'
</style>