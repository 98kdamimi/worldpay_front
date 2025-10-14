<template>
	<view>
		<view class="transactionRecords-list" v-if="list.length">
			<view
				class="transactionRecords-item"
				v-for="(item, index) in list"
				:key="index"
			>
				<view class="transactionRecords-item-left">
					<view>{{ item.title }}</view>
					<view class="transactionRecords-item-time">
						{{ item.setTime }}
					</view>
				</view>
				<!-- <view
					class="transactionRecords-item-right"
					:style="{
						color:
							item.transType === 'topup'
								? '#27BD12FF'
								: '#FF0707FF'
					}"
				>
					{{ item.localCurrencyAmt }} {{ item.localCurrency }}
				</view> -->
				<view
					class="transactionRecords-item-right"
					v-if="item.tradeType == 2"
				>
					<view class="">
						{{ item.toAccount }}
					</view>
					<view style="color: #ff0707ff">
						{{
							`-${formatBalance(item.realMoney)} ${
								item.primevalMoneyUnit
							}`
						}}
					</view>
				</view>
				<view
					class="transactionRecords-item-right-one"
					v-if="item.tradeType == 1"
				>
					<!-- <view class="">
						{{item.toAccount}}
					</view> -->
					<view style="color: #27bd12ff">
						{{
							`+${formatBalance(item.realMoney)} ${
								item.primevalMoneyUnit
							}`
						}}
					</view>
				</view>
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
			<!-- 替换“暂无数据”为多语言变量，兼容i18n语法 -->
			<view>{{ $t('common.emptyData') }}</view>
		</view>
	</view>
</template>

<script setup>
import { formatBalance } from '@/utils/common.js';
const props = defineProps({
	list: {
		type: Array,
		default: () => []
	}
});
</script>

<style lang="scss" scoped>
.transactionRecords-list {
	color: #ffffff;

	.transactionRecords-item {
		margin: 12rpx 0;
		padding: 32rpx 24rpx;
		height: 144rpx;
		background: #16171a;
		border-radius: 24rpx;
		display: flex;
		justify-content: space-between;

		.transactionRecords-item-left {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.transactionRecords-item-time {
				font-weight: 400;
				font-size: 24rpx;
				color: #646479;
			}
		}

		.transactionRecords-item-right {
			height: 100%;
			font-weight: 500;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: end;
		}
		.transactionRecords-item-right-one {
			height: 100%;
			font-weight: 500;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: end;
		}
	}

	.emty {
		flex: 1;
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
}
</style>
