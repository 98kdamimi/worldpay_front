<template>
	<view class="viewBox">
		<Navbar title="个人信息" :showBack="true"></Navbar>
		<view class="infoBox">
			<view class="infoBox-item top">
				<view>账号ID</view>
				<view class="infoBox-item-right">55555744</view>
			</view>
			<view class="infoBox-item">
				<view>UID</view>
				<view class="infoBox-item-right">155423132</view>
			</view>
			<view class="infoBox-item bottom">
				<view>邀请码</view>
				<view class="infoBox-item-right">236522333</view>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	@import './personalInformation.scss'
</style>