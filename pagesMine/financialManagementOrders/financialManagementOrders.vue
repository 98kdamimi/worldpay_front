<template>
	<view class="viewBox">
		<Navbar :title="$t('financialOrders.title')" :showBack="true"></Navbar>
		<view class="box">
			<view class="box-item" v-for="(item,index) in 5" :key="index"
				@click="goToPage('/pagesMine/financialDetails/financialDetails')">
				<view class="box-item-left">
					<view>
						<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
					</view>
					<view>
						<view>{{ $t('financialOrders.alipayWallet') }}</view>
						<view class="box-item-left-txt">2025/02/01 14:14:21</view>
					</view>
				</view>
				<view class="box-item-right">
					<view>88%</view>
					<view>{{ $t('financialOrders.annualRate') }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import './financialManagementOrders.scss'
</style>