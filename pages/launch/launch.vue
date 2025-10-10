<template>
	<view></view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);

onLoad(() => {
	const isFirstLaunch = uni.getStorageSync('isFirstLaunch');

	if (!isFirstLaunch) {
		uni.setStorageSync('isFirstLaunch', true);
		uni.reLaunch({ url: '/pagesAuth/index/index' });
		return;
	}

	if (isLogin.value) {
		uni.reLaunch({ url: '/pages/index/index' });
	} else {
		uni.reLaunch({ url: '/pagesAuth/login/login' });
	}
});
</script>

<style></style>