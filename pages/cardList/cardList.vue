<template>
	<view class="viewBox">
		<StatusBar></StatusBar>
		<view class="nav"></view>
		<up-sticky>
			<view style="margin: 0 32rpx;">
				<up-tabs :list="list1" @click="click" lineColor='#ffffff'
					:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
					:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
			</view>
		</up-sticky>
		<view class="content" v-if="active == 0">
			<view v-for="(item, index) in 3" :key="index">
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
	import Card from '@/components/Card/Card.vue'
	import {
		reactive,
		ref
	} from 'vue';
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
	// 定义方法  
	function click(item) {
		active.value = item.index
	}
</script>

<style lang="scss" scoped>
	@import "./cardList.scss";
</style>