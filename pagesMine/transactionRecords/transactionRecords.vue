<template>
	<view class="viewBox">
		<Navbar
			ref="navbarRef"
			:title="$t('transactionRecords.title')"
			:showBack="true"
		></Navbar>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<view class="stickyContent" :style="{ top: `${notchHeight}px` }">
				<up-tabs
					@change="tabChange"
					:list="tabList"
					lineColor="#ffffff"
					:activeStyle="{
						color: '#ffffff',
						fontWeight: '500',
						fontSize: '30rpx'
					}"
					:inactiveStyle="{
						color: '#999999',
						fontWeight: '400',
						fontSize: '30rpx'
					}"
				></up-tabs>
			</view>
			<view class="transactionRecords-list" v-if="tabType == 'card'">
				<TransactionRecords :list="recordsList"></TransactionRecords>
			</view>
			<view class="transactionRecords-list" v-else>
				<WalletTransactionList
					:list="recordsList"
				></WalletTransactionList>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, watch, nextTick, onMounted } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';
import { findTransaction, walletLog } from '@/request/api.js';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';

const navbarRef = ref(null);
const { t } = useI18n();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

// 交易记录
const recordsList = ref([]);
// 刘海高度
const notchHeight = ref(0);

const tabType = ref('wallet');
// tabs切换
const tabList = reactive([
	{
		name: t('recordType.wallet'), // 钱包记录
		type: 'wallet'
	},
	{
		name: t('recordType.card'), // 卡片记录
		type: 'card'
	}
]);
// 定义请求参数
const requestParams = reactive({
	pageNumber: 1,
	pageSize: 10,
	uid: userInfo.value.uid,
	total: 0
});

const tabChange = (e) => {
	tabType.value = e.type;
	requestParams.pageNumber = 1;
	recordsList.value = [];
};

//获取卡片交易记录
const getCardTransaction = async () => {
	const { data } = await findTransaction(requestParams);
	console.log('获取到交易记录', data);
	recordsList.value = [...recordsList.value, ...data.list];
	requestParams.total = data.total;
};
//获取钱包交易记录;
const getWalletTransaction = async () => {
	const { data } = await walletLog(requestParams);
	console.log('获取到交易记录', data);
	recordsList.value = [...recordsList.value, ...data.list];
	requestParams.total = data.total;
};
const loadMore = () => {
	if (recordsList.value.length >= requestParams.total) {
		return;
	}
	requestParams.pageNumber += 1;
	if (tabType.value === 'wallet') {
		getWalletTransaction();
	} else {
		getCardTransaction();
	}
};
watch(
	tabType,
	(newValue) => {
		console.log('监听到新数据', newValue);
		if (newValue === 'wallet') {
			getWalletTransaction();
		} else {
			getCardTransaction();
		}
	},
	{ immediate: true }
);
onMounted(async () => {
	await nextTick();
	notchHeight.value = navbarRef.value.navbarHeight;
});
onReachBottom(() => {
	loadMore();
});
</script>

<style lang="scss" scoped>
@import './transactionRecords.scss';
</style>
