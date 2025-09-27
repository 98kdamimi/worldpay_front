<template>
	<view>
		<view class="transactionRecords-list" v-if="list.length">
			<view class="transactionRecords-item" v-for="(item, index) in list" :key="index">
				<view class="transactionRecords-item-left">
					<view>支付宝消费</view>
					<view class="transactionRecords-item-time">2025/09/03 10:51</view>
				</view>
				<view class="transactionRecords-item-right">- $100</view>
			</view>
		</view>
		<view class="emty" v-else>
			<view class="emtyIcon">
				<image src="@/static/image/index/emty.png" alt="" mode="widthFix" />
			</view>
			<view>暂无数据</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		list: {
			type: Array,
			default: () => []
		},
	});
</script>

<style lang="scss" scoped>
	.transactionRecords-list {
		.transactionRecords-item {
			margin: 12rpx 0;
			padding: 32rpx 24rpx;
			background: #16171a;
			border-radius: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.transactionRecords-item-left {
				.transactionRecords-item-time {
					font-weight: 400;
					font-size: 24rpx;
					color: #646479;
					margin-top: 16rpx;
				}
			}

			.transactionRecords-item-right {
				font-weight: 500;
				font-size: 36rpx;
				color: #ff0707;
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
			color: #FFFFFF;

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