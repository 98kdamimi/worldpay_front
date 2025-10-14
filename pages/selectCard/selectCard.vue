<template>
	<view class="cardpopup">
		<Navbar
			:title="$t('transfer.selectCardNumber')"
			:showBack="true"
		></Navbar>

		<view v-for="(item, index) in cardList" :key="index">
			<view class="box" @click="toTransfer(item.id)">
				<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
				<view style="margin-left: 24rpx">
					<view>
						{{ item.cardData.title }}
					</view>
					<view class="box-txt">
						{{ formattedCard(item.cardNo) }}
					</view>
				</view>
			</view>
		</view>
		<view class="button">{{ $t('transfer.confirm') }}</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { formattedCard } from '@/utils/common.js';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';
import { findUserCardList } from '@/request/api.js';

const userStore = useUserStore();
const { fetchUserInfoByToken } = userStore;
const { userInfo } = storeToRefs(userStore);

const requestParams = reactive({
	uid: userInfo.value.uid,
	pageNumber: 1,
	pageSize: 10,
	total: 0
});
const cardList = ref('');

// 查询用户所有卡片
const getFindUserCardList = async () => {
	try {
		// 查询用户所有卡片
		const { data } = await findUserCardList(requestParams);

		cardList.value = [...data.list, ...cardList.value];
		requestParams.total = data.total;
	} catch (error) {
		console.error(error);
	}
};

const loadMore = async () => {
	if (cardList.value.length >= requestParams.total) {
		return;
	}
	requestParams.pageNumber += 1;
	await getFindUserCardList();
};

onLoad(async () => {
	await getFindUserCardList();
});
const toTransfer = (id) => {
	uni.redirectTo({
		url: `/pages/transfer/transfer?id=${id}`
	});
};
onReachBottom(async () => {
	loadMore();
});
</script>

<style lang="scss" scoped>
.box {
	border: 2rpx solid #16171a;
	background: #16171a;
	border-radius: 24rpx;
	margin: 24rpx 32rpx 0;
	padding: 32rpx 24rpx;
	display: flex;
	align-items: center;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 30rpx;
	color: #ffffff;
	position: relative;
	.box-txt {
		margin: 12rpx 0 0;
		font-weight: 400;
		font-size: 28rpx;
	}
	.switch-button {
		position: absolute;
		top: 36rpx;
		right: 24rpx;
		height: 40rpx;
		padding: 0 24rpx;
		line-height: 40rpx;
		text-align: center;
		background: #ffffff;
		border-radius: 8rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 24rpx;
		color: #333333;
	}
}

.cardpopup {
	width: 750rpx;
	padding-bottom: 24rpx;
	background: #0f0f0f;

	.cardpopup-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		font-size: 36rpx;
		color: #ffffff;
		padding: 32rpx 32rpx;
	}
	.cardActive {
		border: 2rpx solid #ffffff;
	}
	.top {
		border-radius: 24rpx 24rpx 0rpx 0rpx;
	}
	.bottom {
		border-radius: 0rpx 0rpx 24rpx 24rpx;
	}
	.infoBox {
		background: #16171a;
		margin: 2rpx 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #9191aa;
		padding: 32rpx 24rpx;
	}
}
</style>
