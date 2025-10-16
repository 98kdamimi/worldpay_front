<template>
	<view class="viewBox">
		<Navbar :title="$t('logisticsInfo.title')" :showBack="true"></Navbar>
		<view
			class="logisticsContainer"
			v-if="logisticsInfo && logisticsInfo.length > 0"
		>
			<view class="logisticsTop">
				<view class="card">
					<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
					<view class="cardContent">
						<view class="shippingState">
							{{ logisticsStatus(shippingState) }}
						</view>
						<view class="cardNo">{{ cardNo }}</view>
					</view>
				</view>
				<view class="logisticsNum">
					<view class="">
						<span class="trackingNumberTitle">
							{{ `${$t('home.trackingNumber')}: ` }}
						</span>
						<span>{{ `${logisticsNum}` }}</span>
					</view>
					<up-copy :content="logisticsNum">
						<SvgIcon name="copy" width="32" height="32"></SvgIcon>
					</up-copy>
				</view>
			</view>
			<view class="logisticsSteps">
				<up-steps
					:current="0"
					dot
					direction="column"
					activeColor="#1E3AD6FF"
				>
					<view v-for="(item, index) in logisticsInfo" :key="index">
						<up-steps-item>
							<template #title>
								<view class="logisticsContent">
									<view class="logisticsStatus">
										{{ logisticsStatus(item.sub_statusId) }}
									</view>
									<view class="logisticsDescription">
										{{ item.description }}
									</view>
									<view class="logisticsTime">
										{{
											`${item.time_raw.date} ${item.time_raw.time}`
										}}
									</view>
								</view>
							</template>
						</up-steps-item>
					</view>
				</up-steps>
			</view>
		</view>

		<view class="emty" v-else>
			<view class="emtyIcon">
				<image
					src="@/static/image/index/emty.png"
					alt=""
					mode="widthFix"
				/>
			</view>
			<view>{{ $t('logisticsInfo.empty') }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';

import { findLogistics } from '@/request/lapi.js';
const { t } = useI18n();
const logisticsInfo = ref([]);
const shippingState = ref('');
const logisticsNum = ref('');
const cardNo = ref('');
const logisticsStatus = (state) => {
	switch (state) {
		case 1:
			return t('logisticsStatus.one');
		case 2:
			return t('logisticsStatus.two');
		case 3:
			return t('logisticsStatus.three');
		case 4:
			return t('logisticsStatus.four');
		case 5:
			return t('logisticsStatus.five');
	}
};

onLoad(async (options) => {
	logisticsNum.value = options.logisticsNum;
	const { data } = await findLogistics({
		logisticsNum: options.logisticsNum
	});
	logisticsInfo.value = data.logisticsInfo;
	shippingState.value = data.shippingState;
	cardNo.value = data.cardNo;
});
</script>

<style lang="scss" scoped>
.viewBox {
	padding: 32rpx;
}
.logisticsContainer {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}
.logisticsTop {
	color: #ffffff;
	background-color: #16171aff;
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	border-radius: 32rpx;
	gap: 30rpx;

	.card {
		display: flex;
		align-items: center;
		gap: 16rpx;
		.cardContent {
			display: flex;
			flex-direction: column;
			gap: 8rpx;
			.shippingState {
				font-size: 30rpx;
			}
			.cardNo {
				color: #9191aaff;
				font-size: 28rpx;
			}
		}
		// justify-content: space-between;
	}
	.logisticsNum {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		gap: 8rpx;
		.trackingNumberTitle{
			color: #9191aaff;
		}
	}
}
.logisticsSteps {
	padding: 32rpx;
	border-radius: 32rpx;
	color: #9191aaff;
	background-color: #16171aff;
	.logisticsContent {
		padding: 0 20rpx;
		.logisticsStatus {
			color: #ffffff;
			font-size: 28rpx;
			/* #ifdef APP */
			line-height: 33rpx;
			/* #endif */
			// height: 28rpx;
			// line-height: 1;
			margin-bottom: 15rpx;
		}
		.logisticsDescription {
			font-size: 24rpx;
		}
		.logisticsTime {
			margin-top: 24rpx;
			margin-bottom: 30rpx;
			font-size: 22rpx;
		}
	}
}
.emty {
	width: 100vw;
	height: 750rpx;
	margin: 90rpx auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #ffffff;

	.emtyIcon {
		width: 222rpx;
		height: 142rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 24rpx;
	}
}
</style>
