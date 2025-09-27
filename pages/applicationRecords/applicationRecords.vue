<template>
	<view class="viewBox">
		<Navbar :title="$t('home.applicationRecordsTitle')" :showBack="true"></Navbar>
		<view class="box virtualBox">
			<view class="cont">
				<view>{{ $t('home.worldpayVirtualCard') }}</view>
				<view>
					<view style="margin-right: 12rpx;">{{ $t('home.completed') }}</view>
					<!-- #ifdef APP -->
					<view style="margin-top: 5rpx;">
						<SvgIcon name="right" width="36" height="36"></SvgIcon>
					</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view style="margin-top: 2rpx;">
						<SvgIcon name="right" width="36" height="36"></SvgIcon>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="box entityBox">
			<view class="cont">
				<view>{{ $t('home.worldpayVirtualCard') }}</view>
				<view>
					<view style="margin-right: 12rpx;">{{ $t('home.applicationFailed') }}</view>
					<!-- #ifdef APP -->
					<view style="margin-top: 5rpx;">
						<SvgIcon name="right" width="36" height="36"></SvgIcon>
					</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view style="margin-top: 2rpx;">
						<SvgIcon name="right" width="36" height="36"></SvgIcon>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	@import './applicationRecords.scss';
</style>