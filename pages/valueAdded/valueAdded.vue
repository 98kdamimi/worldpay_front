<template>
	<view class="viewBox">
		<Navbar title="充值" :showBack="true">
			<template #right>
				<view class="header-right">充值记录</view>
			</template>
		</Navbar>
		<view class="title">充值到卡</view>
		<view class="box"></view>
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
	@import "./valueAdded.scss";
</style>