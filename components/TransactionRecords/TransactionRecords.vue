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
				<view
					class="transactionRecords-item-right"
					:style="{
						color:
							item.transType === 'topup'
								? '#27BD12FF'
								: '#FF0707FF'
					}"
				>
					{{ item.localCurrencyAmt }} {{ item.localCurrency }}
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
