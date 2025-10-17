<template>
	<!-- 导航栏标题添加多语言 -->
	<Navbar ref="navbarRef" :title="$t('cardList.title')" :showBack="true">
		<template #right>
			<!-- 右上角“申请记录”添加多语言 -->
			<view
				class="header-right"
				@click="
					goToPage('/pages/applicationRecords/applicationRecords')
				"
			>
				{{ $t('cardList.applicationRecords') }}
			</view>
		</template>
	</Navbar>
	<view class="viewBox">
		<view class="stickyContent" :style="{ top: notchHeight + 'px' }">
			<up-tabs
				:list="tabList"
				@change="tabsChange"
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
		<!-- #ifdef APP -->
		<up-pull-refresh :refreshing="refreshing" @refresh="reload">
			<view v-if="cardList.length > 0" style="margin-top: 30rpx">
				<view v-for="(item, index) in cardList" :key="index">
					<Card
						style="margin-bottom: 32rpx"
						:list-item="item"
						@click="toCardDetail(item)"
					></Card>
				</view>
			</view>
		</up-pull-refresh>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view v-if="cardList.length > 0" style="margin-top: 30rpx">
			<view v-for="(item, index) in cardList" :key="index">
				<Card
					style="margin-bottom: 32rpx"
					:list-item="item"
					@click="toCardDetail(item)"
				></Card>
			</view>
		</view>
		<!-- #endif -->
	</view>
	<!-- 底部“新增卡片”按钮添加多语言 -->
	<view class="layoutBottom">
		<view
			class="button"
			@click="goToPage('/pages/cardApplication/cardApplication')"
		>
			{{ $t('cardList.addNewCard') }}
		</view>
	</view>
	<view class="bottomPlaceholder"></view>
</template>
<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { onReady, onLoad, onReachBottom } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';
import { findUserCardList } from '@/request/api.js';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const navbarRef = ref(null);

const refreshing = ref(false);

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

// const loading = ref(true);

const { t } = useI18n();

// Tabs列表：
const tabList = reactive([
	{
		name: t('cardType.virtualCard'), // 虚拟卡
		type: 'VIRTUAL'
	},
	{
		name: t('cardType.physicalCard'), // 实体卡
		type: 'PHYSICAL'
	}
]);
// tabs下标
// const active = ref(0);
// 刘海高度
const notchHeight = ref(0);

const cardList = ref([]);

const requestParams = reactive({
	uid: userInfo.value.uid,
	cardType: 'VIRTUAL',
	pageNumber: 1,
	pageSize: 10,
	total: 0
});

// 查询用户所有卡片
const getFindUserCardList = async () => {
	try {
		refreshing.value = true;
		// loading.value = true;
		// 查询用户所有卡片
		const { data } = await findUserCardList(requestParams);
		console.log('请求参数', requestParams);
		console.log('请求到数据', data);

		cardList.value = [...cardList.value, ...data.list];
		requestParams.total = data.total;
		await nextTick();
		refreshing.value = false;
		// setTimeout(() => {
		// 	loading.value = false;
		// }, 1000);
	} catch (error) {
		console.error(error);
		refreshing.value = false;
		// loading.value = false;
	}
};

//触底请求
const loadMore = () => {
	if (cardList.value.length >= requestParams.total) {
		return;
	}
	requestParams.pageNumber += 1;
	getFindUserCardList();
};
//重新请求
const reload = () => {
	requestParams.pageNumber = 1;
	cardList.value = [];
	getFindUserCardList();
};

function tabsChange(item) {
	requestParams.cardType = item.type;
	reload();
}
const goToPage = (address) => {
	uni.navigateTo({
		url: address
	});
};
const toCardDetail = (item) => {
	uni.navigateTo({
		url: `/pages/virtualCard/virtualCard?id=${item.id}&userBankcardId=${item.userBankcardId}`
	});
};

onMounted(async () => {
	await nextTick();
	notchHeight.value = navbarRef.value.navbarHeight;
	getFindUserCardList();
});
onReachBottom(() => {
	loadMore();
});
</script>

<style lang="scss" scoped>
@import './cardList.scss';

:deep(.u-skeleton__wrapper__content) {
	.u-skeleton__wrapper__content__rows {
		background: linear-gradient(
			90deg,
			#333333 25%,
			#2f2f2f 37%,
			#333333 50%
		);
		background-size: 400% 100%;
		border-radius: 30rpx;
	}
}
</style>
