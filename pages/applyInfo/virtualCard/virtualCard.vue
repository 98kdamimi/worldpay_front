<template>
	<view class="viewBox">
		<view
			class="worldpay-banner"
			:style="{ backgroundImage: `url(${applyCardInfo.img})` }"
		></view>
		<view class="worldpay-txt">{{ $t('home.applyCardType') }}</view>
		<view class="worldpay-title">
			{{ applyCardInfo.title }}
		</view>
		<view>
			<view class="title">{{ $t('home.cardholderInfo') }}</view>
			<view class="boxItem top">
				<view>{{ $t('home.phoneNumber') }}</view>
				<view class="boxItem-txt">{{ cardHolderInfo.userTel }}</view>
			</view>
			<view class="boxItem">
				<view>{{ $t('home.email') }}</view>
				<view class="boxItem-txt">{{ cardHolderInfo.userEmail }}</view>
			</view>
			<!-- #ifdef H5 -->
			<view
				style="width: 100vw; height: 1rpx; background: #0f0f0f"
			></view>
			<!-- #endif -->
			<view class="boxItem bottom">
				<view>{{ $t('home.idNumber') }}</view>
				<view class="boxItem-txt">{{ cardHolderInfo.userNumber }}</view>
			</view>
		</view>
		<view>
			<view class="title">{{ $t('home.cardRules') }}</view>
			<view class="boxItem top">
				<view>{{ $t('home.maxCardBalance') }}</view>
				<view class="boxItem-txt">
					{{ formatBalance(applyCardInfo.rechargeMaxLimit) }}
					{{ applyCardInfo.ccy }}
				</view>
			</view>
			<view class="boxItem bottom">
				<view>{{ $t('home.monthlyServiceFee') }}</view>
				<view class="boxItem-txt">
					{{ formatBalance(applyCardInfo.monthFee) }}
					{{ applyCardInfo.ccy }}
				</view>
			</view>
		</view>
		<!-- 虚拟卡 -->
		<view>
			<view class="title">{{ $t('home.applicationFee') }}</view>
			<view class="boxItem top" style="padding: 24rpx">
				<view style="display: flex; align-items: center">
					<SvgIcon name="icon1" width="64" height="64"></SvgIcon>
					<view
						class="boxItem-txt"
						style="font-weight: 500; margin-left: 12rpx"
					>
						USD
					</view>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<view
				style="width: 100vw; height: 1rpx; background: #0f0f0f"
			></view>
			<!-- #endif -->
			<view class="boxItem bottom">
				<view>{{ $t('home.availableBalance') }}</view>
				<view class="boxItem-txt" style="display: flex">
					<view style="margin-right: 12rpx">
						{{ formatBalance(availableBalance) }}
						{{ applyCardInfo.ccy }}
					</view>
					<SvgIcon
						name="add"
						width="36"
						height="36"
						@click="toWalletRecharge"
					></SvgIcon>
				</view>
			</view>
		</view>
		<view class="prompt">
			<view class="promptBox">
				<view>{{ $t('home.cardOpeningFee') }}</view>
				<view class="prompt-txt">
					{{ formatBalance(applyCardInfo.openCardCost) }}
					{{ applyCardInfo.ccy }}
				</view>
			</view>
			<view class="promptBox">
				<view>{{ $t('home.prepaymentFee') }}</view>
				<view class="prompt-txt">
					{{ formatBalance(applyCardInfo.preSaveCost) }}
					{{ applyCardInfo.ccy }}
				</view>
			</view>
			<view class="promptBox">
				<view>{{ $t('home.monthlyServiceFee') }}</view>
				<view class="prompt-txt">
					{{ formatBalance(applyCardInfo.monthFee) }}
					{{ applyCardInfo.ccy }}
				</view>
			</view>
			<view class="promptBox">
				<view class="prompt-txt">{{ $t('home.paymentAmount') }}</view>
				<view style="color: #ffe330">
					{{ formatBalance(totalFee) }}
					{{ applyCardInfo.ccy }}
				</view>
			</view>
		</view>
		<view class="button" @click="confirmApplication">
			{{ $t('home.confirmApplication') }}
		</view>
		<view class="button-placeholder"></view>
		<up-modal
			:show="applyShow"
			:showConfirmButton="false"
			bgColor="#141414"
		>
			<view class="applyModal">
				<view class="applyModal-title">
					<SvgIcon
						class="svg-icon"
						name="hint"
						width="36"
						height="36"
					></SvgIcon>
					<view>{{ $t('home.hint') }}</view>
				</view>
				<view class="applyModal-txt">
					{{ $t('home.insufficientBalanceTip') }}
				</view>
				<view class="applyModal-button">
					<view class="cancel" @click="applyShow = false">
						{{ $t('home.bankCardRecharge') }}
					</view>
					<view class="apply" @click="applyShow = false">
						{{ $t('home.walletRecharge') }}
					</view>
				</view>
			</view>
		</up-modal>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatBalance } from '@/utils/common.js';
import {openCardApply} from '@/request/api.js'
import { storeToRefs } from 'pinia';
import { useCardStore } from '@/stores/card.js';
import { useUserStore } from '@/stores/user.js';
const cardStore = useCardStore();
const userStore = useUserStore();
const { applyCardInfo, cardHolderInfo } = storeToRefs(cardStore);
const {clearCardInfo,clearCardHolderInfo} = cardStore
const { userInfo } = storeToRefs(userStore);

const availableBalance = computed(() => {
	return (
		parseFloat(userInfo.value.walletBalance) -
		parseFloat(userInfo.value.freezeBalance)
	);
});

const totalFee = computed(() => {
	return (
		parseFloat(applyCardInfo.value.openCardCost) +
		parseFloat(applyCardInfo.value.preSaveCost) +
		parseFloat(applyCardInfo.value.monthFee)
	);
});

const toWalletRecharge = () => {
	uni.reLaunch({
		url: '/pages/walletRecharge/walletRecharge'
	});
};

const applyShow = ref(false);
const confirmApplication = async () => {
	// applyShow.value = true;
	if (totalFee.value > userInfo.value.walletBalance) {
		applyShow.value = true;
		return
	}
	const params = {
		cardId:applyCardInfo.value.id,
		holderId:cardHolderInfo.value.id,
		topupType:1,
		uid:userInfo.value.uid
	}
	const res = await openCardApply(params)
	uni.reLaunch({
		url:'/pages/index/index',
		success:function(){
			clearCardInfo()
			clearCardHolderInfo()
			uni.showToast({
				title: '已经为您提交申请，请等待审核',
				icon: 'none'
			});
		}
	})
	
};
</script>

<style lang="scss" scoped>
.worldpay-banner {
	width: 360rpx;
	height: 180rpx;
	margin: 32rpx auto 0;
	// background: url('@/static/image/applyInfo.png');
	background-repeat: no-repeat;
	background-size: cover;
}

.worldpay-txt {
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #999999;
	margin: 24rpx 32rpx;
	text-align: center;
}

.worldpay-title {
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 30rpx;
	color: #ffffff;
	margin: 0 32rpx;
	text-align: center;
}

.top {
	border-radius: 24rpx 24rpx 0rpx 0rpx;
}

.bottom {
	border-radius: 0rpx 0rpx 24rpx 24rpx;
}

.title {
	margin: 32rpx;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 32rpx;
	color: #ffffff;
}

.boxItem {
	background: #16171a;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 38rpx 24rpx;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #9191aa;
	margin: 1rpx 32rpx;

	.boxItem-txt {
		color: #ffffff;
	}
}

.prompt {
	width: 686rpx;
	padding: 32rpx 24rpx;
	background: #16171a;
	border-radius: 24rpx;
	margin: 24rpx 32rpx 0;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #9191aa;

	.promptBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24rpx;
	}

	.promptBox:last-child {
		margin-bottom: 0rpx;
	}

	.prompt-txt {
		color: #ffffff;
	}
}

.button {
	position: fixed;
	left: 48rpx;
	right: 48rpx;
	bottom: 42rpx;
	width: 654rpx;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	background: #1e3ad6;
	border-radius: 50rpx;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 36rpx;
	color: #ffffff;
	margin: 0 auto;
}

.button-placeholder {
	height: 100rpx;
	margin: 42rpx auto;
}

.applyModal {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: PingFangSC, PingFang SC;
	color: #ffffff;

	> view {
		border: 0 !important;
	}

	.applyModal-title {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		font-size: 36rpx;
		column-gap: 24rpx;

		.svg-icon {
			/* #ifdef APP */
			margin-top: 5rpx;
			/* #endif */
			/* #ifdef H5 */
			margin-top: -5rpx;
			/* #endif */
		}
	}

	.applyModal-txt {
		font-weight: 400;
		font-size: 30rpx;
		margin: 64rpx 0 50rpx;
		text-align: center;
	}

	.applyModal-button {
		display: flex;
		justify-content: space-between;
		width: 100%;

		> view {
			width: 252rpx;
			padding: 28rpx 0;
			text-align: center;
			font-weight: 400;
			font-size: 32rpx;
			border-radius: 24rpx;
		}

		.cancel {
			background: #868686;
		}

		.apply {
			background: #1e3ad6;
		}
	}
}
</style>
