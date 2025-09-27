<template>
	<view class="viewBox">
		<Navbar title="交易记录" :showBack="true"></Navbar>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<up-sticky :offset-top="notchHeight" bgColor="#0f0f0f">
				<up-tabs :list="list1" @click="click" lineColor='#ffffff'
					:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
					:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
			</up-sticky>
			<view class="transactionRecords-list">
				<TransactionRecords :list="recordsList"></TransactionRecords>
			</view>
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

	// 交易记录
	const recordsList = ref([])
	// 刘海高度
	const notchHeight = ref(0);
	// tabs切换
	const list1 = reactive([{
			name: '钱包记录'
		},
		{
			name: '卡片记录'
		}
	]);

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
				notchHeight.value = 20;
			}
		});
	});
</script>

<style lang="scss" scoped>
	@import './transactionRecords.scss'
</style>