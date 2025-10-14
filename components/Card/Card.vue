<template>
	<view
		class="cardpopup-item cardpopup-item"
		:style="{ backgroundImage: `url(${listItem.cardData.img})` }"
	>
		<view class="cardpopup-cardNumber">
			<span>{{ formattedCard(listItem.cardNo) }}</span>
		</view>
		<view class="cardpopup-time">
			{{ `${formatToMonthDay(listItem.setTime)}       ${time}` }}
		</view>

		<!-- 替换“实体卡”为多语言变量，复用现有多语言键名 -->
		<view class="physicalCard" v-if="listItem.cardType == 'PHYSICAL'">
			{{ $t('home.physicalCard') }}
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { formattedCard, formatToMonthDay } from '@/utils/common.js';
import { findCardExpirationTime } from '@/request/api.js';
const props = defineProps({
	listItem: {
		type: Object,
		required: true
	}
});
const time = ref();
findCardExpirationTime({ id: props.listItem.id }).then((res) => {
	time.value = res.data;
});
</script>

<style lang="scss" scoped>
.cardpopup-item {
	width: 686rpx;
	height: 280rpx;
	position: relative;
	font-family: SFMono, SFMono;
	color: #ffffff;
	font-weight: 600;
	border-radius: 30rpx;

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
		color: #ffffff;
		white-space: pre;
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

.cardpopup-item {
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
