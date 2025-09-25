<template>
	<view
		:class="type == 0 ? 'cardpopup-item cardpopup-item-bg1' : type == 1 ? 'cardpopup-item cardpopup-item-bg2' : type == 2 ? 'cardpopup-item cardpopup-item-bg3' : 'cardpopup-item cardpopup-item-bg4'">
		<view class="cardpopup-cardNumber">
			<span>9999</span>
			<span>9999</span>
			<span>9999</span>
			<span>9999</span>
		</view>
		<view class="cardpopup-time">
			10/25 10/30
		</view>
		<view class="physicalCard" v-if="type == 3">实体卡</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		type: {
			type: String,
			required: true
		},
	});
</script>

<style lang="scss" scoped>
	.cardpopup-item {
		width: 686rpx;
		height: 280rpx;
		margin: 24rpx 32rpx;
		position: relative;
		font-family: SFMono, SFMono;
		color: #ffffff;
		font-weight: 600;

		.cardpopup-cardNumber {
			position: absolute;
			left: 36rpx;
			bottom: 96rpx;
			font-size: 36rpx;
			letter-spacing: 3px;

			span {
				margin-right: 32rpx;
			}
		}

		.cardpopup-time {
			position: absolute;
			left: 36rpx;
			bottom: 36rpx;
			font-size: 24rpx;
			font-style: normal;
		}

		.physicalCard {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 200rpx;
			height: 64rpx;
			line-height: 64rpx;
			text-align: center;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			font-size: 32rpx;
			color: #48453d;
			letter-spacing: 3px;
			font-style: normal;
		}
	}

	.cardpopup-item-bg1 {
		background: url('@/static/image/index/cardicon1.png');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.cardpopup-item-bg2 {
		background: url('@/static/image/index/cardicon2.png');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.cardpopup-item-bg3 {
		background: url('@/static/image/index/cardicon3.png');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.cardpopup-item-bg4 {
		background: url('@/static/image/index/cardicon4.png');
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>