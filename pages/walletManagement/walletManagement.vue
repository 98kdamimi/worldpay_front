<template>
	<view class="viewBox">
		<Navbar
			ref="navbarRef"
			:title="$t('walletManagement.title')"
			:showBack="true"
		></Navbar>
		<view class="title">{{ $t('walletManagement.totalAssets') }}</view>
		<view class="balance">
			{{ formatBalance(userInfo.walletBalance) }}
			<span>USD</span>
		</view>
		<view class="kingKong">
			<view @click="goToPage('/pages/walletRecharge/walletRecharge')">
				<view>
					<SvgIcon
						name="kingKong1"
						width="100"
						height="100"
						style="margin-bottom: 32rpx"
					></SvgIcon>
				</view>
				<view
					class="marquee-text"
					:class="{ scroll: rechargeScroll }"
					id="rechargeText"
				>
					<span>{{ $t('walletManagement.recharge') }}</span>
				</view>
			</view>
			<view @click="goTotransfer">
				<view>
					<SvgIcon
						name="kingKong2"
						width="100"
						height="100"
						style="margin-bottom: 32rpx"
					></SvgIcon>
				</view>
				<view
					class="marquee-text"
					:class="{ scroll: transferScroll }"
					id="transferText"
				>
					<span>{{ $t('walletManagement.transfer') }}</span>
				</view>
			</view>
			<view @click="goToMoneyTransfer">
				<view>
					<SvgIcon
						name="kingKong3"
						width="100"
						height="100"
						style="margin-bottom: 32rpx"
					></SvgIcon>
				</view>
				<view
					class="marquee-text"
					:class="{ scroll: remitScroll }"
					id="remitText"
				>
					<span>
						{{ $t('walletManagement.internationalRemittance') }}
					</span>
				</view>
			</view>
			<view
				@click="
					goToPage('/pages/financialManagement/financialManagement')
				"
			>
				<view>
					<SvgIcon
						name="kingKong4"
						width="100"
						height="100"
						style="margin-bottom: 32rpx"
					></SvgIcon>
				</view>
				<view
					class="marquee-text"
					:class="{ scroll: financeScroll }"
					id="financeText"
				>
					<span>
						{{ $t('walletManagement.financialManagement') }}
					</span>
				</view>
			</view>
		</view>
		<!-- 交易记录 -->
		<view class="transactionRecords">
			<!-- 吸顶标题 -->
			<view class="stickyContent" :style="{ top: notchHeight + 'px' }">
				<view class="transactionRecords-title">
					<view>{{ $t('walletManagement.transactionRecords') }}</view>
				</view>
			</view>

			<view class="transactionRecords-list">
				<WalletTransactionList
					:list="recordsList"
				></WalletTransactionList>
			</view>
		</view>
	</view>
</template>

<script setup>
import WalletTransactionList from './components/WalletTransactionList.vue';
import { ref, reactive, nextTick, onUnmounted } from 'vue';
import { onReady, onLoad, onReachBottom } from '@dcloudio/uni-app';
import { checkOverflow, formatBalance } from '@/utils/common.js';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user.js';
import { walletLog } from '@/request/api.js';
import SvgIcon from '@/components/svgIcon/svgIcon.vue';

//获取用户信息
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { fetchUserInfoByToken } = useUserStore();

const navbarRef = ref(null);

// 定义请求参数
const requestParams = reactive({
	pageNumber: 1,
	pageSize: 10,
	uid: userInfo.value.uid,
	total: 0
});

const recordsList = ref([]);
// 刘海高度
const notchHeight = ref(0);
// 跑马灯滚动状态
const rechargeScroll = ref(false);
const transferScroll = ref(false);
const remitScroll = ref(false);
const financeScroll = ref(false);

//页面跳转
const goToPage = (address) => {
	uni.navigateTo({
		url: address
	});
};

// 获取交易记录
const getRecordsList = async () => {
	const { data } = await walletLog(requestParams);
	console.log('获取到交易记录', data);
	recordsList.value = [...data.list, ...recordsList.value];
	requestParams.total = data.total;
};

const goTotransfer = () => {
	
	uni.navigateTo({
		url: `/pages/transfer/transfer`
	});
};

const goToMoneyTransfer = () => {
	uni.showToast({
		title: '敬请期待',
		icon: "none"
	});
	// uni.navigateTo({
	// 	url: '/pages/moneyTransfer/moneyTransfer'
	// });
};

// onReady(() => {
// 	// 获取刘海高度
// 	uni.getSystemInfo({
// 		success: (res) => {
// 			notchHeight.value = res.safeArea?.top || 0;
// 			if (!notchHeight.value) {
// 				notchHeight.value = res.statusBarHeight || 0;
// 			}
// 		},
// 		fail: () => {
// 			notchHeight.value = 20;
// 		}
// 	});
// 	// 检查所有跑马灯内容是否超出
// 	nextTick(() => {
// 		checkOverflow('rechargeText', rechargeScroll);
// 		checkOverflow('transferText', transferScroll);
// 		checkOverflow('remitText', remitScroll);
// 		checkOverflow('financeText', financeScroll);
// 	});
// });
const loadMore = () => {
	if (recordsList.value.length >= requestParams.total) {
		return;
	}
	requestParams.pageNumber += 1;
	getRecordsList();
};

onLoad(async () => {
	fetchUserInfoByToken();
	await nextTick();
	notchHeight.value = navbarRef.value.navbarHeight;
	getRecordsList();
});
onReachBottom(() => {
	loadMore();
});

onUnmounted(() => {
	rechargeScroll.value = false;
	transferScroll.value = false;
	remitScroll.value = false;
	financeScroll.value = false;
});
</script>

<style lang="scss" scoped>
@import './walletManagement.scss';
</style>
