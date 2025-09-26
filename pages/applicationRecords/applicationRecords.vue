<template>
	<view class="viewBox">
		<Navbar title="申请记录" :showBack="true"></Navbar>
		<view class="box virtualBox">
			<view class="cont">
				<view>Worldpay 虚拟卡</view>
				<view>
					<view style="margin-right: 12rpx;">已完成</view>
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
				<view>Worldpay 虚拟卡</view>
				<view>
					<view style="margin-right: 12rpx;">申请失败</view>
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