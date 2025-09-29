<template>
	<view class="viewBox">
		<FixedStatusBar></FixedStatusBar>
		<view class="stickyContent" :style="{ top: notchHeight + 'px' }">
			<view class="header">
				<view class="header-left-logo">
					<image src="@/static/image/index/logoTitle.png" alt="" mode="widthFix" />
				</view>
			</view>
			<up-tabs style="padding: 0 32rpx" :list="list1" lineColor="#ffffff"
				:activeStyle="{ color: '#ffffff', fontWeight: '500', fontSize: '30rpx' }"
				:inactiveStyle="{ color: '#999999', fontWeight: '400', fontSize: '30rpx' }"></up-tabs>
		</view>
		<view v-if="true" style="padding-bottom: 32rpx;">
			<view v-for="(item, index) in 10" :key="index"
				@click="goToPage('/pagesMessage/messageDetails/messageDetails')">
				<view class="time">2025-07-04</view>
				<view class="box">
					<view>标题最多显示一行超出部标题最多显示一行超出部分…</view>
					<view class="box-cont">{{ $t('message.activityIntro') }}</view>
					<view class="box-time">2025-07-04</view>
				</view>
			</view>
		</view>
		<view class="emty" v-else>
			<view class="emtyIcon">
				<image src="@/static/image/index/emty.png" alt="" mode="widthFix" />
			</view>
			<view>{{ $t('message.empty') }}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		onReady
	} from '@dcloudio/uni-app';
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	// tabs切换
	const list1 = reactive([{
			name: t('notification.system') // 系统通知
		},
		{
			name: t('notification.activity') // 活动通知
		}
	]);
	// 刘海高度
	const notchHeight = ref(0);
	onReady(() => {
		// 获取刘海高度
		uni.getSystemInfo({
			success: (res) => {
				notchHeight.value = res.safeArea?.top || 0;
				if (!notchHeight.value) {
					notchHeight.value = res.statusBarHeight || 0;
				}
			},
			fail: () => {
				// #ifdef APP-ANDROID
				notchHeight.value = 52;
				// #endif
				notchHeight.value = 0;
			}
		});
	});
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>