<template>
	<view class="viewBox">
		<Navbar title="账户" :showBack="true"></Navbar>
		<view class="title">*支付宝绑定的手机号</view>
		<view class="inputBox">
			<input type="text" placeholder="请输入支付宝绑定的手机号" placeholder-style="color: #9191aa;" />
		</view>
		<view class="title">*收款人姓名</view>
		<view class="inputBox">
			<input type="text" placeholder="请输入收款人姓名" placeholder-style="color: #9191aa;" />
		</view>
		<view class="title">*转账金额</view>
		<view class="inputBox">
			<input type="text" placeholder="请输入转账金额" placeholder-style="color: #9191aa;" />
			<span>USD</span>
		</view>
		<view class="title-txt">单笔固定手续费：8.00USD +2%</view>
		<view class="button">锁汇</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	@import "./account.scss"
</style>