<template>
	<view class="viewBox">
		<Navbar title="卡片列表" :showBack="true">
			<template #right>
				<view class="header-right">申请记录</view>
			</template>
		</Navbar>
		<up-sticky :offset-top="notchHeight" bgColor="#0f0f0f">
			<view style="margin: 0 32rpx;">
				<up-tabs :list="list1" @click="click" lineColor='#ffffff'
					:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
					:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
			</view>
		</up-sticky>
		<view class="content" v-if="active == 0">
			<view v-for="(item, index) in 3" :key="index" @click='goToPage(" /pages/virtualCard/virtualCard")'>
				<Card :type="index"></Card>
			</view>
		</view>
		<view class="content" v-if="active == 1">
			<Card type="3"></Card>
		</view>
		<view class="button">
			<view>新增卡片</view>
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
	// tabs切换
	const list1 = reactive([{
			name: '虚拟卡'
		},
		{
			name: '实体卡'
		},
	]);
	// tabs下标
	const active = ref(0)
	// 刘海高度
	const notchHeight = ref(0);
	// 定义方法  
	function click(item) {
		active.value = item.index
	}
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
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./cardList.scss";
</style>