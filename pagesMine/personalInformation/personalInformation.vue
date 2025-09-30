<template>
	<view class="viewBox">
		<Navbar :title="$t('personalInfo.title')" :showBack="true"></Navbar>
		<view class="infoBox">
			<view class="infoBox-item top">
				<view>{{ $t('personalInfo.accountId') }}</view>
				<view class="infoBox-item-right">{{ userInfo.id }}</view>
			</view>
			<view class="infoBox-item bottom">
				<view>{{ $t('personalInfo.uid') }}</view>
				<view class="infoBox-item-right">{{ userInfo.uid }}</view>
			</view>
			<!-- <view class="infoBox-item bottom">
				<view>{{ $t('personalInfo.invitationCode') }}</view>
				<view class="infoBox-item-right">236522333</view>
			</view> -->
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onReady
	} from '@dcloudio/uni-app';
	import {
		useUserStore
	} from '@/stores/user';
	const userStore = useUserStore();
	const userInfo = ref({})

	onReady(async () => {
		userInfo.value = await userStore.fetchUserInfoByToken();
	});
</script>

<style lang="scss" scoped>
	@import './personalInformation.scss'
</style>