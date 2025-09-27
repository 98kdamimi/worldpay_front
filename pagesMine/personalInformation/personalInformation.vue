<template>
	<view class="viewBox">
		<Navbar :title="$t('personalInfo.title')" :showBack="true"></Navbar>
		<view class="infoBox">
			<view class="infoBox-item top">
				<view>{{ $t('personalInfo.accountId') }}</view>
				<view class="infoBox-item-right">55555744</view>
			</view>
			<view class="infoBox-item">
				<view>{{ $t('personalInfo.uid') }}</view>
				<view class="infoBox-item-right">155423132</view>
			</view>
			<view class="infoBox-item bottom">
				<view>{{ $t('personalInfo.invitationCode') }}</view>
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