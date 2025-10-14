<template>
	<view class="">
		<Navbar :title="$t('transfer.title')" :showBack="true"></Navbar>

		<view class="viewBox">
			<view class="title">{{ $t('transfer.transferAmount') }}</view>
			<view class="inputBox">
				<view>
					<input
						type="number"
						:placeholder="`${formatBalance(
							cardInfo?.cardData?.rechargeMinLimit
						)} - ${formatBalance(
							cardInfo?.cardData?.rechargeMaxLimit
						)}`"
						v-model="amount"
						placeholder-class="placeholderClass"
					/>
				</view>
				<view class="inputBox-right" @click="getMaxBalance">
					{{ $t('recharge.max') }}
				</view>
			</view>
			<view class="title-txt">
				{{ `${$t('transfer.walletBalance')}: ${availableBalance}` }}
			</view>
			<view class="title-txt">
				{{ `${$t('recharge.serviceFee')}: ${handlingFees}` }}
			</view>
			<view class="title">{{ $t('transfer.rechargeCardNumber') }}</view>
			<view class="box">
				<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
				<view style="margin-left: 24rpx">
					<view>{{ cardInfo?.cardData?.title }}</view>
					<view class="box-txt">
						{{ formattedCard(cardInfo?.cardNo) }}
					</view>
				</view>
				<view class="switch-button" @click="toSelectCard">
					{{ $t('transfer.switch') }}
				</view>
			</view>
			<view
				class="button"
				v-if="!amount.length"
				style="background: #313e87"
			>
				{{ $t('transfer.nextStep') }}
			</view>
			<view v-else class="button" @click="popupShow = true">
				{{ $t('transfer.nextStep') }}
			</view>
			<view class="button-placeholder"></view>
			<!-- 选择卡号  -->
			<up-popup :show="popupShow" mode="bottom">
				<view class="cardpopup">
					<view class="cardpopup-title">
						<view style="width: 56rpx; height: 56rpx"></view>
						<view>{{ $t('transfer.confirmInfo') }}</view>
						<SvgIcon
							name="off"
							width="56"
							height="56"
							@click="popupShow = false"
						></SvgIcon>
					</view>
					<view class="infoBox top">
						<view>{{ $t('transfer.transferAmountLabel') }}</view>
						<view>{{ amount }}</view>
					</view>
					<view class="infoBox bottom">
						<view>{{ $t('transfer.receivingAccountLabel') }}</view>
						<view>{{ cardInfo.cardNo }}</view>
					</view>
					<view
						class="button"
						@click="
							passwordShow = true;
							popupShow = false;
						"
					>
						{{ $t('transfer.confirm') }}
					</view>
					<view class="button-placeholder"></view>
				</view>
			</up-popup>
			<!-- 密码验证 -->
			<PayPassword v-model:show="passwordShow" @finish="finish" />
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, computed } from 'vue';
import { formattedCard, formatBalance } from '@/utils/common.js';
import { onLoad } from '@dcloudio/uni-app';
import { findUserCardList, findUserCardInfo, topUp } from '@/request/api.js';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { fetchUserInfoByToken } = userStore;
const { userInfo } = storeToRefs(userStore);

const cardUniqueId = ref('');

const requestParams = reactive({
	uid: userInfo.value.uid,
	pageNumber: 1,
	pageSize: 1
});

const amount = ref('');

const cardInfo = ref('');

const cardShow = ref(false);
const popupShow = ref(false);
const passwordShow = ref(false);

const finish = (e) => {
	passwordShow.value = false;
	console.log(e)
	toTopUp()
};

const availableBalance = computed(() => {
	return formatBalance(
		parseFloat(userInfo.value.walletBalance) -
			parseFloat(userInfo.value.freezeBalance)
	);
});
const handlingFees = computed(() => {
	return formatBalance(
		(parseFloat(amount.value) || 0) *
			parseFloat(cardInfo.value?.cardData?.rechargeFee)
	);
});

const getMaxBalance = () => {
	amount.value = availableBalance.value;
};
// 查询用户所有卡片
const getFindUserCardList = async () => {
	try {
		// 查询用户所有卡片
		const { data } = await findUserCardList(requestParams);
		cardInfo.value = data.list[0];
		console.log(cardInfo.value);
	} catch (error) {
		console.error(error);
	}
};
const toSelectCard = () => {
	uni.redirectTo({
		url: '/pages/selectCard/selectCard'
	});
};

// 充值
const toTopUp = async () => {
	try {
		const res = await topUp({
			targetAmount: amount.value,
			amount: amount.value,
			handlingFees: handlingFees.value,
			userBankcardId: cardInfo.value.userBankcardId,
			payType: 1,
			uid: userInfo.value.uid
		});

		await fetchUserInfoByToken();
		uni.navigateBack({
			success: () => {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		});
	} catch (error) {
		console.error(error);
	}
};

const getFindUserCardInfo = async (id) => {
	try {
		const { data } = await findUserCardInfo({ id });
		console.log('获取到新数据', data);
		cardInfo.value = data;
	} catch (error) {
		console.error(error);
	}
};

onLoad(async (option) => {
	await fetchUserInfoByToken();
	await getFindUserCardList();
	if (option.id) {
		await getFindUserCardInfo(option.id);
	}
});
</script>

<style lang="scss" scoped>
@import './transfer.scss';
</style>
