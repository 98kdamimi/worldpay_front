<template>
	<view class="viewBox">
		<Navbar :title="$t('financialOrders.title')" :showBack="true"></Navbar>
		<view class="box" v-if="dataList?.list?.length">
			<view
				class="box-item"
				v-for="(item, index) in dataList?.list"
				:key="index"
				@click="
					goToPage('/pagesMine/financialDetails/financialDetails')
				"
			>
				<view class="box-item-left">
					<view>
						<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
					</view>
					<view>
						<view>{{ item.productName }}</view>
						<view class="box-item-left-txt">
							{{ item.payTime }}
						</view>
					</view>
				</view>
				<view class="box-item-right">
					<view>{{ toPercent(item.interestRate) }}</view>
					<view>{{ $t('financialOrders.annualRate') }}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<Emty></Emty>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onReady } from '@dcloudio/uni-app';
import { orderList } from '@/request/api.js';
import { toPercent } from '@/utils/common';

const dataList = ref({});

onReady(async () => {
	getOrderList();
});
// 获取卡片总资产
const getOrderList = async () => {
	try {
		const { data } = await orderList({
			uid: uni.getStorageSync('userInfo').uid,
			pageNumber: 1,
			pageSize: 999999999
		});
		dataList.value = data;
	} catch (error) {
		console.error(error);
	}
};

const goToPage = (address) => {
	uni.navigateTo({
		url: address
	});
};
</script>

<style lang="scss" scoped>
@import './financialManagementOrders.scss';
</style>
