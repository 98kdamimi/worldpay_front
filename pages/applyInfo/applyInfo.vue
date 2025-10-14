<template>
	<view class="viewBox" style="padding-bottom: 32rpx">
		<Navbar title="确认申办信息" :showBack="true"></Navbar>
		<!-- 虚拟卡 -->
		<view v-if="applyCardInfo.bankCardNature === 'VIRTUAL'">
			<virualCard></virualCard>
		</view>
		<!-- 实体卡 -->
		<view v-else>
			<physicalCard></physicalCard>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import virualCard from './virtualCard/virtualCard.vue';
import physicalCard from './physicalCard/physicalCard.vue';
import { storeToRefs } from 'pinia';
import { useCardStore } from '@/stores/card.js';

const cardStore = useCardStore();
const { applyCardInfo } = storeToRefs(cardStore);
</script>

<style lang="scss" scoped></style>
